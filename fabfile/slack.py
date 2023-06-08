import json
import requests

SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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'
SLACK_BASE_MESSAGE = 'Devzone Studio {env} frontend deployment starting now.\nVersion: `{ver}`\n```{roles}```\n'
SLACK_CUSTOMER_MESSAGE = 'Devzone Studio {env} frontend deployment starting now. Version: `{ver}`\n'
SLACK_TICKET_MESSAGE = 'Ticket: <https://jira.ihs.demonware.net/browse/{ticket}|{ticket}>\n'
SLACK_PERSON_MESSAGE = '@{person} is responsible for this deployment.\n'


def ping_slack(message=None, channel='#bot-testing'):
    if not message:
        print 'No message entered!'
        return
    webhook_url = SLACK_WEBHOOK_URL
    slack_data = {'text': message,
                  'username': 'DeadZone',
                  'icon_emoji': ':skull:',
                  'link_names': 1,
                  'channel': channel}

    response = requests.post(
        webhook_url, data=json.dumps(slack_data),
        headers={'Content-Type': 'application/json'}
    )
    if response.status_code != 200:
        print 'Slack returned an error {}, the response is:\n{}\n'.format(response.status_code, response.text)
        print 'Assume that the channel {} was not notified of your message:\n{}\n'.format(channel, message)
        return False

    print 'The channel {} was notified of your message:\n{}\n'.format(channel, message)
    return True
