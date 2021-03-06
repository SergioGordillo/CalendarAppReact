import { types } from "../types/types";

export const calendarAddNewEvent = (event) => ({
    type: types.calendarAddNewEvent,
    payload: event
});

export const calendarSetActiveEvent = (event) => ({
    type: types.calendarSetActiveEvent,
    payload: event
});

export const calendarEventClearActiveEvent = () => ({type: types.calendarEventClearActiveEvent});
export const calendarEventUpdate = (event) => ({
    type: types.calendarEventUpdate,
    payload: event
});

export const calendarEventDelete = () => ({type: types.calendarEventDelete});
