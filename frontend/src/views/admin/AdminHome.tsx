import React from 'react';
import { useSelector } from 'react-redux';
import Toggle from '../../components/Toggle';
import { StateType } from '../../store';
import AdminLogin from './AdminLogin';
import AdminPanel from './AdminPanel';

function AdminHome() {
  const status = useSelector((state: StateType) => state.admin);

  return (
    <div>
      <Toggle enabled={status}>
        <div>
          <AdminPanel />
        </div>
      </Toggle>
      <Toggle enabled={!status}>
        <AdminLogin />
      </Toggle>
    </div>
  );
}

export default AdminHome;