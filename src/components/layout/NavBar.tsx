import * as React from 'react';

import * as actions from '../../actions/AuthAction';
import { StoreState } from '../../types/StoreState';
import { connect, Dispatch } from 'react-redux';

import './NavBar.css';

import { CommandButton } from 'office-ui-fabric-react/lib/Button';

// Composants de l'application
import ProfilPersona from '../Profil/ProfilPersona';

export interface Props {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  onLogin?: () => void; 
}

class NavBar extends React.Component<Props, null> {

    render() {
        
        const unloggedButtons = (
        <div className="unlogged ms-font-xl">
            <CommandButton
                iconProps={{iconName: 'WindowsLogo'}}
                onClick={this.props.onLogin}
            >
                Connection
            </CommandButton>
        </div>
        );
        
        return (
            <div className="NavBar ms-bgColor-themePrimary">
                <div className="logo ms-font-xl">
                    <strong>Dashboard VIP</strong>
                </div>
                {this.props.isAuthenticated ? <ProfilPersona /> : unloggedButtons}
            </div>
        );
    }
}

export function mapStateToProps(state: StoreState) {
  return {
    isAuthenticated : state.auth.isAuthenticated,
    isAuthenticating : state.auth.isAuthenticating,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.AuthAction>) {
  return {
      // TODO voir la bonne syntaxe pour ne pas passer le dispatch en paramètre
    onLogin: () => dispatch(actions.login(dispatch)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
// export default NavBar;