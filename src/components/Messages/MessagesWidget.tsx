import * as React from 'react';

import sizeMe from 'react-sizeme';

import MessagesWidgetSmall from './MessagesWidgetSmall';
import MessagesWidgetLarge from './MessagesWidgetLarge';

import './Message.css';

interface Props {
    size: any;
}

class MessagesWidget extends React.Component<Props, null> {
  render() {
    const { width } = this.props.size;

    return (
        <div className="test">
            {
                width < 250 ? <MessagesWidgetSmall /> : <MessagesWidgetLarge />
            }
        </div>
    );
  }
}

export default sizeMe({ monitorHeight: true })(MessagesWidget);