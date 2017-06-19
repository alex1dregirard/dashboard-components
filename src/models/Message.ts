class EmailAdress {
    name: string;
    adress: string 
}

export default class Message {
    receivedDateTime : Date;
    subject: string;
    bodyPreview : string;
    sender : EmailAdress;
    webLink : string;
}