import * as React from 'react';

import {Responsive, WidthProvider} from 'react-grid-layout';
var ResponsiveReactGridLayout = WidthProvider(Responsive);

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// import MessagesWidget from '../Messages/MessagesWidget';
import MessagesWidget from '../Messages/MessagesWidget';
import EventsWidget from '../Events/EventsWidget';
import DirectoryWidget from '../Directory/DirectoryWidget';

interface Props { 
  messagesWidgetWidth: number; 
}

class Page2 extends React.Component<Props, null> {
  render() {


    var layout = [
      {i: 'messages', x: 0, y: 0, w: 6, h: 3, minW: 2, minH: 2},
      {i: 'events', x: 6, y: 0, w: 6, h: 3, minW: 4, minH: 4},
      {i: 'directory', x: 0, y: 0, w: 6, h: 2 },
      {i: 'messages2', x: 0, y: 0, w: 2, h: 2, minW: 2, minH: 2},
    ];

    var layouts = {lg: layout}

    return (
      <div>
        <ResponsiveReactGridLayout 
          className="layout" 
          layouts={layouts}
          breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
          cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
          rowHeight={94} 
          isDraggable={true} 
          isResizable={true}
        >
          <div key={'messages'}>
              <MessagesWidget key="messagesWidget" />
          </div>
          <div key={'events'}>
              <EventsWidget key="eventsWidget" />
          </div>        
          <div key={'directory'}>
              <DirectoryWidget key="directoryWidget" />
          </div>
          <div key={'messages2'}>
              <MessagesWidget key="messages2Widget" />
          </div>          
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

export default Page2;