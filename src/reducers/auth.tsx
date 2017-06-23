// import { LOGIN_REQUEST } from '../constants/index';
import { StoreAuthState } from '../types/StoreState';
import { LoginAction } from '../types/Actions';

// Etat du store par défaut
const initialAuthState = {
    isAuthenticated: false,
    isAuthenticating: false,
    token: ''
};

export function auth(state: StoreAuthState = initialAuthState, action: LoginAction) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, isAuthenticating: true };
      /*return Object.assign({}, state, {
            'isAuthenticated': action.isAuthenticated
        });*/
    case 'LOGIN_SUCCEED':
      return { ...state, isAuthenticating: false, isAuthenticated: true, token: action.token };        
    default:
      return state;
  }
}