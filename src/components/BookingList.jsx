import React, { useRef } from 'react';
import { api } from '../services/api';
import useConfirm from '../hooks/useConfirm';

export default function BookingList({ bookings, onEdit, reload }) {
  const { confirm } = useConfirm();
  const ref = useRef();

  const handleDelete = (id) => {
    confirm('Delete booking?', async () => {
      try {
        await api.deleteBooking(id);
        reload();
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    });
  };

  return (
    <div className="card" style={{ backgroundColor: 'var(--card)' }}>
      <div className="card-body">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Guest</th>
              <th>Room</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.customer_name}</td>
                <td>{b.room_number}</td>
                <td>{b.check_in}</td>
                <td>{b.check_out}</td>
                <td>{b.status}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => onEdit(b)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(b.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}