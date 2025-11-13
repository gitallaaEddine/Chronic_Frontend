import { apiClient } from "../api/apiClient";

export const authService = {
  login: async (credentials) => {
    const { data } = await apiClient.post("/authentication/login", credentials);
    console.log(data.data);

    return {
      token: data.data?.token || "",
      user: data.data?.userData || null,
      message: data.message || "",
      success: !!data.success,
    };
  },

  register: async (userData) => {
    const { data } = await apiClient.post("/authentication/register", userData);
    console.log(data.data);

    return {
      token: data.data?.token || "",
      user: data.data?.userData || null,
      message: data.message || "",
      success: !!data.success,
    };
  },

  refreshToken: () => {
    return apiClient.post("/authentication/token");
  },

  logout: async () => {
    const { data } = apiClient.post("/authentication/logout");
    console.log(data);

    return data;
  },

  getUsers: (filters) => {
    return apiClient.get("/authentication", { params: filters });
  },
};
