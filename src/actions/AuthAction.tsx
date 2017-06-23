import { Dispatch } from 'react-redux';

// Fichier de configuration
import { applicationId, redirectUri, scope } from '../config';

import * as hello from 'hellojs';

// Demande de connexion en cours
function loginRequest() {
    return {
        type: 'LOGIN_REQUEST'
    };
}

function loginSucceed(token: string) {
    return {
        type: 'LOGIN_SUCCEED',
        token : token
    };      
}

function loginFailed() {
    return {
        type: 'LOGIN_FAILED'
    };        
}

export function checklogin(dispatch: Dispatch<{}>) {
    let helloJSServiceDef = {
        name: 'Azure Active Directory',
        oauth: {
            version: 2,
            auth: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
            request : '',
            token : ''
        }
    };   

    hello.init(
        { aad : applicationId}
    );    

    hello.init(
        { aad : helloJSServiceDef}
    );

    var currentTime = (new Date()).getTime() / 1000;

    let authResponse = hello('aad').getAuthResponse();

    if ( authResponse && authResponse.expires > currentTime) {
      let token = authResponse.access_token;
      localStorage.setItem('token', token); // TODO Voir si c'est la bonne façon de gérer le token
      dispatch(loginSucceed(token)); 
    } else {
      dispatch(loginFailed()); // TODO A remplacer par une méthode notLogged
    }        
}

export function login(dispatch: Dispatch<{}>) {
    let helloJSServiceDef = {
        name: 'Azure Active Directory',
        oauth: {
            version: 2,
            auth: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
            request : '',
            token : ''
        }
    };   

    hello.init(
        { aad : applicationId}
    );    

    hello.init(
        { aad : helloJSServiceDef}
    );

    let options = {
        redirect_uri: redirectUri,
        scope: scope,
        display: 'popup'
    };

    hello.login('aad', options).then(
        function() {
            let token = hello('aad').getAuthResponse().access_token;
            return dispatch(loginSucceed(token));
        },
        function(e: Error) {
            return dispatch(loginFailed());
        }
    );  
    return dispatch(loginRequest);
}