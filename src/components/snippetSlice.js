import { createSlice } from '@reduxjs/toolkit';


export const snippetSlice = createSlice({
  
  name: 'snippet',
  initialState: {

    preference: localStorage.getItem('code-preference') || 0,
    snippets: {},
  },
  reducers: {
    setPreference(state, action) {
      state.preference = action.payload;

      localStorage.setItem('code-preference',action.payload);

    },
    setSnippets(state,action) {
      state.snippets[`${action.payload.record}_${action.payload.collection}_${action.payload.uid}`] = action.payload.data;
    }
  },
})

export const { setPreference, setSnippets } = snippetSlice.actions;

export default snippetSlice.reducer;