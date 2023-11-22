import { useContext } from 'react';
import { RootStoreContext } from '../context';

export const useRootStore = () => {
    const rootStore = useContext(RootStoreContext);
    return rootStore;
}

export const useUserInfoStore = () => {
    const rootStore = useContext(RootStoreContext);
    return rootStore.userInfoStore;
}

export const useLanguageStore = () => {
    const rootStore = useContext(RootStoreContext);
    return rootStore.languageStore;
}