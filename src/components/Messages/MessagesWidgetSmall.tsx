import * as React from 'react';

import * as actions from '../../actions/UserAction';
import { StoreState, Sort } from '../../types/StoreState';
import { connect, Dispatch } from 'react-redux';

import Message from '../../models/Message';

import './Message.css';

interface MailProps {
    messages: Array<Message>;
    time: Date;
    sort: Sort;
    getUserMessages: (sort: Sort) => void; 
    sortUserMessages: () => void; 
}

class MessagesWidgetSmall extends React.Component<MailProps, null> {
    
    timer() {
        this.props.getUserMessages(this.props.sort);
    }
  
    componentDidMount() {
        this.props.getUserMessages(this.props.sort);
        
        // this.props.intervalId = setInterval(this.timer.bind(this), 30000);
        setInterval(this.timer.bind(this), 30000);
    }
    
    componentWillUnmount() {
        // clearInterval(this.intervalId);
    }

    componentWillReceiveProps(nextProps: MailProps) {
        if ( JSON.stringify(this.props.sort) !== JSON.stringify(nextProps.sort) ) {
            this.props.getUserMessages(nextProps.sort);
        }
    }

    render() {
        return(
            <div>
                Nombre de message <span>{this.props.messages.length}</span>
            </div>
        ); 
    }
}

export function mapStateToProps(state: StoreState) {
  return {
    messages: state.user.messages,
    sort : state.user.sorts.messages
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.UserAction>) {
  return {
    // TODO voir la bonne syntaxe pour ne pas passer le dispatch en paramètre
    getUserMessages: (sort) => dispatch(actions.getUserMessages(sort, dispatch)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesWidgetSmall);

// export default MessageWidget;