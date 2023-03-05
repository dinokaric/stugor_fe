export default function getBookingService(URL) {

  async function getAllBookings() {
    return fetch(`${URL}/api/admin/booking/all`);
  }
  async function getAvailableCottages() {
    return fetch(`${URL}/api/cottage/available`);
  }

  async function getCottageDetails(id) {
    return fetch(`${URL}/api/cottage/${id}`);
  }

  async function bookCottage(details) {
    let { id, ...rest } = details;
    return fetch(`${URL}/api/cottage/book/${id}`, {
      method: 'POST',
      body: JSON.stringify(rest),
      headers: {
        "Content-Type": "application/json",
      }
    })
  }

  return {
    getAvailableCottages,
    getCottageDetails,
    bookCottage,
    getAllBookings
  }
}