// import { LOGIN_REQUEST } from '../constants/index';
import { StoreDirectoryState } from '../types/StoreState';
import { DirectoryAction } from '../types/Actions';

// Etat du store par défaut
const initialDirectoryState = {
  searchValue: '',
  users: []
};

export function directory(state: StoreDirectoryState = initialDirectoryState, action: DirectoryAction) {
  switch (action.type) {
    case 'DIRECTORY_USERS_SEARCH__SUCCEED' : 
      return { ...state, searchValue: action.searchValue, users: action.users };                  
    default:
      return state;
  }
}