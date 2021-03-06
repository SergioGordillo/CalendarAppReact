import moment from 'moment'
import { types } from '../types/types';


const initialState = {
    events: [{
        id: new Date().getTime(),
        title: "Carmela's Birthday",
        start: moment().toDate(),
        end: moment().add(2,'hours').toDate(),
        bgcolor: '#fafafa',
        notes: 'Having a party',
        user: {
            _id: '123',
            name: 'Sergio'
        }
    }],
    activeEvent: null
}

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.calendarSetActiveEvent:
            return {
                ...state,
                activeEvent: action.payload
            };
        case types.calendarAddNewEvent:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            };
        case types.calendarEventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            };
        case types.calendarEventUpdate:
            return {
                ...state,
                events: state.events.map(
                    e => (e.id===action.payload.id) ? action.payload : e
                )
            };
        case types.calendarEventDelete:
            return {
                ...state,
                events: state.events.filter(
                    e => (e.id!==state.activeEvent.id)
                ),
                activeEvent: null
            }

        default:
            return state;
    }
}