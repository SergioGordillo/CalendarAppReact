import moment from 'moment'
import { types } from '../types/types';


const initialState = {
    events: [{
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
            }
        default:
            return state;
    }
}