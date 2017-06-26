import * as React from 'react';

import * as actions from '../../actions/UserAction';
import { StoreState, Sort } from '../../types/StoreState';
import { connect, Dispatch } from 'react-redux';

// O365
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { List } from 'office-ui-fabric-react/lib/List';
import { Label } from 'office-ui-fabric-react/lib/Label';

// Moment
import Moment from 'react-moment';

import MessageItem from './MessageItem';

import Message from '../../models/Message';

import './Message.css';

interface MailProps {
    messages: Array<Message>;
    time: Date;
    sort: Sort;
    getUserMessages: (sort: Sort) => void; 
    sortUserMessages: () => void; 
}

class MessagesWidgetLarge extends React.Component<MailProps, null> {
    
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

        const items = [{
            key: 'mail',
            icon: 'Mail'
        }];

        const farItems = [{
            key: 'sort',
            name: 'Trier',
            icon: 'SortLines',
            onClick: this.props.sortUserMessages.bind(this)
        }];        
        
        return(
            <div className="messages-widget">
                <div className="ms-bgColor-themeTertiary">
                  <div className="directory-header-title ms-font-xxl">
                    Messagerie
                  </div>
                  <div className="messages-header-command">   
                    <CommandBar
                        items={items}
                        farItems={farItems}
                    />
                  </div>
                </div>                
                <div className="messages-content">
                    <List
                        className="ms-bgColor-themeLighterAlt"
                        items={this.props.messages}
                        onRenderCell={ (message, index) => (
                            <MessageItem key={message.id} message={message}/>
                    )}
                    />                           
                </div>
                <div className="messages-footer ms-bgColor-themeLighter">
                    <Label className="mailLabel ms-fontWeight-light">
                        Dernière mise à jour à <Moment format="HH:mm:ss">{this.props.time}</Moment>
                    </Label>                                        
                </div>
            </div>
        ); 
    }
}

export function mapStateToProps(state: StoreState) {
  return {
    messages: state.user.messages,
    time: state.user.messages_request_time,
    sort : state.user.sorts.messages
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.UserAction>) {
  return {
    // TODO voir la bonne syntaxe pour ne pas passer le dispatch en paramètre
    getUserMessages: (sort) => dispatch(actions.getUserMessages(sort, dispatch)),
    sortUserMessages: () => dispatch(actions.sortUserMessages()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesWidgetLarge);

// export default MessageWidget;