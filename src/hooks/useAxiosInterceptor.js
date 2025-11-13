import { useEffect } from "react";
import {apiClient} from "../api/apiClient";
import { useAuthStore } from "../store/authStore";
import axios from "axios";

export const useAxiosInterceptor = () => {
  // 1. GET ACCESS TOKEN FROM ZUSTAND STORE
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const logout = useAuthStore((state) => state.logout);

  // 2. USE EFFECT TO SET UP INTERCEPTORS
  useEffect(() => {
    // 3. REQUEST INTERCEPTOR: runs BEFORE every API call
    const reqInterceptor = apiClient.interceptors.request.use(
      (config) => {
        // If we have a token, attach it to the Authorization header
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config; // Continue with the request
      },
      (error) => Promise.reject(error) // Handle request errors
    );

    // 4. RESPONSE INTERCEPTOR: runs AFTER every API response
    const resInterceptor = apiClient.interceptors.response.use(
      (response) => response, // If successful, just return the response

      async (error) => {
        // 5. HANDLE 401 ERRORS (expired token)
        const originalRequest = error.config;

        // Check: Is it 401? Is it "access token expired"? Haven't we retried already?
        if (
          error.response?.status === 401 &&
          error.response?.data?.message === "jwt expired" &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true; // Mark as retried to avoid infinite loop

          try {
            // 6. CALL REFRESH TOKEN ENDPOINT
            const { data } = await axios.post(
              `${import.meta.env.VITE_BACK_API}/authentication/token`,
              {},
              { withCredentials: true } // Send httpOnly cookie
            );

            // 7. UPDATE TOKEN IN STORE
            setAccessToken(data.accessToken);

            // 8. RETRY ORIGINAL REQUEST with new token
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return apiClient(originalRequest);
          } catch (refreshError) {
            // 9. REFRESH FAILED → LOGOUT USER
            logout();
            // window.location.href = "/login";
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error); // Not a 401 or already retried → fail
      }
    );

    
    // 10. CLEANUP: Remove interceptors when component unmounts or token changes
    return () => {
      apiClient.interceptors.request.eject(reqInterceptor);
      apiClient.interceptors.response.eject(resInterceptor);
    };
    
  }, [accessToken, setAccessToken, logout]); // Re-run if these values change

  // 11. RETURN THE API CLIENT (optional, components can import it directly)
  return apiClient;
};
