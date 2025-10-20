import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import useForm from '../hooks/useForm';
import { api } from '../services/api';

const BookingForm = forwardRef(({ booking, onSaved }, ref) => {
  const { values, setValues, onChange, reset } = useForm({
    customer_name: '',
    room_number: '',
    check_in: '',
    check_out: '',
    status: 'Pending'
  });

  useEffect(()=> {
    if (booking) setValues(booking);
  }, [booking, setValues]);

  // expose reset to parent via ref (useImperativeHandle)
  useImperativeHandle(ref, () => ({
    reset: () => reset()
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.id) {
      await api.updateBooking(values);
    } else {
      await api.createBooking(values);
    }
    reset();
    if (onSaved) onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 rounded" style={{ backgroundColor: 'var(--card)' }}>
      <h5 className="mb-3 text-center" style={{ color: 'var(--primary)' }}>{values.id ? 'Edit Booking' : 'New Booking'}</h5>
      <input name="customer_name" placeholder="Guest name" className="form-control mb-2" value={values.customer_name} onChange={onChange} required />
      <input name="room_number" placeholder="Room number" className="form-control mb-2" value={values.room_number} onChange={onChange} required />
      <div className="row">
        <div className="col">
          <input type="date" name="check_in" className="form-control mb-2" value={values.check_in} onChange={onChange} required />
        </div>
        <div className="col">
          <input type="date" name="check_out" className="form-control mb-2" value={values.check_out} onChange={onChange} required />
        </div>
      </div>
      <select name="status" className="form-select mb-3" value={values.status} onChange={onChange}>
        <option>Pending</option>
        <option>Confirmed</option>
        <option>Cancelled</option>
      </select>
      <button type="submit" className="btn w-100" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>{values.id ? 'Update' : 'Create'}</button>
    </form>
  );
});

export default BookingForm;

