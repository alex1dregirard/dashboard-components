import * as React from 'react';

//import * as actions from '../../actions/UserAction';
import { StoreState } from '../../types/StoreState';
import { connect, Dispatch } from 'react-redux';

interface MailProps {
    unreadItemCount: number;
    totalItemCount: number;
}

class MessagesWidgetSmall extends React.Component<MailProps, null> {
    render() {
        return(
            <div>
                Lu : <span>{this.props.totalItemCount}</span>
                Non Lu : <span>{this.props.unreadItemCount}</span>
            </div>
        ); 
    }
}

export function mapStateToProps(state: StoreState) {
  return {
    unreadItemCount: state.user.unreadItemCount,
    totalItemCount: state.user.totalItemCount,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.UserAction>) {
  return {
    // TODO voir la bonne syntaxe pour ne pas passer le dispatch en paramètre
    // getUserMessages: (sort) => dispatch(actions.getUserMessages(sort, dispatch)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesWidgetSmall);

// export default MessageWidget;