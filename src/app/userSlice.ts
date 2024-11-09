import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  Points: number | null;
}

// Only access localStorage if window is defined (client-side check)
const storedUser =
  typeof window !== "undefined" ? localStorage.getItem("user") : null;
const initialState: UserState = storedUser
  ? JSON.parse(storedUser)
  : {
      email: null,
      firstName: null,
      lastName: null,
      username: null,
      Points: null,
    };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.username = action.payload.username;
      state.Points = action.payload.Points;

      if (typeof window !== "undefined") {
        console.log("reached set");
        localStorage.setItem("user", JSON.stringify(state));
      }
    },
    clearUser: (state) => {
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.username = null;
      state.Points = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
