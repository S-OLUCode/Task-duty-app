import { AuthProviderContext } from "../hooks/useAuth";
import { getAuthUser } from "../api/auth";
import { logoutUser } from "../api/auth";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
// import Lazyspinner from "../Components/Lazyspinner";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { safeGetItem, safeSetItem, safeRemoveItem } from "../utils/storage";

export default function AuthProvider({ children }) {

  const [accessToken, setAccessToken] = useState(() => {
    return safeGetItem("TaskDutyToken") || null;
  });

  const [user, setUser] = useState(null);

  const queryClient = useQueryClient();

  // Save token to storage
  useEffect(() => {
    if (accessToken) {
      safeSetItem("TaskDutyToken", accessToken);
    } else {
      safeRemoveItem("TaskDutyToken");
    }
  }, [accessToken]);

  // Fetch authenticated user
  useEffect(() => {
    async function fetchUser() {
      if (!accessToken) {
        setUser(null);
        return;
      }

      try {
        const res = await getAuthUser(accessToken);

        if (res.status === 200) {
          setUser(res.data.data);
        }
      } catch (error) {
        console.error(error);
        setAccessToken(null);
        setUser(null);
      }
    }

    fetchUser();
  }, [accessToken]);

   const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: (res) => {
      toast.success(res?.data?.message || "Logout successfull");
      queryClient.clear();
      setAccessToken(null);
      setUser(null);
    },
    onError: (err) => {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    },
  });

  const handleLogout = async () => mutation.mutate(accessToken);

  // if (isAuthenticating) {
  //   return <Lazyspinner />;
  // }

  const contextValue = {
    accessToken,
    user,
    setAccessToken,
    setUser,
    handleLogout,
  };

  return (
    <AuthProviderContext.Provider value={contextValue}>
      {children}
    </AuthProviderContext.Provider>
  );
}