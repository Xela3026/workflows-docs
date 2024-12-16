import React from 'react';
import { Provider } from 'react-redux';
// import store from './store.js';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
let Collection, store;
if (ExecutionEnvironment.canUseDOM) {
  // only import client-side code in the browser environment
  Collection = require('./Collection.js').default;
  store = require('./store.js').default;
}


import BrowserOnly from '@docusaurus/BrowserOnly';

const CollectionWrapper = ({ record, collection }) => {
    return (
        <BrowserOnly>
        {() => {
                return (
                    
                    <Provider store={store}>
                        <Collection record={record} collection={collection} />
                    </Provider>
                );
        }}
        </BrowserOnly>
    );
};

export default CollectionWrapper;
