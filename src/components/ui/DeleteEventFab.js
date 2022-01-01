import React from 'react'
import { useDispatch } from 'react-redux';
import { calendarEventDelete } from '../../actions/calendarEvents';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(calendarEventDelete());
    }

    return (
        <button className="btn btn-danger fab-danger"
                onClick={handleDelete}>
            <i className="fas fa-trash"></i>
            <span> Delete Event </span>
        </button>
    )
}
