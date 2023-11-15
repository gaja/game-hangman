import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../store';

import './index.module.css';

export function Layout() {
  return (
    <div className="container">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
}

function Header() {
  const uname = useSelector((state: RootState) => state.username.userName);
  return <div className="header">Hello {uname}</div>;
}

function Footer() {
  return <div className="footer">Footer</div>;
}

export default Layout;
