// backend controller endpoints (adjust if your local virtual host is different)
const BASE = "http://localhost/hotel-booking-system/backend/app/controllers/BookingController.php";
const AUTH_BASE = "http://localhost/hotel-booking-system/backend/app/controllers/AuthController.php";

async function request(url, opts = {}) {
  const res = await fetch(url, {
    ...opts,
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
  });
  return res.json();
}

export const api = {
  fetchBookings: (search = "") =>
    request(`${BASE}?search=${encodeURIComponent(search)}`), // <-- backticks
  createBooking: (data) =>
    request(BASE, { method: "POST", body: JSON.stringify(data) }),
  updateBooking: (data) =>
    request(BASE, { method: "PUT", body: JSON.stringify(data) }),
  deleteBooking: (id) =>
    request(BASE, { method: "DELETE", body: JSON.stringify({ id }) }),
  authLogin: (credentials) =>
    request(`${AUTH_BASE}?action=login`, { method: "POST", body: JSON.stringify(credentials) }),
  authRegister: (data) =>
    request(`${AUTH_BASE}?action=register`, { method: "POST", body: JSON.stringify(data) }),
};