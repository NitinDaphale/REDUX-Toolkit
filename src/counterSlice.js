import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
    isLoading: false,
    posts: []
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    setLoadingStatus: (state, action) => {
      state.isLoading = action.payload;
      state.errorMessage = "";
    },
    getPosts: (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    },
    setError: (state, action) => {
      console.log(action.payload);
      state.isLoading = action.payload.isLoading;
      state.errorMessage = action.payload.errorMessage;
    }
  }
});

export const {
  increment,
  decrement,
  setLoadingStatus,
  getPosts,
  setError
} = counterSlice.actions;

export default counterSlice.reducer;
