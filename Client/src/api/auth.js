import axiosClient from "../utils/axiosClient.js";

export const refreshAccessToken = async () => {
  return await axiosClient.post(
    "/user/refresh-token",
    {},
    {
      withCredentials: true, //ensure cookies is sent along with request
    }
  );
};

export const loginUser = async (FormData) => {
  return await axiosClient.post("/user/login", FormData);
};

export const registerUser = async (FormData) => {
  return await axiosClient.post("/user/register", FormData);
};

export const getAuthUser = async (accessToken) => {
  return await axiosClient.get("/user/get", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const logoutUser = async (accessToken) => {
  return await axiosClient.post(
    "/user/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    {
      withCredentials: true,
    }
  );
};