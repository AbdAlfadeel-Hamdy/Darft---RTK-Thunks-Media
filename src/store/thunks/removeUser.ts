import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../slices/usersSlice";
import { pause } from "./fetchUsers";

export const removeUser = createAsyncThunk(
  "users/remove",
  async (user: User) => {
    await axios.delete(`/users/${user.id}`, {
      baseURL: "http://localhost:3005",
    });

    await pause(1000);

    return user;
  }
);
