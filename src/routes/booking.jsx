import { useLoaderData, useFetcher } from "react-router-dom";

export function getAction(bookingService) {
  return async function action({ request, params }) {
    let formData = await request.formData();
    return await bookingService.bookCottage(Object.fromEntries(formData));
  }
}

export function getLoader(bookingService) {
  return async function loader(request) {
    return bookingService.getCottageDetails(request.params.id);
  }
}

export function Booking() {
  const cottage = useLoaderData();
  const fetcher = useFetcher();

  function FetcherForm() {
    return (<fetcher.Form method="post" >
      <h3 className="mb-4">Fyll i uppgifter för bokning</h3>
      <input type="hidden" name="id" value={cottage.id}></input>
      <div className="mb-2">
        <label htmlFor="bookingName" className="form-label">Namn</label>
        <input type="text" required className="form-control" name="name" id="bookingName"></input>
      </div>
      <div className="mb-2">
        <label htmlFor="bookingEmail" className="form-label">E-post</label>
        <input type="email" required className="form-control" name="email" id="bookingEmail"></input>
      </div>
      <div className="mb-2">
        <label htmlFor="bookingPhone" className="form-label">Telefon</label>
        <input type="tel" required className="form-control" name="phone" id="bookingPhone"></input>
      </div>
      <div className="mb-2">
        <button type="submit" className="btn btn-primary mt-3">Slutför bokning</button>

      </div>
    </fetcher.Form>);
  }

  function BookingConfirmation(props) {
    return (
      <>
        <h3 className="mb-4">Tack för din bokning!</h3>
        <p>Ditt bokningsnummer är {props.id}</p>
      </>
    );
  }

  return (
    <>
      <h1 className='mb-3'>{cottage.name}</h1>
      <div className="row">
        <div className="col-12 col-lg-6">
          <img src={cottage.image} className="img-fluid" alt="Bild på stugan" />
          <p className="mt-2">{cottage.description}<br />
            Pris: {cottage.price}
          </p>

        </div>
        <div className="col-12 col-lg-6">
          <div className="card p-3 bg-light">
            {fetcher.data ? <BookingConfirmation id={fetcher.data.id} /> : <FetcherForm />}

          </div>
        </div>
      </div>
    </>
  )
}

export function getRoute(bookingService) {
  return {
    element: <Booking />,
    action: getAction(bookingService),
    loader: getLoader(bookingService),
    shouldRevalidate: () => false
  }
}