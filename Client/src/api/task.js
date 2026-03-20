import axiosClient from "../utils/axiosClient";

export const createTask = async (data, token) => {
  return await axiosClient.post("/task/create", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTasks = async (token) => {
  return await axiosClient.get("/task/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const getSingleTask = async (id, accessToken) => {
  return await axiosClient.get(`/task/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateTask = async (id, data, accessToken) => {
  return await axiosClient.patch(`/task/${id}`, data, { 
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const deleteTask = async (id, token) => {
  return await axiosClient.delete(`/task/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};