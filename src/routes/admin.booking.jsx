import { useLoaderData } from "react-router-dom";

export function getLoader(bookingService) {
  return async function loader(request) {
    return bookingService.getAllBookings();
  }
}

export function AdminBooking() {
  const bookings = useLoaderData();

  function BookingsTable(props) {
    return (<table className="table table-striped">
      <thead>
        <tr>
          <th>Bokningsnummer</th>
          <th>Stuga</th>
          <th>Namn</th>
          <th>Telefon</th>
          <th>E-post</th>
        </tr>
      </thead>
      <tbody>
        {props.bookings.map(booking => (
          <tr key={booking.id}>
            <td>{booking.id}</td>
            <td>{booking.cottage_name}</td>
            <td>{booking.name}</td>
            <td>{booking.phone}</td>
            <td>{booking.email}</td>
          </tr>
        ))}

      </tbody>
    </table>)
  }

  return (<>
    <h1 className='mb-3'>Alla bokningar</h1>
    <p>{bookings.length === 0 ? 'Det finns inga bokningar' : <BookingsTable bookings={bookings} />}</p>

  </>)
}

export function getRoute(bookingService) {
  return {
    element: <AdminBooking />,
    loader: getLoader(bookingService),
  }
}