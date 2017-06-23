// import { LOGIN_REQUEST } from '../constants/index';
import { StoreUserState } from '../types/StoreState';
import { UserAction } from '../types/Actions';

// Etat du store par défaut
const initialUserState = {
  info : null,
  photo : '',
  messages : [],
  unreadItemCount: null,
  totalItemCount: null,
  messages_request_time : new Date(),
  events : [],
  events_request_time : new Date(),  
  eventsInterval : 'day',
  sorts : {
    messages : {
      field : 'receivedDateTime',
      order : 'desc'
    }
  }
};

export function user(state: StoreUserState = initialUserState, action: UserAction) {
  switch (action.type) {
    case 'USER_INFO_SUCCEED':
      return { ...state, info: action.user };
    case 'USER_PHOTO_SUCCEED':
      return { ...state, photo: action.photo };            
    case 'USER_MESSAGES_SUCCEED':
      return { ...state, messages: action.messages, messages_request_time : new Date() };            
  case 'USER_INBOX_SUCCEED':
      return { ...state, unreadItemCount: action.unreadItemCount, totalItemCount: action.totalItemCount };                  
    case 'USER_MESSAGES_SORT' : 
      // A déplacer, ce traitement n'est pas fait au bon endroit
      let sortOrder = (state.sorts.messages.order === 'asc' ? 'desc' : 'asc');
      // FIN 
      return Object.assign({}, state, {
          sorts : {
              messages : {
                  field : 'receivedDateTime',
                  order : sortOrder
              }
          }
      });        
    case 'USER_EVENTS_SUCCEED' : 
      return { ...state, events: action.events, events_request_time : new Date() };            
    case 'USER_EVENTS_INTERVAL' : 
      return { ...state, eventsInterval: action.eventsInterval };                  
    default:
      return state;
  }
}