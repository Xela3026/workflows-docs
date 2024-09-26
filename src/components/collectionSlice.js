import { createSlice } from '@reduxjs/toolkit'

export const collectionSlice = createSlice({
  name: 'collection',
  initialState: {
    env: {},
    docs: {}
  },
  reducers: {
    setEnv(state, action) {
      state.env = action.payload;
    },
    setDocs(state, action) {
      state.docs[`${action.payload.record}_${action.payload.collection}`] = action.payload.data;
    }
  },
})

export const { setEnv, setDocs } = collectionSlice.actions;

export default collectionSlice.reducer;