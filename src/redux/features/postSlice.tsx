import { createSlice, nanoid } from "@reduxjs/toolkit";
import {sub} from "date-fns"

const initialState = [
  {
    id: "1",
    title: "Learning Redux Toolkit",
    content: "I've heard good things.",
    date: sub(new Date(), {minutes:1}).toISOString()
  },
  {
    id: "2",
    title: "Slices...",
    content: "The more I say slice, the more I want pizza.",
    date: sub(new Date(), {minutes:5}).toISOString()

  }
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postsAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString()
          }
        };
      }
    }
  }
});


export const allPosts = (state: any) => state.posts;
export const { postsAdded, prepare } = postSlice.actions;
export default postSlice.reducer;
