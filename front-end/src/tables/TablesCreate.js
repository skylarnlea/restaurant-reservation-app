import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createTable } from "../utils/api";


function TableCreate() {
    const history = useHistory();
    const [error, setError] = useState(null);
    const [table, setTable] = useState({
        table_name: "",
        capacity: 1,
    });

    const handleChange = ({ target }) => {
        setTable({ ...table, [target.name]: target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createTable(table)
            .then((newTable) => history.push("/dashboard"))
            .catch((error) => setError(error));
    }


    return (
        <main>
            <h1>Create a New Table</h1>
            <ErrorAlert error={error} setError={setError} />

            {/* Table Form */}
            <form onSubmit={handleSubmit}>
                <div className="col mb-3">
                    <div className="row mb-3">
                        <label htmlFor="table_name" className="form-label">Table Name</label>
                        <input
                            type="text"
                            name="table_name"
                            id="table_name"
                            className="form-control"
                            onChange={handleChange}
                            value={table.table_name}
                            minlength="2"
                            required
                        />
                    </div>
          
                    <div className="row mb-3">
                        <label htmlFor="capacity" className="form-label">Capacity</label>
                        <input
                            type="number"
                            name="capacity"
                            id="capacity"
                            className="form-control"
                            onChange={handleChange}
                            value={table.capacity}
                            min="1"
                            max="8"
                            required
                        />
                    </div>
                </div>
        
                <button 
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{marginRight: "10px"}}
                >
                    Submit
                </button>
                <button
                    type="button"
                    className="btn btn-secondary btn-lg"
                    onClick={() => history.go(-1)}
                >
                    Cancel
                </button>
            </form>
        </main>
    );
}

export default TableCreate;