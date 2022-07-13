import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/features/counterSlice"
import postsReducer from "../redux/features/postSlice"
import usersReducer from "../redux/features/Users/userSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    users: usersReducer
  }
})
