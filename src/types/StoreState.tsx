// Store de l'application
export interface StoreState {
    auth: StoreAuthState;
    user: StoreUserState;
    directory : StoreDirectoryState;
}

// Partie du store gérant la notion d'authentification
export interface StoreAuthState {
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    token: string;
}

// Partie du store gérant la notion d'user
export interface StoreUserState {
    info : any,
    photo : string,
    messages : any
    messages_request_time : Date,
    events : Array<any>,
    events_request_time : Date,
    eventsInterval : string, 
    sorts : {
        messages : Sort
    }
}

// Partie du store gérant la notion de directory
export interface StoreDirectoryState {
    users: Array<any>
}


export interface Sort {
    field : string,
    order : string
}