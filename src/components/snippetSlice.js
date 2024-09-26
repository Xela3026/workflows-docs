import { createSlice } from '@reduxjs/toolkit'

export const snippetSlice = createSlice({
  name: 'snippet',
  initialState: {
    preference: localStorage.getItem('code-preference') || 0,
  },
  reducers: {
    setPreference(state, action) {
      state.preference = action.payload;
      localStorage.setItem('code-preference',action.payload);
    }
  },
})

export const { setPreference } = snippetSlice.actions;

export default snippetSlice.reducer;