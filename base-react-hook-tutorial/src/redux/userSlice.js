import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../services/userService";
import { toast } from "react-toastify";
import { fetchUserToken } from "../services/userService";

const initialState = {
  isAuthenticate: false,
  isLoading: true,
  user: {},
};
const userFetchToken = createAsyncThunk("/get-user-token", async () => {
  try {
    const res = await fetchUserToken();
    console.log("check response", res);

    if (res && res.EC === 0) {
      return res.DT;
    } else {
      toast.error(res.EM);
    }
  } catch (error) {
    toast.error(error);
  }
});
export const counterSlice = createSlice({
  name: "userInit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userFetchToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticate = true;
        state.isLoading = false;
      })
      .addCase(userFetchToken.rejected, (state, action) => {
        state.isLoading = false;
        state.user = {};
        state.isAuthenticate = false;
      })
      .addCase(userFetchToken.pending, (state, action) => {
        state.isLoading = true;
        state.isAuthenticate = false;
        state.user = {};
      });
  },
});

export { userFetchToken };

export default counterSlice.reducer;
