import React from "react";
import "./TableCard.css";


function TableCard({
    table_id,
    table_name,
    capacity,
    reservation_id
  }) {

  return (
    <div className="card">
      <div className="card-body">
        <span className="badge bg-info rounded-pill">{capacity}</span>
        <h6 className="card-title">Table: {table_name}</h6>
        <p className="card-subtitle mb-2 text-muted">Reservation #{reservation_id}</p>
        <div 
          class={`alert ${reservation_id ? "alert-warning" : "alert-sucess"} d-flex align-items-center`} 
          role="alert" 
          data-table-id-status={table_id}
        >
        <div>
          {reservation_id ? "Occupied" : "Free"}
        </div>
        </div>
      </div>
    </div>
  );
}

export default TableCard;