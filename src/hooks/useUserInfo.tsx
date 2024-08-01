import { useContext } from 'react';
import { RootStoreContext } from '../context';

export const useUserInfo = () => {
    const rootStore = useContext(RootStoreContext);
    return rootStore.userInfoStore.userInfo;
}