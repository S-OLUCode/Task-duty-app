import { useState, useEffect } from "react";
import AuthProvider from "./store/AuthProvider";
import AppRoutes from ".../Routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();
function App() {
  // const [showCookieBanner, setShowCookieBanner] = useState(false);
  // useEffect(() => {
  //   const checkCookies = () => {
  //     const blocked = detectCookiesBlocked();
  //     setShowCookieBanner(blocked);
  //   };
  //   // check immediately
  //   checkCookies();
  //   // check periodically (every 30 seconds) in case user enables cookies
  //   const interval = setInterval(checkCookies, 30000);
  //   return () => clearInterval(interval);
  // }, []);
  return (
    <>
    {/* {showCookieBanner && (
      <CookieBanner onDismiss={() => setShowCookieBanner(false)}/>
    )} */}
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </QueryClientProvider>
      <ToastContainer/>
    </>
  );
}

export default App;

