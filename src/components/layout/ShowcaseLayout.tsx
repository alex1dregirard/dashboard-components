import * as React from 'react';

// import * as ResponsiveEmbed from 'react-responsive-embed';

var ReactGridLayout = require('react-grid-layout');

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

// import { MessageWidget } from 'react-dashboard-components';

import MessagesWidget from '../Messages/MessagesWidget';
import EventsWidget from '../Events/EventsWidget';
import DirectoryWidget from '../Directory/DirectoryWidget';


var ShowcaseLayout = React.createClass({
  render: function () {
    return (
      <div> 
      <SearchBox labelText="Rechercher" />
      <ReactGridLayout 
        className="layout" 
        cols={12} 
        rowHeight={50} 
        width={1200}
        isDraggable={true} 
        isResizable={true}
      >
        <div key="messages" data-grid={{x: 0, y: 0, w: 6, h: 4, minW: 4, minH: 4}}>
            <MessagesWidget key="messagesWidget" />
        </div>
        <div key="events" data-grid={{x: 8, y: 0, w: 6, h: 4, minW: 4, minH: 4}}>
            <EventsWidget key="eventsWidget" />
        </div>        
        <div key="b" data-grid={{x: 0, y: 0, w: 6, h: 4 }}>
            <DirectoryWidget key="directoryWidget" />
            {/*
            <ResponsiveEmbed src="https://www.youtube.com/embed/2yqz9zgoC-U" />
            */}
        </div>
        <div key="d" data-grid={{x: 4, y: 1, w: 4, h: 3}}>
          d
        </div>        
      </ReactGridLayout>
      </div>
    );
  }
});

export default ShowcaseLayout;