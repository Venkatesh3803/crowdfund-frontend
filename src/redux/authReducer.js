import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';


const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : "",
  sucess: false,
  error: false,
  isLoading: false,
}



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    RegisterStarts: (state) => {
      state.isLoading = true;
    },
    RegisterSucessFull: (state, action) => {
      state.sucess = true;
      state.isLoading = false;
      state.error = false
      if (action.payload) {
        toast.success("Registerd SuccessFully")
      }
    },
    RegisterFail: (state) => {
      state.error = true;
      state.user = ""
    },

    loginStarts: (state) => {
      state.isLoading = true;
    },
    loginSucessFull: (state, action) => {
      state.user = action.payload;
      state.sucess = true;
      state.isLoading = false;
      state.error = false;
      if (action.payload) {
        toast.success(
          "Login Success",
          { position: "bottom-center" })
      }

      localStorage.setItem("token", JSON.stringify(action.payload.token))
      localStorage.setItem("user", JSON.stringify(action.payload))

    },
    loginFail: (state) => {
      state.error = true;
      state.sucess = false;
      state.isLoading = false;
      state.user = ""
    },
    logOut: (state) => {
      state.user = "";
      state.error = false;
      state.isLoading = false
      localStorage.clear()

    }
  }
})


export const { RegisterStarts, RegisterSucessFull, RegisterFail, loginStarts, loginSucessFull, loginFail, logOut } = authSlice.actions

export default authSlice.reducer