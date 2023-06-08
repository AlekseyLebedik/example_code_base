/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import { Form, FieldArray } from 'redux-form';
import startsWith from 'lodash/startsWith';
import MockAdapter from 'axios-mock-adapter';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

import { API_BASE_URL } from 'dw/config';
import axios from 'dw/core/axios';

import createStore from 'dw/online-configuration/store';

import formDecorator from 'stories/helpers/formDecorator';
import reduxDecorator from 'stories/helpers/reduxDecorator';

import UsersList from 'dw/core/components/FormFields/UsersList';
import UserAutoCompleteComponent from 'dw/online-configuration/components/UserAutoComplete';

import styles from './UsersList.module.css';

const API_REQUEST = `${API_BASE_URL}/titles/1/envs/dev/accounts/`;

const mock = new MockAdapter(axios);

const availableUsers = [
  {
    id: '100000000000001',
    name: 'John Smith',
    username: 'jsmith',
    email: 'jsmith@test.com',
  },
  {
    id: '100000000000002',
    name: 'Hercule Poirot',
    username: 'hpoirot',
    email: 'hpoirot@test.com',
  },
  {
    id: '100000000000003',
    name: 'James Bond',
    username: 'agent007',
    email: '007@test.com',
  },
  {
    id: '100000000000004',
    name: 'John Wick',
    username: 'john_wick',
    email: 'jwick@test.com',
  },
  {
    id: '100000000000005',
    name: 'King Kong',
    username: 'king_kong',
    email: 'kkong@test.com',
  },
  {
    id: '100000000000006',
    name: 'Alladin',
    username: 'aladin',
    email: 'aladin@test.com',
  },
  {
    id: '100000000000007',
    name: 'DiabloIII',
    username: 'diabloIII',
    email: 'diabloIII@test.com',
  },
  {
    id: '100000000000008',
    name: 'Golden Cobra',
    username: 'gold_cobra',
    email: 'gcobra@test.com',
  },
  {
    id: '100000000000009',
    name: 'Mister Bin',
    username: 'mister_bin',
    email: 'mister-bin@test.com',
  },
  {
    id: '100000000000010',
    name: 'Lost in Games',
    username: 'lost',
    email: 'lost@test.com',
  },
];

const accountsResponse = config => {
  const {
    params: { q },
  } = config;
  return [
    200,
    {
      data: availableUsers
        .filter(({ username }) => startsWith(username, q))
        .map(({ id: userID, username: userName }) => ({
          userID,
          userName,
        })),
    },
  ];
};

class UsersListWrapper extends Component {
  state = {
    users: availableUsers.slice(0, 2).map(({ id, username }) => ({
      id,
      username,
    })), // {id, username}
  };

  onAdd = user =>
    this.setState(state =>
      !state.users.find(u => u.id === user.id)
        ? { users: [user, ...state.users] }
        : null
    );

  onRemove = users =>
    this.setState(state => {
      const ids = users.map(u => u.id);
      return {
        users: state.users.filter(u => !ids.includes(u.id)),
      };
    });

  render() {
    const { users } = this.state;
    const { expanded } = this.props;
    return (
      <div className={styles.container}>
        <UsersList
          items={users}
          onAdd={this.onAdd}
          onRemove={this.onRemove}
          userInputComponent={UserAutoCompleteComponent}
          excludeColumns={['email']}
          expanded={expanded}
        />
      </div>
    );
  }
}

const { store } = createStore();

store.dispatch({
  type: 'TITLE_SELECTOR.CHANGE_TITLE',
  project: {
    id: 1,
    name: 'GTR Project',
    contentTypeId: 19,
  },
  title: {
    id: 1,
    name: 'GTR-PS3',
    platform: 'PS3',
  },
  environment: {
    id: 1,
    type: 'Development',
    shortType: 'dev',
  },
});

storiesOf('core/UsersList', module)
  .addDecorator(formDecorator)
  .addDecorator(reduxDecorator(store))
  .addDecorator(withInfo())
  .add('default', () => {
    mock.onGet(API_REQUEST).reply(accountsResponse);
    return <UsersListWrapper expanded={boolean('expanded', true)} />;
  })
  .add('FieldArray example', () => (
    <div className={styles.container}>
      <Form onSubmit={() => {}}>
        <FieldArray
          name="users"
          component={UsersList}
          props={{ availableUsers, expanded: boolean('expanded', false) }}
        />
      </Form>
    </div>
  ));
