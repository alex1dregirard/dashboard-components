import {EmailAddress} from './commons';

export default class Message {
    receivedDateTime : Date;
    subject: string;
    bodyPreview : string;
    sender : {
        emailAddress : EmailAddress;
    };
    webLink : string;
}