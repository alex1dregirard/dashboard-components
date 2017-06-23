import * as React from 'react';

import * as Moment from 'moment';
import locale_fr from 'moment/locale/fr';

import Message from '../../models/Message';

import './Message.css';

interface MessageItemProps {
    message: Message;
}

class MessageItem extends React.Component<MessageItemProps, null> {
    
    render() {
        let sender = this.props.message.sender;
        return (
            <div className="message ms-bgColor-themeLight--hover">
                <div className="message-firstline">
                    <span className="ms-font-m ms-fontWeight-semibold">{this.props.message.subject}</span>
                </div>
                <div className="message-secondline ">  
                    <div className="message-sender">              
                        <span className="ms-font-m">par&nbsp;
                            <span className="ms-fontWeight-semibold">{sender.emailAddress.name}</span>
                        </span>
                    </div>
                    <div className="message-receivedDateTime">
                        <span className="ms-font-m ms-fontWeight-semilight">
                            {this.displayDate(this.props.message.receivedDateTime)}
                        </span>
                    </div>
                </div>                                
                <div className="message-desc ms-font-m">
                    {this.props.message.bodyPreview + '...'}
                </div>
            </div> 
        );
    }

    private displayDate( mydate: Date ) {
        Moment.locale(locale_fr);
        let today = Moment();
        let date = Moment(mydate);

        if (today.week() === date.week() ) {
            return date.format('dddd HH:mm');
        } else {
            return date.format('DD/MM/YYYY');
        }
    }

}

export default MessageItem;