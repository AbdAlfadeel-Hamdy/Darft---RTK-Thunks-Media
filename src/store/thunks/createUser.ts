import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { faker } from "@faker-js/faker";
import { pause } from "./fetchUsers";

export const createUser = createAsyncThunk("users/create", async () => {
  const response = await axios.post(
    "/users",
    {
      name: faker.person.firstName(),
    },
    {
      baseURL: BASE_URL,
    }
  );

  await pause(1000);
  return response.data;
});
