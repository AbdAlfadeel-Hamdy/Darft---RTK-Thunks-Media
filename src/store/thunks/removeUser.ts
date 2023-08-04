import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../slices/usersSlice";
import { pause } from "./fetchUsers";
import { BASE_URL } from "../../utils/constants";

export const removeUser = createAsyncThunk(
  "users/remove",
  async (user: User) => {
    await axios.delete(`/users/${user.id}`, {
      baseURL: BASE_URL,
    });

    await pause(1000);

    return user;
  }
);
