import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../store';

import classes from './index.module.css';

export function Layout() {
  return (
    <div className={classes.container}>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <div className={classes.main}>
          <Outlet />
        </div>
      </Suspense>
      <Footer />
    </div>
  );
}

function Header() {
  const uname = useSelector((state: RootState) => state.username.userName);
  return <div className={classes.header}>Hello {uname}</div>;
}

function Footer() {
  return <div className={classes.footer}>
    <p>

      ©GajaVitanovic - 00385 98 662 585
    </p>
  </div>;
}

export default Layout;
