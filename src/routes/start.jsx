import { useLoaderData, Link } from 'react-router-dom';

export function getLoader(bookingService) {
  return async function loader(req) {
    return await bookingService.getAvailableCottages();
  }
}

function CottageCard(props) {
  return (
    <div className='col-12 col-sm-6 col-lg-4'>
      <div className="card">
        <img className="card-img-top" src={props.image} alt="Bild på stugan" />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.description}</p>
          <Link to={`/booking/${props.id}`} className="btn btn-success">Boka för {props.price} Kr / natt</Link>
        </div>
      </div>
    </div>
  )
}

export function Start() {
  const cottages = useLoaderData();

  return (
    <>
      <h1 className='mb-3'>Våra stugor</h1>
      <p>Här är alla stugor vi har att erbjuda</p>
      <div className='row g-3 mb-3'>
        {cottages.map(cottage => <CottageCard key={cottage.id} {...cottage} />)}
      </div>
    </>
  )
}

export function getRoute(bookingService) {
  return {
    element: <Start />,
    loader: getLoader(bookingService)
  }
}