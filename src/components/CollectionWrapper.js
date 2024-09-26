import React from 'react';
import { Provider } from 'react-redux';
import store from './store.js';
import Collection from './Collection.js';

const CollectionWrapper = ({ record, collection }) => {
    return (
        <Provider store={store}>
            <Collection record={record} collection={collection} />
        </Provider>
    );
};

export default CollectionWrapper;
