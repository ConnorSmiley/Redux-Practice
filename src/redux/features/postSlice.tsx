import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const res = await axios.get(POST_URL);
    return [...res.data];
  } catch
    (err: any) {
    return err.message;
  }
});

export const addNewPost = createAsyncThunk("posts/addNewPost", async (initialPost) => {
  const response = await axios.post(POST_URL, initialPost);
  return response.data;
});

const initialState = {
  posts: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postsAdded: {
      reducer(state:any, action:any) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0
            }
          }
        };
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find(post => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    }
  },

  extraReducers(builder:any) {
    builder
      .addCase(fetchPosts.pending, (state:any) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state:any, action:any) => {
        state.status = "succeeded";
        let min = 1;
        const loadedPosts = action.payload.slice(0,5).map(post => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0
          };
          return post;
        });
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state:any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state:any, action:any) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          hooray: 0,
          heart: 0,
          rocket: 0,
          eyes: 0
        };
        console.log(action.payload);
        state.posts.push(action.payload);
      });
  }
});


export const selectAllPosts = (state: any) => state.posts.posts;
export const getPostsStatus = (state: any) => state.posts.status;
export const getPostsError = (state: any) => state.posts.error;
export const allPosts = (state: any) => state.posts.posts;
export const { postsAdded, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
