import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';

export default function NavLayout() {
	return (
    <>
      <div className="container">
        <Outlet />
      </div>
      <BottomNavigation/>
    </>
	);
}
