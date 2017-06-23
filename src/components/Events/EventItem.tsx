import * as React from 'react';

// O365
// import {Link} from 'office-ui-fabric-react/lib/Link';

import * as moment from 'moment';

import Event from '../../models/Event';

// import './Message.css';

interface EventItemProps {
    event: Event;
}

class EventItem extends React.Component<EventItemProps, null> {
    
    render() {
        return (
            <div>
                <div className="ms-ListBasicExample-itemCell mail" data-is-focusable={true}>
                        <div className="eventItem">
                            <div className="eventItem-firstline ms-font-l">
                                <b>{this.props.event.subject} par {this.props.event.organizer.emailAddress.name}</b>
                            </div>
                            <div className="eventItem-firstline receivedDateTime">
                                {this.displayDate(this.props.event.createdDateTime)}
                            </div>
                        </div>                                
                        <div className="eventItem-desc ms-font-s">
                            {this.props.event.bodyPreview + '...'}
                        </div>
                </div>
            </div>
        );
    }

    private displayDate( mydate: Date ) {
        let today = moment();
        let date = moment(mydate);

        if (today.week() === date.week() ) {
            return date.format('ddd hh:mm');
        } else {
            return date.format('DD/MM/YYYY');
        }
    }

}

export default EventItem;