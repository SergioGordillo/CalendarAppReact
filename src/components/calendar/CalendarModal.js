import React, { useState } from 'react'
import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';

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

export const CalendarModal = () => {

  const [startDate, setStartDate] = useState(now.toDate());
  const [endDate, setEndDate] = useState(later.toDate());

  const closeModal = () => {
    console.log("closing...");
  }

  const handleStartDateChange = (e) => {
    console.log(e);
    setStartDate(e);
  }

  const handleEndDateChange = (e) => {
    console.log(e);
    setEndDate(e);
  }


  return (
    <Modal
      isOpen={true}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-background"
    >
      <h1> New event </h1>
      <hr />
      <form className="container">

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
            className="form-control"
            placeholder="Event Title"
            name="title"
            autoComplete="off"
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
