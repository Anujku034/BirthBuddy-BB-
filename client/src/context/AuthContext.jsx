import { createContext, useState,useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat(
    (4 - (base64String.length % 4)) % 4
  );

  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);

  return Uint8Array.from(
    [...rawData].map((char) => char.charCodeAt(0))
  );
};

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [notificationCount,setNotificationCount] = useState(0);
  const [authLoading,setAuthLoading] = useState(true);

  const subscribeToPushNotifications = async () => {
    try {
      if (!("serviceWorker" in navigator)) {
        console.log("Service Worker is not supported");
        return;
      }

      if (!("PushManager" in window)) {
        console.log("Push notifications are not supported");
        return;
      }

      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        console.log("Notification permission denied");
        return;
      }

      const registration =
        await navigator.serviceWorker.ready;

      const subscription =
        await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            import.meta.env.VITE_VAPID_PUBLIC_KEY
          ),
        });

      await axios.post(
        "http://localhost:3000/api/push-subscription",
        subscription.toJSON(),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Push subscription saved successfully");
    } catch (error) {
      console.error(
        "PUSH SUBSCRIPTION ERROR:",
        error
      );
    }
  };
  const getNotificationCount = async () => {
  if (!accessToken) return;

  try {
    const response = await axios.get(
      "http://localhost:3000/api/notifications/unread-count",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    setNotificationCount(response.data.count);
  } catch (error) {
    console.error("GET NOTIFICATION COUNT ERROR:", error);
  }
  };
  useEffect(() => {
    const restoreSession = async () => {
        try{
            const response = await axios.post(
                "http://localhost:3000/api/auth/refresh",
                {},
                {
                    withCredentials: true,
                }
            );
            setAccessToken(response.data.accessToken);
            setUser(response.data.user.fullName);
        }catch(error){
            console.log("No active session");
            setAccessToken(null);
            setUser(null);
        }
        finally{
            setAuthLoading(false);
        }
    };
    restoreSession();
  },[]);
  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        user,
        setUser,
        subscribeToPushNotifications,
        notificationCount,
        setNotificationCount,
        getNotificationCount,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};