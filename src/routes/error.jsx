import { useRouteError } from 'react-router-dom';

export default function Error() {
  const error = useRouteError();

  return (
    <>
      <h1>Fel!</h1>
      <p>Ett fel uppstod...</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </>
  )
}