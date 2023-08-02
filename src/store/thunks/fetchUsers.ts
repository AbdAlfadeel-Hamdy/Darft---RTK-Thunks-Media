import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("/users", {
    baseURL: BASE_URL,
  });
  return response.data;
});

export { fetchUsers };
