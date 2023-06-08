import os
import pprint
import sys

from fabric.api import env, execute, local, sudo, task
from fabric.decorators import runs_once, hosts
from fabric.colors import red
from fabric.contrib.console import confirm
from fabric.context_managers import settings
from fabric.operations import prompt

from slack import (ping_slack, SLACK_BASE_MESSAGE, SLACK_TICKET_MESSAGE, SLACK_CUSTOMER_MESSAGE, SLACK_PERSON_MESSAGE)

ENVS = {
    'development': {
        'cluster': 'devzone_dev_las',
        'hosts': [
            'las30249',
            'las30284'
        ],
        # 'team' channels to notify (full update, more info)
        'slack_team_channels': [
            '#products-devzone-ext',
        ],

        # 'customer' channels to notify (mini update, less info)
        'slack_customer_channels': [
            '#coreviz',
            '#central-tooling',
        ],
    },
    'production': {
        'cluster': 'devzone_prod_las',
        'hosts': [
            'las30582',
            'las30578'
        ],
        # 'team' channels to notify (full update, more info)
        'slack_team_channels': [
            '#products-devzone-ext',
        ],

        # 'customer' channels to notify (mini update, less info)
        'slack_customer_channels': [
            '#coreviz',
            '#central-tooling',
        ],
    }
}

_key_files = ['~/.ssh/id_rsa']

_existing_keys = filter(os.path.exists, map(os.path.expanduser, _key_files))

if not _existing_keys:
    raise IOError("Can't find any of {}".format(', '.join(_key_files)))

env.key_filename = _existing_keys[0]


def setup_env(environment):
    cfg = ENVS[environment]
    setattr(env, 'env_name', environment)
    for key, value in cfg.iteritems():
        setattr(env, key, value)


def set_version():
    cmd = ("consort -D las modify inventory settings {cluster} "
           "devzone_frontend_rpm value='{version}'").format(**env)
    local(cmd)


@task
def rollout():
    with settings(warn_only=True):
        sudo('yum clean all')
        sudo('puppet agent -vt')


@task
def production():
    setup_env('production')


@task
def development():
    setup_env('development')


@task
@hosts()
def kick():
    with settings(ok_ret_codes=[0, 2]):
        sudo('puppet agent -vt')


@task
@runs_once
def update(version, ticket_id=None, person=None):
    if ticket_id is None and 'frontend.production' in env.tasks:
        print(red('You need a ticket number to deploy to production!'))
        sys.exit(1)
    env.version = version
    env.ticket_id = ticket_id

    if env.env_name == 'production':
        env_name = 'Prod'
    elif env.env_name == 'development':
        env_name = 'QA'
    else:
        env_name = env.env_name

    message = SLACK_BASE_MESSAGE.format(
        ver=version or 'unspecified',
        env=env_name,
        roles=pprint.pformat(env.hosts, indent=2, depth=4))

    if ticket_id:
        message = message + SLACK_TICKET_MESSAGE.format(ticket=ticket_id)

    if not person:
        person = prompt('Who is doing this deployment? (Slack ID)', key='person')

    person_message = SLACK_PERSON_MESSAGE.format(person=person)

    message = message + person_message

    customer_message = SLACK_CUSTOMER_MESSAGE.format(ver=version, env=env_name) + person_message

    # This message is to inform users who may be in our channels or come to our channels
    # wondering about the downtime (in prod), or to keep the team informed about our deployments
    # (in dev/QA)
    if confirm(
        'Do you want to notify these customer channels about this deployment? {}'.format(
            ', '.join(env.slack_customer_channels))):
        for channel in env.slack_customer_channels:
            ping_slack(customer_message, channel=channel)

    # This message is for the team to know in more detail what's going on.
    if confirm(
        'Do you want to notify these team channels about this deployment? {}'.format(
            ', '.join(env.slack_team_channels))):
        for channel in env.slack_team_channels:
            ping_slack(message, channel=channel)

    if not confirm('Do you want to continue?'):
        return

    set_version()
    execute(rollout)
