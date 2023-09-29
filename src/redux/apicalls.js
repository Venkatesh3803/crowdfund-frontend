import { publicRequest } from "../requestMethods";
import { RegisterFail, RegisterStarts, RegisterSucessFull, loginFail, loginStarts, loginSucessFull } from "./authReducer";


export const login = async (dispatch, user) => {
    dispatch(loginStarts());
    try {
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSucessFull(res.data));
    } catch (err) {
        dispatch(loginFail());
    }
};


export const register = async (dispatch, user) => {
    dispatch(RegisterStarts());
    try {
        const res = await publicRequest.post("/auth/register", user)
        dispatch(RegisterSucessFull(res.data));
    } catch (err) {
        dispatch(RegisterFail());
    }
};







