import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserProfile } from "@/services/api";
const initialState = {
  user: null, // Stores user information
  isLoggedIn: false, // Tracks if the user is logged in
};

// export const fetchUserProfileThunk = createAsyncThunk(
//   "user/fetchUserProfile",
//   async (uid, { rejectWithValue }) => {
//     try {
//       const response = await fetchUserProfile(uid);
//       if (response.status === 200) {
//         return response.data.user;
//       }
//     } catch (error) {
//       console.error("Error fetching user profile:", error);
      
//       return rejectWithValue(error.message);
//     }
//   }
// );

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      console.log("user: (userSlice) ", state.user);
    },
    clearUser(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchUserProfileThunk.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(fetchUserProfileThunk.fulfilled, (state, action) => {
  //       state.user = action.payload;
  //       state.isLoggedIn = true;
  //       state.loading = false;
  //     })
  //     .addCase(fetchUserProfileThunk.rejected, (state) => {
  //       state.loading = false;
  //     });
  // },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
