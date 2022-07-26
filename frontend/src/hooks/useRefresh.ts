import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoginStatus } from '../reducers/adminReducer';
import { setData } from '../reducers/dataReducer';
import auth from '../tools/auth';
import database from '../tools/database';
import { RePromise } from '../tools/RePromise';
import { useNotification } from './useNotification';

export function useRefresh() {
    const notify = useNotification();
    const dispatch = useDispatch();
    const [lastDataRefresh, setLastDataRefresh] = useState(0);
    const [dataPromise, setDataPromise] = useState<RePromise<any> | undefined>(undefined);
    const [authPromise, setAuthPromise] = useState<RePromise<any> | undefined>(undefined);

    const refreshData = () => {
        const p = RePromise(database.getPacket());
        p.then(x => {
            setDataPromise(undefined);
            dispatch(setData(x));
        }).catch(error => {
            setDataPromise(undefined);
            if (error.canceled)
                return;
            console.log(error);
            notify.create('error', 'Failed to refresh data');
        });
        setDataPromise(p);
        setLastDataRefresh(Date.now());
    };

    const refreshAuth = () => {
        if (!localStorage.getItem('token'))
            return;
        const p = RePromise(auth.check());
        p.then(x => {
            setAuthPromise(undefined);
            if (!x)
                localStorage.removeItem('token');
            dispatch(setLoginStatus(x));
        }).catch(error => {
            if (error.canceled)
                return;
            console.log(error);
        });
        setAuthPromise(p);
    };

    const cancelRefresh = () => {
        dataPromise?.reject({ canceled: true });
        authPromise?.reject({ canceled: true });
    };

    return {
        refreshData,
        refreshAuth,
        cancelRefresh,
        lastDataRefresh
    };
}
