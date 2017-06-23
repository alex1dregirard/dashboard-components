import * as React from 'react';

import { MessageWidget } from 'react-dashboard-components';

const message1 = {
    receivedDateTime : new Date(),
    subject: 'mySubject 1',
    bodyPreview : 'myBody preview 1',
    sender : {
        name: 'Alexandre Girard',
        adress: 'alexandre.girard@gmail.com' 
    },
    webLink : 'test'
};

const message2 = {
    receivedDateTime : new Date(),
    subject: 'mySubject 2',
    bodyPreview : 'myBody preview 2',
    sender : {
        name: 'Alexandre Girard',
        adress: 'alexandre.girard@gmail.com' 
    },
    webLink : 'test'
};        

const messages = [message1, message2];

const Page1 = () => (

  <div>
    <MessageWidget messages= {messages} />
  </div>
);

export default Page1;