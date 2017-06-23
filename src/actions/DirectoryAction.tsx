import { Dispatch } from 'react-redux';

import { DirectoryAction } from '../types/Actions';

import { Client } from 'msgraph-sdk-javascript';

import User from '../models/User';

export function searchUsers(searchValue: string, dispatch: Dispatch<{}>) {
    let token: string = localStorage.getItem('token');

    let client = Client.init({
      debugLogging: false,
      authProvider: (done) => {
        done(null, token);
      }
    });
  
    client
      .api('/users')
      .filter('startswith(displayName, \'' + searchValue + '\')')
      .get((err, res) => {
        if (!err) {
          let users = [];
          if (res) {
            users = res.value;
          }
          dispatch(usersSearchSucceed(users));
        }else {
          // dispatch(displayMessage(err.message));
         }
      });  
    return {
            type: 'DIRECTORY_USERS_SEARCH_REQUEST'
    };    
}

function usersSearchSucceed(users: Array<User>): DirectoryAction {
    return {
        type: 'DIRECTORY_USERS_SEARCH__SUCCEED',
        users: users
    };      
}