import Message from '../models/Message';

export interface LoginAction {
  type: string;
  token?: string
}

export interface UserAction {
  type: string;
  user?: any;
  photo?: string;
  messages?:Array<Message>;
  events?:any
  eventsInterval?: any
  unreadItemCount?: number,
  totalItemCount?: number
}

export interface DirectoryAction {
  type: string;  
  users?: any;
}