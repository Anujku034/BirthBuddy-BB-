import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_URL;
import axiosInstance from "../api/axiosInstance";

/* =========================================================
   Convert VAPID public key to Uint8Array
========================================================= */
const urlBase64ToUint8Array = (base64String) => {
  if (!base64String) {
    throw new Error("VITE_VAPID_PUBLIC_KEY is missing");
  }

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
  /* =========================================================
     AUTH STATE
  ========================================================= */

  const [accessToken, setAccessToken] = useState(null);

  // Keep user as fullName string for compatibility
  // with your existing Navbar and other components.
  const [user, setUser] = useState(null);

  // Store email separately for Settings page.
  const [userEmail, setUserEmail] = useState(null);

  const [notificationCount, setNotificationCount] = useState(0);

  const [authLoading, setAuthLoading] = useState(true);

  /* =========================================================
     SET USER DATA
  ========================================================= */

  const updateUserData = (userData) => {
    if (!userData) {
      setUser(null);
      setUserEmail(null);
      return;
    }

    // If backend returns complete user object
    if (typeof userData === "object") {
      setUser(userData.fullName || null);
      setUserEmail(userData.email || null);
      return;
    }

    // If some existing component only sends fullName
    if (typeof userData === "string") {
      setUser(userData);
    }
  };

  /* =========================================================
     PUSH NOTIFICATIONS
  ========================================================= */

  const subscribeToPushNotifications = async () => {
    try {
      if (!accessToken) {
        console.log("Access token not available");
        return;
      }

      if (!("serviceWorker" in navigator)) {
        console.log("Service Worker is not supported");
        return;
      }

      if (!("PushManager" in window)) {
        console.log("Push notifications are not supported");
        return;
      }

      if (!("Notification" in window)) {
        console.log("Browser notifications are not supported");
        return;
      }

      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        console.log("Notification permission denied");
        return;
      }

      const registration =
        await navigator.serviceWorker.ready;

      /*
        Check if subscription already exists.
        This prevents creating unnecessary
        duplicate push subscriptions.
      */
      let subscription =
        await registration.pushManager.getSubscription();

      if (!subscription) {
        subscription =
          await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey:
              urlBase64ToUint8Array(
                import.meta.env.VITE_VAPID_PUBLIC_KEY
              ),
          });
      }

      await axios.post(
        `${API_BASE_URL}/push-subscription`,
        subscription.toJSON(),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(
        "Push subscription saved successfully"
      );
    } catch (error) {
      console.error(
        "PUSH SUBSCRIPTION ERROR:",
        error
      );
    }
  };

  /* =========================================================
     GET UNREAD NOTIFICATION COUNT
  ========================================================= */

  const getNotificationCount = async () => {
    if (!accessToken) {
      return;
    }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/notifications/unread-count`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setNotificationCount(
        response.data?.count || 0
      );
    } catch (error) {
      console.error(
        "GET NOTIFICATION COUNT ERROR:",
        error
      );
    }
  };

  /* =========================================================
     RESTORE SESSION AFTER PAGE REFRESH
  ========================================================= */

  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          {
            withCredentials: true,
          }
        );

        if (!isMounted) return;

        const refreshedAccessToken =
          response.data?.accessToken;

        const refreshedUser =
          response.data?.user;

        if (!refreshedAccessToken || !refreshedUser) {
          throw new Error(
            "Invalid refresh response"
          );
        }

        setAccessToken(refreshedAccessToken);

        updateUserData(refreshedUser);
      } catch (error) {
        if (!isMounted) return;

        console.log(
          "No active session"
        );

        setAccessToken(null);
        setUser(null);
        setUserEmail(null);
        setNotificationCount(0);
      } finally {
        if (isMounted) {
          setAuthLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  /* =========================================================
     GET NOTIFICATION COUNT WHEN USER LOGS IN
  ========================================================= */

  useEffect(() => {
    if (!accessToken) {
      setNotificationCount(0);
      return;
    }

    getNotificationCount();
  }, [accessToken]);

  /* =========================================================
     AUTH CONTEXT
  ========================================================= */

  return (
    <AuthContext.Provider
      value={{
        /* Authentication */
        accessToken,
        setAccessToken,

        /* User */
        user,
        setUser: updateUserData,
        userEmail,
        setUserEmail,

        /* Notifications */
        notificationCount,
        setNotificationCount,
        getNotificationCount,

        /* Push notifications */
        subscribeToPushNotifications,

        /* Session loading */
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};