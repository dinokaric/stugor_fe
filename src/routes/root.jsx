import { Outlet, NavLink } from 'react-router-dom';

export default function Root() {
  const getClassName = (isActive) => {
    return isActive ? 'nav-item nav-link active' : 'nav-item nav-link';
  }

  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-light mb-3">
        <div className='container'>
          <div className="navbar-nav">
            <NavLink to={'/'} className={getClassName}>Start</NavLink>
            <NavLink to={'/admin'} className={getClassName}>Admin</NavLink>
          </div>
        </div>
      </nav>

      <main className='container'>
        <Outlet />
      </main>
    </>
  );
}