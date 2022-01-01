import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2'

import { uiCloseModal } from '../../actions/ui';
import { calendarAddNewEvent, calendarEventClearActiveEvent, calendarEventUpdate } from '../../actions/calendarEvents';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const later= now.clone().add(1, "hours");

const initEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: later.toDate()
}

export const CalendarModal = () => {

  const dispatch = useDispatch();

  const { openModal } = useSelector(state => state.ui)
  const { activeEvent } = useSelector(state => state.calendar)

  const [startDate, setStartDate] = useState(now.toDate());
  const [endDate, setEndDate] = useState(later.toDate());
  const [validTitle, setValidTitle] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);

  const { notes, title, start, end } = formValues; 

  useEffect(() => {
    if (activeEvent) {
      setFormValues (activeEvent);
    } else {
      setFormValues (initEvent);
    }
  }, [activeEvent, setFormValues]);

  const handleInputChange = ( { target } ) => {
    setFormValues({
      ...formValues,
      [target.name]:target.value
    });
  }

  const closeModal = () => {
   dispatch(uiCloseModal());
   dispatch(calendarEventClearActiveEvent());
   setFormValues(initEvent);
  }

  const handleStartDateChange = (e) => {
    setStartDate(e);
    setFormValues({
      ...formValues,
      start: e
    });
  }

  const handleEndDateChange = (e) => {
    setEndDate(e);
    setFormValues({
      ...formValues,
      end: e
    });
  }

  const handleSubmit = (e) => {
      e.preventDefault();

      const momentStart = moment(start);
      const momentEnd = moment(end);

      if (momentStart.isSameOrAfter(momentEnd)){
        return Swal.fire("Error", "End Date must be later than Start Date", 'error');
      }

      if (title.trim().length < 2) {
        return setValidTitle(false);
      }

      //TODO: save in DB
      if (activeEvent) {
        dispatch(calendarEventUpdate(formValues))
      } else {
        dispatch(calendarAddNewEvent({
          ...formValues,
          id: new Date().getTime(),
          user: {
            _id: "123",
            name: "Sergio"
          }
        }));
      }; 

      setValidTitle(true);
      closeModal();
  };


  return (
    <Modal
      isOpen={openModal}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-background"
    >
      <h1> {activeEvent ? 'Edit event' : 'New event'} </h1>
      <hr />
      <form className="container"
            onSubmit= { handleSubmit }>

        <div className="form-group">
          <label>Start Date and Time</label>
          <DateTimePicker
            onChange={ handleStartDateChange }
            value={ startDate }
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>End Date and Time</label>
          <DateTimePicker
            onChange={ handleEndDateChange }
            value={ endDate }
            minDate={ startDate }
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Title and Notes</label>
          <input
            type="text"
            className={`form-control ${!validTitle && 'is-invalid'}`}
            placeholder="Event Title"
            name="title"
            autoComplete="off"
            value= { title }
            onChange={ handleInputChange }
          />
          <small id="emailHelp" className="form-text text-muted">A brief description</small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notes"
            rows="5"
            name="notes"
            value= { notes }
            onChange={ handleInputChange }
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Additional information</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Save </span>
        </button>

      </form>
    </Modal>
  )
}
