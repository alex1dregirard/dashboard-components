import { Dispatch } from 'react-redux';

import * as moment from 'moment';
import { UserAction } from '../types/Actions';

import { Sort } from '../types/StoreState';
import User from '../models/User';

import Message from '../models/Message';
import Event from '../models/Event';

import { Client } from 'msgraph-sdk-javascript';

export function getUserInfo(dispatch: Dispatch<{}>) {
    let token: string = localStorage.getItem('token');

    let client = Client.init({
      debugLogging: true,
      authProvider: (done) => {
        done(null, token);
      }
    });

    client
      .api('/me')
      .get((err, res) => {
        if (!err) {
          dispatch(userInfoSucceed(res));
        }else {
          // dispatch(displayMessage(err.message));
        }
      });

    return {
      type: 'USER_INFO_REQUEST'
    };
}

function userInfoSucceed(user: User): UserAction {
    return {
        type: 'USER_INFO_SUCCEED',
        user : user
    };      
}

export function getUserPhoto(dispatch: Dispatch<{}>) {
    let token: string = localStorage.getItem('token');

    let client = Client.init({
      debugLogging: false,
      authProvider: (done) => {
        done(null, token);
      }
    });
    
    client
        .api('/me/photo/$value')
        .header('Cache-Control', 'no-cache')      
        .responseType('blob')      
        .get((err, res, rawResponse) => {
            if (!err) {
            dispatch(userPhotoSucceed(window.URL.createObjectURL(rawResponse.xhr.response)));
            }else {
            // dispatch(displayMessage(err.message));
            }
    });
    return {
            type: 'USER_INFO_REQUEST'
    };
}

function userPhotoSucceed(photoUrl: string): UserAction {
    return {
        type: 'USER_PHOTO_SUCCEED',
        photo : photoUrl
    };      
}

export function getUserMessages(sort: Sort, dispatch: Dispatch<{}>) {
    let token: string = localStorage.getItem('token');

    let client = Client.init({
      debugLogging: false,
      authProvider: (done) => {
        done(null, token);
      }
    });

    client
      .api('/me/mailFolders/inbox')
      .get((err, res) => {
        if (!err) {
          if (res) {
          }
          dispatch(userInboxSucceed(res.unreadItemCount, res.totalItemCount));
        }else {
          // dispatch(displayMessage(err.message));
         }
    });

    client
      .api('/me/mailFolders/inbox/messages')
      .orderby(sort.field + '%20' + sort.order)
      .top(10)
      .get((err, res) => {
        if (!err) {
          let messages = [];
          if (res) {
            messages = res.value;
          }
          dispatch(userMessagesSucceed(messages));
        }else {
          // dispatch(displayMessage(err.message));
         }
      });
    return {
            type: 'USER_MESSAGES_REQUEST'
    };  
}

function userInboxSucceed(unreadItemCount: number, totalItemCount: number): UserAction {
    return {
        type: 'USER_INBOX_SUCCEED',
        unreadItemCount: unreadItemCount,
        totalItemCount: totalItemCount
    };      
}

function userMessagesSucceed(messages: Array<Message>): UserAction {
    return {
        type: 'USER_MESSAGES_SUCCEED',
        messages: messages
    };      
}

export function sortUserMessages(): UserAction {
    return {
        type: 'USER_MESSAGES_SORT',
    };      
}

// TODO Voir comment déclarer le bon type pour eventsInterval
// tslint:disable-next-line
export function getUserEvents(eventsInterval: any, dispatch: Dispatch<{}>) {
    let token: string = localStorage.getItem('token');

    let client = Client.init({
      debugLogging: true,
      authProvider: (done) => {
        done(null, token);
      }
    });
  
    let startdatetime = moment().hours(0).minutes(0).seconds(0).milliseconds(0);
    let enddatetime = moment(startdatetime).endOf(eventsInterval);

    client
      .api('/me/calendarview?startdatetime=' + startdatetime.toISOString() 
        + '&enddatetime=' + enddatetime.toISOString())
      .get((err, res) => {
        if (!err) {
          let events = [];
          if (res) {
            events = res.value;
          }
          dispatch(userEventsSucceed(events));
        }else {
          // dispatch(displayMessage(err.message));
         }
      });  
    return {
            type: 'USER_EVENTS_REQUEST'
    };    
}

function userEventsSucceed(events: Array<Event>): UserAction {
    return {
        type: 'USER_EVENTS_SUCCEED',
        events: events
    };      
}

// TODO Voir comment déclarer le bon type pour eventsInterval
// tslint:disable-next-line
export function changeUserEventsInterval(eventsInterval: any): UserAction {
    return {
        type: 'USER_EVENTS_INTERVAL',
        eventsInterval : eventsInterval
    };      
}