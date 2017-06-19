import * as React from 'react';

// O365
import {Link} from 'office-ui-fabric-react/lib/Link';

import * as moment from 'moment';

import Message from '../models/Message';

import './Message.css';

interface MessageItemProps {
    message: Message;
}

class MessageItem extends React.Component<MessageItemProps, null> {
    
    render() {
        return (
            <div>
                <div className="mailItem">
                    <div className="mailItem-firstline mailItem-subject">
                        <span className="ms-font-xl">{this.props.message.subject}</span>
                        <span className="ms-font-l"> par {this.props.message.sender.adress}</span>
                    </div>
                    <div className="mailItem-firstline ms-font-l ms-fontWeight-light mailItem-receivedDateTime">
                        {this.displayDate(this.props.message.receivedDateTime)}
                    </div>
                </div>                                
                <div className="mailItem-desc ms-font-m">
                    <Link href={this.props.message.webLink} target="_blank">
                        {this.props.message.bodyPreview + '...'}
                    </Link>                             
                </div>
            </div> 
        );
    }

    private displayDate( mydate: Date ) {
        let today = moment();
        let date = moment(mydate);

        if (today.week() === date.week() ) {
            return date.format('ddd hh:mm');
        } else {
            return date.format('DD/MM/YYYY');
        }
    }

}

export default MessageItem;