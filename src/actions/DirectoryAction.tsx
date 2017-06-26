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
    
    let users = [];
    if(searchValue.length != 0){
      client
        .api('/users')
        .filter('startswith(displayName, \'' + searchValue + '\')')
        .get((err, res) => {
          if (!err) {
            if (res) {
              users = res.value;
            }
            dispatch(usersSearchSucceed(searchValue, users));
          }else {
            // dispatch(displayMessage(err.message));
          }
        });  
    }else{
      dispatch(usersSearchSucceed(searchValue ,users));      
    }

    return {
            type: 'DIRECTORY_USERS_SEARCH_REQUEST',
            searchValue: searchValue
    };    
}

function usersSearchSucceed(searchValue: string, users: Array<User>): DirectoryAction {
    return {
        type: 'DIRECTORY_USERS_SEARCH__SUCCEED',
        users: users,
        searchValue : searchValue

    };      
}