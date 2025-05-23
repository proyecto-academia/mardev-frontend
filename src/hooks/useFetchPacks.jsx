import {useEffect, useState} from 'react';
import {usePackStore} from '../stores/usePackStore';


export function useFetchPacks() {
    const {fetchPacks} = usePackStore();
    const [packs, setPacks] = useState([]);

    useEffect(() => {
        fetchPacks().then(() => {
            setPacks(usePackStore.getState().packs);
        });
    }
    , [fetchPacks]);
    return packs;
}