import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

//login
export const userSignIn = async (data) => {
  const postURL = `${BASE_URL}/mba/api/v1/auth/signin`;
  return await axios.post(postURL, data);
};

//signUp

export const userSignUp = async (data) => {
  const postURL = `${BASE_URL}/mba/api/v1/auth/signup`;
  return await axios.post(postURL, data);
};
