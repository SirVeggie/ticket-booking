import React, { CSSProperties, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Label } from 'semantic-ui-react';
import Align from '../../components/Align';
import Toggle from '../../components/Toggle';
import { setLoginStatus } from '../../reducers/adminReducer';
import server from '../../tools/server';
import { lines } from '../../tools/shapes';

function AdminLogin() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const submit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const password = event.target.pass.value;
    event.target.pass.value = '';
    let token: any;
    
    try {
      token = await server.login(password);
    } catch (error) {
      console.log('Login error: ' + error.response.data);
      setError(error.response.data);
      setLoading(false);
      return;
    }

    window.localStorage.setItem('token', token);
    dispatch(setLoginStatus(true));
    return;
  };

  return (
    <div style={baseStyle}>
      <Align bottom={2}>
        <div style={boxStyle} className={'ui segment raised' + (loading ? ' loading' : '')}>
          <div style={{ padding: 10, margin: 10, fontSize: 20 }}>
            Admin
          </div>
          <Form onSubmit={submit}>
            <Form.Input type='password' name='pass' fluid error={!!error} onChange={() => setError('')} />
          </Form>
          <Toggle enabled={!!error}>
            <div style={{ position: 'absolute', width: '100%', left: 0, bottom: -50 }}>
              <Label basic color='red' pointing='above'>{error}</Label>
            </div>
          </Toggle>
        </div>
      </Align>
    </div>
  );
}

// const lines = 'repeating-linear-gradient(-45deg, #f9f9f9 0%, #ffffff 1%, #ffffff 3%, #f9f9f9 4%, #f9f9f9 6%)';
const boxStyle: CSSProperties = {
  textAlign: 'center',
  width: 250,
  paddingTop: 0,
  background: lines(45, '#f9f9f9', '#ffffff'),
  position: 'relative'
};

const baseStyle: CSSProperties = {
  width: '100vw',
  height: '100vh',
  background: 'radial-gradient(circle, #333343, #131323)'
};

export default AdminLogin;