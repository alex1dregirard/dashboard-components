import * as React from 'react';

import * as actions from '../../actions/UserAction';
import { StoreState } from '../../types/StoreState';
import { connect, Dispatch } from 'react-redux';

import {
  Persona,
  PersonaPresence
} from 'office-ui-fabric-react/lib/Persona';

import User from '../../models/User';

import './ProfilPersona.css';

export interface Props {
  user?: User;
  photoUrl?: string;
  getUserInfo: () => void; 
  getUserPhoto: () => void; 
}

class ProfilPersona extends React.Component<Props, null> {
    
    componentDidMount() {
        this.props.getUserInfo();
        this.props.getUserPhoto();
    }

    render() {
        return (
            <div>
                { 
                    this.props.user &&
                    <Persona 
                        key="myUserPersona"
                        primaryText={this.props.user.displayName}
                        secondaryText={this.props.user.mail}
                        presence={PersonaPresence.dnd}
                        imageUrl = {this.props.photoUrl}
                    />
                 }                
            </div>
        );
    }
}

export function mapStateToProps(state: StoreState) {
  return {
    user: state.user.info,
    photoUrl: state.user.photo
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.AuthAction>) {
  return {
    // TODO voir la bonne syntaxe pour ne pas passer le dispatch en paramètre
    getUserInfo: () => dispatch(actions.getUserInfo(dispatch)),
    getUserPhoto: () => dispatch(actions.getUserPhoto(dispatch)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilPersona);
// export default ProfilPersona;