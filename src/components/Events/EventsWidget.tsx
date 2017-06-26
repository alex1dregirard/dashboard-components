import * as React from 'react';

import * as actions from '../../actions/UserAction';
import { StoreState } from '../../types/StoreState';
import { connect, Dispatch } from 'react-redux';

// O365
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { List } from 'office-ui-fabric-react/lib/List';

// Moment
import Moment from 'react-moment';

import EventItem from './EventItem';

import './Event.css';

interface EventsProps {
    events?: Array<Event>;
    time?: Date;   
    // TODO Voir comment déclarer le bon type pour eventsInterval
    // tslint:disable-next-line
    eventsInterval: any; 
    // TODO Voir comment déclarer le bon type pour eventsInterval
    // tslint:disable-next-line
    getEvents: (eventsInterval: any) => void; 
    // TODO Voir comment déclarer le bon type pour eventsInterval
    // tslint:disable-next-line
    changeEventsInterval: (eventsInterval: any) => void; 
}

class EventsWidget extends React.Component<EventsProps, null> {
    timer() {
        this.props.getEvents(this.props.eventsInterval);
    }

    componentDidMount() {
        this.props.getEvents(this.props.eventsInterval);
        
        // this.props.intervalId = setInterval(this.timer.bind(this), 30000);
        setInterval(this.timer.bind(this), 30000);
    }    

    componentWillReceiveProps(nextProps: EventsProps) {
        if ( JSON.stringify(this.props.eventsInterval) !== JSON.stringify(nextProps.eventsInterval) ) {
            this.props.getEvents(nextProps.eventsInterval);
        }
    }

    render() {
        let noEventsMessage;
        if (this.props.eventsInterval === 'day') {
             noEventsMessage = 'sur la journée';
        } else {
            if (this.props.eventsInterval === 'week') {
                noEventsMessage = 'sur la semaine';
            } else {
                noEventsMessage = 'sur le mois';
            }
        }

        const items = [{
            key: 'calendar',
            icon: 'Calendar'
        }];
        
        const farItems = [{
            key: 'day',
            name: 'Journée',
            icon: 'CalendarDay',
            onClick: this.props.changeEventsInterval.bind(this, 'day')
            },
            {
            key: 'week',
            name: 'Semaine',
            icon: 'CalendarWeek',
            onClick: this.props.changeEventsInterval.bind(this, 'week')
            },
            {
            key: 'month',
            name: 'Mois',
            icon: 'Calendar',
            onClick: this.props.changeEventsInterval.bind(this, 'month')
            }
        ];

        return(
            <div className="event-widget">
                <div className="ms-bgColor-themeTertiary">
                  <div className="directory-header-title ms-font-xxl">
                    Calendrier
                  </div>
                  <div className="messages-header-command">   
                    <CommandBar 
                        items={items}
                        farItems={farItems} 
                    />
                  </div>
                </div>                                
                <div className="event-content ms-bgColor-themeLighterAlt">
                    {               
                        this.props.events.length === 0 &&
                        <div>                            
                            <Label >Pas d'événement {noEventsMessage}</Label>                
                        </div>
                    } 
                    {
                        this.props.events.length !== 0 &&
                        <List
                            items={this.props.events}
                            onRenderCell={ (event, index) => (
                                <EventItem key={event.id} event={event}/>
                        )}
                        />                           
                    }
                </div>
                <div className="event-footer ms-bgColor-themeLighter">
                    <Label className="ms-fontColor-neutralLight mailLabel">
                        Dernière mise à jour à <Moment format="HH:mm:ss">{this.props.time}</Moment>
                    </Label>                                                            
                </div>
            </div>
        ); 
    }
}

export function mapStateToProps(state: StoreState) {
  return {
    events: state.user.events,
    time: state.user.events_request_time,
    eventsInterval : state.user.eventsInterval
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.UserAction>) {
  return {
    // TODO voir la bonne syntaxe pour ne pas passer le dispatch en paramètre
    getEvents: (eventsInterval) => dispatch(actions.getUserEvents(eventsInterval, dispatch)),
    changeEventsInterval: (eventsInterval) => dispatch(actions.changeUserEventsInterval(eventsInterval)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsWidget);