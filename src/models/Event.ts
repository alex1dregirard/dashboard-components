import {EmailAddress} from './commons';

export default class Event {
    subject: string;
    createdDateTime: Date;
    bodyPreview: string;
    organizer: Organizer;
}

class Organizer {
    emailAddress : EmailAddress;
}