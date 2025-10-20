import React, { useState, useMemo } from "react";
import BookingForm from "../components/BookingForm";
import BookingList from "../components/BookingList";
import { useBookings } from "../hooks/useBookings";
import useSearchFilter from "../hooks/useSearchFilter";
import usePagination from "../hooks/usePagination";
import "../styles/App.css";

export default function ManageBookings() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const { bookings, reload } = useBookings(search);
  const filtered = useSearchFilter(bookings, search);
  const { page, limit, setLimit, next, prev } = usePagination(1, 5);

  const paged = useMemo(() => {
    const start = (page - 1) * limit;
    return filtered.slice(start, start + limit);
  }, [filtered, page, limit]);

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm border-0" style={{ backgroundColor: "#ffe6f2" }}>
            <h5 className="text-center text-danger">{selected ? "Edit Booking" : "New Booking"}</h5>
            <BookingForm
              booking={selected}
              onSaved={() => { setSelected(null); reload(); }}
            />
          </div>
        </div>

        <div className="col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input
              type="text"
              className="form-control w-75"
              placeholder="Search by guest or room..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="d-flex align-items-center ms-2 gap-2">
              <select className="form-select form-select-sm w-auto" value={limit} onChange={(e)=> setLimit(Number(e.target.value))}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <button className="btn btn-outline-secondary btn-sm" onClick={()=> setSearch("")}>Clear</button>
            </div>
          </div>

          <BookingList
            bookings={paged}
            onEdit={(b)=> setSelected(b)}
            reload={reload}
          />

          <div className="d-flex justify-content-between align-items-center mt-2">
            <button className="btn btn-sm btn-outline-secondary" onClick={prev} disabled={page === 1}>Prev</button>
            <span className="text-muted small">Page {page} of {Math.max(1, Math.ceil(filtered.length / limit))}</span>
            <button className="btn btn-sm btn-outline-secondary" onClick={next} disabled={page >= Math.ceil(filtered.length / limit)}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
