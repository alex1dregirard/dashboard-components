import * as React from 'react';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import * as actions from './actions/AuthAction';

import  rootReducer  from './reducers/reducers';

// DevTools
import { composeWithDevTools } from 'redux-devtools-extension';

// Helmet, permet de surcharger les meta-données à la volée
import { Helmet } from 'react-helmet';

// Office UI Fabric 
import {Fabric} from 'office-ui-fabric-react/lib/Fabric';

// Routing
import { BrowserRouter as Router } from 'react-router-dom';

// Composants de l'application
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';

import Body from './components/layout/Body';

// Création du store
let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

class App extends React.Component<{}, null> {
  constructor(props: null) {
      super();

      actions.checklogin(store.dispatch);
  }

  render() {
    return (
      <Provider store={store}>
      <Router>
        <Fabric className="App">
          <Helmet>
            <meta charSet="utf-8" />
            <title>VIP Dashboard</title>
          </Helmet>
          <div className="header">
            <NavBar isAuthenticated={false} />
          </div>        
          <div className="body">
            <Body isAuthenticated={false} />
          </div>
          <div className="footer">
            <Footer />
          </div>          
        </Fabric>
      </Router>
      </Provider>
    );
  }
}

export default App;
