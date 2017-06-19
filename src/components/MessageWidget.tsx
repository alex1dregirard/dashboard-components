import * as React from 'react';

// O365
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { List } from 'office-ui-fabric-react/lib/List';
import { Label } from 'office-ui-fabric-react/lib/Label';

// Moment
import Moment from 'react-moment';

import MessageItem from './MessageItem';

import './Message.css';

interface MailProps {
    bar: string;
}

class MessageWidget extends React.Component<MailProps, null> {
    render() {
        const items = [{
            key: 'mail',
            icon: 'Mail'
        }];

        const farItems = [{
            key: 'sort',
            name: 'Trier',
            icon: 'SortLines',
            // onClick: this.sort.bind(this)
        }];        

        const message1 = {
            receivedDateTime : new Date(),
            subject: 'mySubject',
            bodyPreview : 'myBody preview',
            sender : {
                name: 'Alexandre Girard',
                adress: 'alexandre.girard@gmail.com' 
            },
            webLink : 'test'
        };

        const message2 = {
            receivedDateTime : new Date(),
            subject: 'mySubject',
            bodyPreview : 'myBody preview',
            sender : {
                name: 'Alexandre Girard',
                adress: 'alexandre.girard@gmail.com' 
            },
            webLink : 'test'
        };        

        const messages = [message1, message2];

        return(
            <div className="message-widget">
                <CommandBar 
                    className="ms-bgColor-themeLighterAlt"
                    items={items}
                    farItems={farItems}
                />
                <List
                    className="ms-bgColor-themeLighterAlt widget"
                    items={messages}
                    onRenderCell={ (message, index) => (
                        <MessageItem key={message.id} message={message}/>
                    ) }
                />   
                <Label className="ms-bgColor-themeLighterAlt ms-fontColor-neutralLight mailLabel">
                    Dernière mise à jour à <Moment format="HH:mm:ss">{new Date()}</Moment>
                </Label>                    
            </div>
        ); 
    }
}

export default MessageWidget;