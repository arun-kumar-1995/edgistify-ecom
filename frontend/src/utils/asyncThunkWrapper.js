import { API } from "../axios/apiWrapper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const AsyncThunkWrapper = (thunkName, configs) => {
  return createAsyncThunk(thunkName, async (payload, { rejectWithValue }) => {
    const {
      endpoint,
      method = "GET",
      headers = {},
      withCredentials = false,
    } = configs;

    const requestConfigs =
      method === "GET" || method === "DELETE"
        ? { params: payload }
        : { data: payload };

    try {
      const response = await API.request({
        url: endpoint,
        method,
        headers,
        withCredentials,
        ...requestConfigs,
      });

      if (response.data?.success === true) {
        return response.data; 
      }

      // Handle unsuccessful responses
      return rejectWithValue(response.data?.message || "Unexpected error");
    } catch (err) {
      // Handle errors (network or server-related)
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  });
};
