import * as React from 'react';

import { StoreState } from '../../types/StoreState';

import { connect, Dispatch } from 'react-redux';

// Routing
import { Route } from 'react-router-dom';

// Swipe
import SwipeableRoutes from 'react-swipeable-routes';

// Composants de l'application
import Page1 from './Page1';
import Page2 from './Page2';
import UnsignedPage from './UnsignedPage';

export interface BodyProps {
  isAuthenticated: boolean;
}
class Body extends React.Component<BodyProps, null> {
    render() {
        const authentifiedBody = (
            <SwipeableRoutes swipeableViewsProps={{enableMouseEvents: false}}>
              <Route path="/sites" component={Page2} />              
              <Route path="/dashboard" component={Page1} />              
            </SwipeableRoutes>            
        );

        return (
            <div className="content">
                {
                this.props.isAuthenticated ? authentifiedBody : <UnsignedPage />
                }
            </div>
        );
    }
}

export function mapStateToProps(state: StoreState) {
  return {
    isAuthenticated : state.auth.isAuthenticated,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.AuthAction>) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Body);

// export default Body;