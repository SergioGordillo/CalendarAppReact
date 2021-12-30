import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar } from '../ui/Navbar'
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { calendarSetActiveEvent } from '../../actions/calendarEvents';
import { AddNewFab } from '../ui/AddNewFab';


const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const dispatch = useDispatch(); 
    const { events } = useSelector(state => state.calendar)

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    const onDoubleClick = (e) => {
        console.log("Open modal");
        dispatch(uiOpenModal());
    }

    const onSelectEvent = (e) => {
        dispatch(calendarSetActiveEvent(e));
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    }

    return (
        <div className='calendar-screen'>
            <Navbar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                eventPropGetter= { eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView = { onViewChange }
                view = { lastView }
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab/>

            <CalendarModal/>

        </div>
    )
}
