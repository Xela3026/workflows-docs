import { configureStore } from '@reduxjs/toolkit'
import collectionReducer from './collectionSlice.js'
import snippetReducer from './snippetSlice.js'

export default configureStore({
  reducer: {
    collection: collectionReducer,
    snippet: snippetReducer,
  },
})