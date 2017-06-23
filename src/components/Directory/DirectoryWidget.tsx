import * as React from 'react';

import * as actions from '../../actions/DirectoryAction';
import { StoreState } from '../../types/StoreState';
import { connect, Dispatch } from 'react-redux';

import User from '../../models/User';

// O365
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { List } from 'office-ui-fabric-react/lib/List';
import { Label } from 'office-ui-fabric-react/lib/Label';

import {
  Persona,
  PersonaPresence
} from 'office-ui-fabric-react/lib/Persona';

// Moment
// import Moment from 'react-moment';

// import Message from '../../models/Message';

import './Directory.css';

interface DirectoryProps {
  users: Array<User>;
  searchUsers: (newValue: string) => void;   
}

class DirectoryWidget extends React.Component<DirectoryProps, null> {
    render() {
        return(
            <div className="directory-widget">
                <div className="messages-header ms-bgColor-themeTertiary">
                  <div className="directory-header-title ms-font-xxl">
                    Annuaire d'entreprise
                  </div>
                  <div className="directory-header-search">   
                    <SearchBox 
                      labelText="Rechercher" 
                      onChange={(newValue) => this.props.searchUsers(newValue)}
                    />
                  </div>
                </div>
                <div className="messages-content">
                    {               
                        this.props.users.length === 0 &&
                        <div>                            
                            <Label>Pas d'utilisateurs correspondant à votre recherche</Label>                
                        </div>
                    } 
                    {
                        this.props.users.length !== 0 &&
                        <List
                            items={this.props.users}
                            onRenderCell={ (user, index) => (
                              <Persona 
                                  key="myUserPersona"
                                  primaryText={user.displayName}
                                  secondaryText={user.mail}
                                  tertiaryText={'In a meeting'}
                                  optionalText={'Available at 4:00pm'}
                                  presence={PersonaPresence.dnd}

                              />
                        )}
                        />                           
                    }                  
                </div>
                <div className="messages-footer ms-bgColor-themeLighter" />
            </div>
        ); 
    }
}

export function mapStateToProps(state: StoreState) {
  return {
    users: state.directory.users,
    // time: state.user.messages_request_time,
    // sort : state.user.sorts.messages
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.UserAction>) {
  return {
    // TODO voir la bonne syntaxe pour ne pas passer le dispatch en paramètre
    searchUsers: (newValue: string) => dispatch(actions.searchUsers(newValue, dispatch)),
    // sortUserMessages: () => dispatch(actions.sortUserMessages()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryWidget);

// export default MessageWidget;