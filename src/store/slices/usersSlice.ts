import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { createUser } from "../thunks/createUser";
import { removeUser } from "../thunks/removeUser";

export interface User {
  id: number;
  name: string;
}

interface usersState {
  isLoading: boolean;
  data: User[];
  error: { [keys: string]: any } | null;
}

const initialState: usersState = {
  isLoading: false,
  data: [],
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // builder.addCase(fetchUsers.pending, (state) => {
    //   state.isLoading = true;
    // });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.data = action.payload;
    });
    // builder.addCase(fetchUsers.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error;
    // });
    // builder.addCase(createUser.pending, (state) => {
    //   state.isLoading = true;
    // });
    builder.addCase(createUser.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.data.push(action.payload);
    });
    // builder.addCase(createUser.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error;
    // });
    // builder.addCase(removeUser.pending, (state, action) => {
    //   state.isLoading = true;
    // });
    builder.addCase(removeUser.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.data = state.data.filter((user) => user.id !== action.payload.id);
    });
    // builder.addCase(removeUser.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error
    // });
  },
});

export const usersReducer = usersSlice.reducer;
