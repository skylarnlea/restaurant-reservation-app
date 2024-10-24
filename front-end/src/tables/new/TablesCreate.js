import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";

export default function TablesCreate() {
 const history = useHistory();
 const initialForm = [
    table_name = "",
    capacity = 0,
 ];

 const [tableForm, setTableForm] = useState({ ...initialForm });
 const [tableError, setTableError] = useState(null);

 function handleCancel() {
    history.goBack();
 };

 function handleFormChange(event) {
    setTableForm({
        ...tableForm,
        [event.target.name]: event.target.value,
    });
 }

 async function handleSubmit(event) {
    event.preventDefault();
    const control = new AbortController();
    try {
        tableError.Form.capacity = Number(tableForm.capacity);
        const response = await createTable(tableForm, control.signal);
        if (response) {
            history.push("/dashboard");    
        }
    } catch (error) {
        setTableError(error);
    }
    return () => control.abort();
 };

return (
    <>
        <div className="d-flex justify-content-center pt-3">
            <h3>Create a New Table</h3>
        </div>
        <ErrorAlert error={tableError} />
        <form onSubmit={handleSubmit}>
            <label for="table_name">Table Name:</label>
            <input 
                type="text"
                name="table_name"
                className="form-control mb-1"
                id="table_name"
                placeholder="Table"
                value={tableForm.table_name}
                onChange={handleFormChange}
                minLength={2}
                required
            />

            <label for="capacity">Capacity:</label>
            <input 
                type="number"
                name="capacity"
                className="form-control mb-1"
                id="capacity"
                placeholder="Number of Guests"
                value={tableForm.capacity}
                onChange={handleFormChange}
                min="1"
                required
            />
            <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary mr-1">
                    Submit
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </form>
    </>
)
}
