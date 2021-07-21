import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setLoginStatus } from '../reducers/adminReducer';
import auth from '../tools/auth';

export default function CheckLogin() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  
  useEffect(() => {
    auth.check().then(x => {
      if (!x) {
        dispatch(setLoginStatus(false));
        window.localStorage.removeItem('token');
      }
    });
  }, [pathname]);
  
  return null;
}
