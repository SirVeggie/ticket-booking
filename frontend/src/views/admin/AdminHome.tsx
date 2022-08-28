import { useSelector } from 'react-redux';
import CheckLogin from '../../components/CheckLogin';
import Toggle from '../../components/Toggle';
import { StateType } from '../../store';
import AdminLogin from './AdminLogin';
import AdminPanel from './AdminPanel';

function AdminHome() {
  const { status } = useSelector((state: StateType) => state.admin);

  return (
    <div>
      <CheckLogin />
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