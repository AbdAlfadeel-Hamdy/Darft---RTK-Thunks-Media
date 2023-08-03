import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("/users", {
    baseURL: BASE_URL,
  });
  await pause(1000);
  return response.data;
});

export const pause = (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });
