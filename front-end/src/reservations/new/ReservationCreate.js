import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import { notOnTuesday } from "../utils/date-time";
import { inTheFuture } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";

export default function ReservationCreate() {
    const history = useHistory();
    const initialFormData = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
    };
    
    const [formData, setFormData] = useState({ ...initialFormData });

    const handleCancel = () => {
      history.goBack();
    };

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    const findErrors = (date, errors) => {
        notOnTuesday(date, errors);
        inTheFuture(date, errors);
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const controller = new AbortController();
        const errors = [];
        findErrors(formData.reservation_date, errors);
        if (errors.length) {
          setReservationsError({ message: errors });
          return;
        }
        try {
          formData.people = Number(formData.people);
          await createReservation(formData, controller.signal);
          const date = formData.reservation_date;
          history.push(`/dashboard?date=${date}`);
        } catch (error) {
          setReservationsError(error);
        }
        return () => controller.abort();
    };

    return (
      <>
        <ErrorAlert error={reservationsError} />
        <form onSubmit={handleSubmit} className="form-group">
        <fieldset>
          <legend className="d-flex justify-content-center">
            Reservation Information
          </legend>
          <div className="pb-1">
            <input
              type="text"
              name="first_name"
              className="form-control"
              id="first_name"
              placeholder={initialFormData?.first_name || "First Name"}
              value={initialFormData?.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="pb-1">
            <input
              type="text"
              name="last_name"
              className="form-control"
              id="last_name"
              placeholder={initialFormData?.last_name || "Last Name"}
              value={initialFormData?.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="pb-1">
            <input
              type="tel"
              name="mobile_number"
              className="form-control"
              id="mobile_number"
              placeholder={initialFormData?.mobile_number || "Mobile Number"}
              value={initialFormData?.mobile_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="pb-1">
            <input
              type="number"
              name="people"
              className="form-control"
              id="people"
              placeholder={initialFormData?.people || "Number of guests"}
              value={initialFormData?.people}
              onChange={handleChange}
              required
              min="1"
            />
          </div>

          <input
            type="date"
            name="reservation_date"
            className="form-control mb-1"
            id="reservation_date"
            placeholder={initialFormData?.reservation_date || "YYY-MM-DD"}
            value={initialFormData?.reservation_date}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="reservation_time"
            className="form-control"
            id="reservation_time"
            placeholder={initialFormData?.reservation_time || "HH:MM"}
            value={initialFormData?.reservation_time}
            onChange={handleChange}
            required
          />
        </fieldset>
        <div className="d-flex justify-content-center pt-2">
          <button type="submit" className="btn btn-primary mr-1">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
      </>
    )
}