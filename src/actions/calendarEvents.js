import { types } from "../types/types";

export const calendarAddNewEvent = (event) => ({
    type: types.calendarAddNewEvent,
    payload: event
});

export const calendarSetActiveEvent = (event) => ({
    type: types.calendarSetActiveEvent,
    payload: event
});

