import React, {
  useState,
  useEffect,
  useContext,
} from "react";
import axiosInstance from "../../api/axiosInstance";
import {
  Clock3,
  Info,
  UserRound,
  LockKeyhole,
  Eye,
  EyeOff,
  Check,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Save,
  Sparkles,
  Phone,
  Mail,
  UserRoundPlus,
  BellRing,
  Settings as SettingsIcon,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

import axios from "axios";

import { AuthContext } from "../../context/AuthContext";

import settingsHero from "../../assets/dashboard/settingsHero.png";

// ============================================================
// SETTINGS
// ============================================================

function Settings() {
  const {
    accessToken,
    setAccessToken,
    user,
    setUser,
  } = useContext(AuthContext);

  // ==========================================================
  // ACCOUNT
  // ==========================================================

  const [fullName, setFullName] = useState(
    typeof user === "string"
      ? user
      : user?.fullName || ""
  );

  const [email, setEmail] = useState(
    typeof user === "object"
      ? user?.email || ""
      : ""
  );

  const [updatingProfile, setUpdatingProfile] =
    useState(false);

  const [profileMessage, setProfileMessage] =
    useState("");

  const [profileError, setProfileError] =
    useState("");

  // ==========================================================
  // PASSWORD
  // ==========================================================

  const [passwordOpen, setPasswordOpen] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState({
      current: false,
      newPassword: false,
      confirm: false,
    });

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [updatingPassword, setUpdatingPassword] =
    useState(false);

  const [passwordMessage, setPasswordMessage] =
    useState("");

  const [passwordError, setPasswordError] =
    useState("");

  // ==========================================================
  // WHATSAPP
  // ==========================================================

  const [whatsappConnected, setWhatsappConnected] =
    useState(false);

  const [whatsappPhone, setWhatsappPhone] =
    useState("");

  const [loadingWhatsapp, setLoadingWhatsapp] =
    useState(true);

  const [showWhatsAppConnect, setShowWhatsAppConnect] =
    useState(false);

  const [phoneNumber, setPhoneNumber] =
    useState("");

  const [confirmPhoneNumber, setConfirmPhoneNumber] =
    useState("");

  const [whatsappError, setWhatsappError] =
    useState("");

  const [connectingWhatsapp, setConnectingWhatsapp] =
    useState(false);

  const [whatsappEnabled, setWhatsappEnabled] =
    useState(true);

  // ==========================================================
  // REMINDER
  // ==========================================================

  const [reminderTime, setReminderTime] =
    useState("09:00");

  const [updatingReminder, setUpdatingReminder] =
    useState(false);

  // ==========================================================
  // REFRESH ACCESS TOKEN
  // ==========================================================

  const refreshAccessToken = async () => {
    try {
      const response = await axiosInstance.post(
        "/auth/refresh",
        {},
        {
          withCredentials: true,
        }
      );

      const newAccessToken =
        response.data.accessToken;

      setAccessToken(newAccessToken);

      if (response.data.user) {
        setUser(response.data.user.fullName);
      }

      return newAccessToken;
    } catch (error) {
      console.error(
        "REFRESH TOKEN ERROR:",
        error
      );

      setAccessToken(null);

      alert(
        "Session expired. Please login again."
      );

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

      return null;
    }
  };

  // ==========================================================
  // UPDATE PROFILE
  // ==========================================================

  const handleUpdateProfile = async () => {
    setProfileMessage("");
    setProfileError("");

    if (!fullName.trim()) {
      setProfileError(
        "Full name is required."
      );
      return;
    }

    if (!email.trim()) {
      setProfileError(
        "Email address is required."
      );
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setProfileError(
        "Please enter a valid email address."
      );
      return;
    }

    try {
      setUpdatingProfile(true);

      const response = await axiosInstance.put(
        "/auth/update-profile",
        {
          fullName: fullName.trim(),
          email: email.trim(),
        },
        {
          headers: {
            Authorization:
              `Bearer ${accessToken}`,
          },
        }
      );

      const updatedUser =
        response.data?.user;

      if (updatedUser) {
        setFullName(
          updatedUser.fullName
        );

        setEmail(
          updatedUser.email
        );

        setUser(
          updatedUser.fullName
        );
      }

      setProfileMessage(
        response.data?.message ||
          "Profile updated successfully."
      );
    } catch (error) {
      console.error(
        "UPDATE PROFILE ERROR:",
        error
      );

      if (
        error.response?.status === 401
      ) {
        const newToken =
          await refreshAccessToken();

        if (!newToken) {
          return;
        }

        try {
          const retryResponse =
            await axiosInstance.put(
              "/auth/update-profile",
              {
                fullName: fullName.trim(),
                email: email.trim(),
              },
              {
                headers: {
                  Authorization:
                    `Bearer ${newToken}`,
                },
              }
            );

          const updatedUser =
            retryResponse.data?.user;

          if (updatedUser) {
            setFullName(
              updatedUser.fullName
            );

            setEmail(
              updatedUser.email
            );

            setUser(
              updatedUser.fullName
            );
          }

          setProfileMessage(
            retryResponse.data?.message ||
              "Profile updated successfully."
          );

          return;
        } catch (retryError) {
          console.error(
            "UPDATE PROFILE RETRY ERROR:",
            retryError
          );

          setProfileError(
            retryError.response?.data
              ?.message ||
              "Failed to update profile."
          );

          return;
        }
      }

      setProfileError(
        error.response?.data?.message ||
          "Failed to update profile."
      );
    } finally {
      setUpdatingProfile(false);
    }
  };

  // ==========================================================
  // UPDATE PASSWORD
  // ==========================================================

  const handleUpdatePassword = async () => {
    setPasswordMessage("");
    setPasswordError("");

    if (!currentPassword) {
      setPasswordError(
        "Please enter your current password."
      );
      return;
    }

    if (!newPassword) {
      setPasswordError(
        "Please enter your new password."
      );
      return;
    }

    if (!confirmPassword) {
      setPasswordError(
        "Please confirm your new password."
      );
      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      setPasswordError(
        "New password and confirm password do not match."
      );
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        "Password must contain 8+ characters, uppercase, lowercase, number and special character."
      );
      return;
    }

    try {
      setUpdatingPassword(true);

      const response = await axiosInstance.put(
        "/auth/change-password",
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization:
              `Bearer ${accessToken}`,
          },
        }
      );

      setPasswordMessage(
        response.data?.message ||
          "Password changed successfully."
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setShowPassword({
        current: false,
        newPassword: false,
        confirm: false,
      });
    } catch (error) {
      console.error(
        "UPDATE PASSWORD ERROR:",
        error
      );

      if (
        error.response?.status === 401
      ) {
        const newToken =
          await refreshAccessToken();

        if (!newToken) {
          return;
        }

        try {
          const retryResponse =
            await axiosInstance.put(
              "/auth/change-password",
              {
                currentPassword,
                newPassword,
                confirmPassword,
              },
              {
                headers: {
                  Authorization:
                    `Bearer ${newToken}`,
                },
              }
            );

          setPasswordMessage(
            retryResponse.data?.message ||
              "Password changed successfully."
          );

          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");

          setShowPassword({
            current: false,
            newPassword: false,
            confirm: false,
          });

          return;
        } catch (retryError) {
          console.error(
            "CHANGE PASSWORD RETRY ERROR:",
            retryError
          );

          setPasswordError(
            retryError.response?.data
              ?.message ||
              "Failed to change password."
          );

          return;
        }
      }

      setPasswordError(
        error.response?.data?.message ||
          "Failed to change password."
      );
    } finally {
      setUpdatingPassword(false);
    }
  };

  // ==========================================================
  // CONNECT WHATSAPP
  // ==========================================================

  const handleConnectWhatsApp = async () => {
    setWhatsappError("");

    if (
      !phoneNumber ||
      !confirmPhoneNumber
    ) {
      setWhatsappError(
        "Please enter and confirm your WhatsApp number."
      );
      return;
    }

    if (
      phoneNumber !==
      confirmPhoneNumber
    ) {
      setWhatsappError(
        "WhatsApp numbers do not match."
      );
      return;
    }

    try {
      setConnectingWhatsapp(true);

      const response =
        await axiosInstance.post(
          "/connect-whatsapp",
          {
            phoneNumber,
            confirmPhoneNumber,
          },
          {
            headers: {
              Authorization:
                `Bearer ${accessToken}`,
            },
          }
        );

      setWhatsappConnected(true);

      setWhatsappPhone(
        response.data?.whatsapp
          ?.phoneNumber ||
          phoneNumber
      );

      setPhoneNumber("");
      setConfirmPhoneNumber("");
      setWhatsappError("");
      setShowWhatsAppConnect(false);
    } catch (error) {
      console.error(
        "CONNECT WHATSAPP ERROR:",
        error
      );

      if (
        error.response?.status === 401
      ) {
        const newToken =
          await refreshAccessToken();

        if (!newToken) {
          return;
        }

        try {
          const retryResponse =
            await axiosInstance.post(
              "/connect-whatsapp",
              {
                phoneNumber,
                confirmPhoneNumber,
              },
              {
                headers: {
                  Authorization:
                    `Bearer ${newToken}`,
                },
              }
            );

          setWhatsappConnected(true);

          setWhatsappPhone(
            retryResponse.data?.whatsapp
              ?.phoneNumber ||
              phoneNumber
          );

          setPhoneNumber("");
          setConfirmPhoneNumber("");
          setWhatsappError("");
          setShowWhatsAppConnect(false);

          return;
        } catch (retryError) {
          console.error(
            "WHATSAPP RETRY ERROR:",
            retryError
          );
        }
      }

      setWhatsappError(
        error.response?.data?.message ||
          "Failed to connect WhatsApp."
      );
    } finally {
      setConnectingWhatsapp(false);
    }
  };

  // ==========================================================
  // GET WHATSAPP STATUS
  // ==========================================================

  const getWhatsAppStatus = async () => {
    try {
      setLoadingWhatsapp(true);

      const response =
        await axiosInstance.get(
          "/whatsapp-status",
          {
            headers: {
              Authorization:
                `Bearer ${accessToken}`,
            },
          }
        );

      setWhatsappConnected(
        response.data?.connected ||
          false
      );

      setWhatsappPhone(
        response.data?.phoneNumber ||
          ""
      );
    } catch (error) {
      console.error(
        "GET WHATSAPP STATUS ERROR:",
        error
      );

      if (
        error.response?.status === 401
      ) {
        await refreshAccessToken();
      }

      setWhatsappConnected(false);
      setWhatsappPhone("");
    } finally {
      setLoadingWhatsapp(false);
    }
  };

  // ==========================================================
  // GET REMINDER SETTINGS
  // ==========================================================

  const getReminderSettings = async () => {
    try {
      const response =
        await axiosInstance.get(
          "/reminder-settings",
          {
            headers: {
              Authorization:
                `Bearer ${accessToken}`,
            },
          }
        );

      setReminderTime(
        response.data?.reminderTime ||
          "09:00"
      );
    } catch (error) {
      console.error(
        "GET REMINDER SETTINGS ERROR:",
        error
      );

      if (
        error.response?.status === 401
      ) {
        await refreshAccessToken();
      }
    }
  };

  // ==========================================================
  // UPDATE REMINDER
  // ==========================================================

  const updateReminderSettings =
    async (time) => {
      try {
        setUpdatingReminder(true);

        await axiosInstance.put(
          "/reminder-settings",
          {
            reminderTime: time,
          },
          {
            headers: {
              Authorization:
                `Bearer ${accessToken}`,
            },
          }
        );

        setReminderTime(time);
      } catch (error) {
        console.error(
          "UPDATE REMINDER SETTINGS ERROR:",
          error
        );

        if (
          error.response?.status === 401
        ) {
          const newToken =
            await refreshAccessToken();

          if (!newToken) {
            return;
          }

          try {
            await axiosInstance.put(
              "/reminder-settings",
              {
                reminderTime: time,
              },
              {
                headers: {
                  Authorization:
                    `Bearer ${newToken}`,
                },
              }
            );

            setReminderTime(time);
          } catch (retryError) {
            console.error(
              "REMINDER RETRY ERROR:",
              retryError
            );
          }
        }
      } finally {
        setUpdatingReminder(false);
      }
    };

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    getWhatsAppStatus();
    getReminderSettings();
  }, [accessToken]);

  // ==========================================================
  // FORMAT TIME
  // ==========================================================

  const formattedReminderTime =
    reminderTime
      ? new Date(
          `1970-01-01T${reminderTime}`
        ).toLocaleTimeString(
          "en-US",
          {
            hour: "numeric",
            minute: "2-digit",
          }
        )
      : "9:00 AM";

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <div
      className="
        min-h-full
        overflow-y-auto
        bg-[#f4f5ff]
        px-3
        py-4
        transition-colors
        duration-300
        sm:px-5
        lg:px-7
        dark:bg-[#080a12]
      "
    >
      <div className="mx-auto max-w-[1500px]">

        {/* ==================================================
            HEADER
        ================================================== */}

        <section
          className="
            relative
            mb-5
            h-[150px]
            overflow-hidden
            rounded-[26px]
            border
            border-white/90
            bg-gradient-to-br
            from-white
            via-[#f8f1ff]
            to-[#e9ddff]
            shadow-[0_25px_70px_rgba(72,48,145,0.14)]
            backdrop-blur-2xl
            dark:border-white/10
            dark:from-[#151323]
            dark:via-[#181329]
            dark:to-[#25183c]
          "
        >
          <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-[#d5bdff]/35 blur-3xl" />

          <div className="absolute left-[35%] -top-28 h-60 w-60 rounded-full bg-[#f6c8ff]/25 blur-3xl" />

          <div className="absolute right-[20%] -bottom-24 h-60 w-60 rounded-full bg-[#8c5aff]/20 blur-3xl" />

          <div className="relative z-10 px-6 pt-7 sm:px-8">

            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-[16px]
                  bg-gradient-to-br
                  from-[#7743ff]
                  to-[#5422df]
                  text-white
                  shadow-[0_15px_35px_rgba(99,56,239,0.30)]
                "
              >
                <SettingsIcon
                  size={24}
                  strokeWidth={2.5}
                />
              </div>

              <div>
                <div className="flex items-center gap-2">

                  <h1
                    className="
                      text-[28px]
                      font-black
                      tracking-[-1px]
                      text-[#11162e]
                      dark:text-white
                      sm:text-[34px]
                    "
                  >
                    Settings
                  </h1>

                  <Sparkles
                    size={20}
                    className="text-[#743cff]"
                  />
                </div>

                <p
                  className="
                    mt-1
                    text-[10px]
                    font-semibold
                    text-[#78829c]
                    dark:text-[#9ca3b8]
                    sm:text-[12px]
                  "
                >
                  Customize your experience and
                  make BirthdayBuddy work the way
                  you want.
                </p>
              </div>

            </div>

            <div
              className="
                mt-4
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/90
                bg-white/70
                px-4
                py-2
                shadow-[0_10px_25px_rgba(70,45,130,0.08)]
                backdrop-blur-xl
                dark:border-white/10
                dark:bg-white/5
              "
            >
              <Sparkles
                size={11}
                className="text-[#703bff]"
              />

              <span
                className="
                  text-[8px]
                  font-bold
                  text-[#59627d]
                  dark:text-[#b9c0d0]
                "
              >
                "Small settings, big happiness!" 💜
              </span>
            </div>

          </div>

          <img
            src={settingsHero}
            alt="Settings"
            className="
              pointer-events-none
              absolute
              bottom-[-20px]
              right-[2%]
              hidden
              h-[170px]
              w-auto
              object-contain
              drop-shadow-[0_25px_35px_rgba(75,45,145,0.20)]
              md:block
            "
          />
        </section>

        {/* ==================================================
            MAIN GRID
        ================================================== */}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

          {/* ==================================================
              ACCOUNT SETTINGS
          ================================================== */}

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[25px]
              border
              border-white/90
              bg-gradient-to-br
              from-white
              via-[#fffaff]
              to-[#f5ecff]
              p-5
              shadow-[0_22px_60px_rgba(72,48,145,0.10)]
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_30px_70px_rgba(72,48,145,0.15)]
              dark:border-white/10
              dark:from-[#12111d]
              dark:via-[#171422]
              dark:to-[#211633]
            "
          >
            <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-[#d9bfff]/30 blur-3xl" />

            <div className="pointer-events-none absolute right-5 top-5 opacity-[0.10]">
              <UserRoundPlus
                size={105}
                className="text-[#8144ff]"
              />
            </div>

            <div className="relative z-10">

              <SectionTitle
                icon={UserRound}
                title="Account Settings"
                subtitle="Update your profile information."
                iconBg="bg-[#ffe5ef] dark:bg-pink-500/10"
                iconColor="text-[#f04478] dark:text-[#ff79a2]"
              />

              <div className="mt-5 grid gap-5 md:grid-cols-[110px_1fr]">

                <div className="flex items-center justify-center">

                  <div
                    className="
                      relative
                      flex
                      h-[105px]
                      w-[105px]
                      items-center
                      justify-center
                      rounded-full
                      border-[7px]
                      border-white
                      bg-gradient-to-br
                      from-[#e5ebfb]
                      to-[#c7d1ea]
                      shadow-[0_15px_35px_rgba(45,65,120,0.16)]
                      dark:border-[#2a2539]
                      dark:from-[#29263b]
                      dark:to-[#1b1930]
                    "
                  >
                    <UserRound
                      size={55}
                      strokeWidth={1.6}
                      className="
                        text-[#38517f]
                        dark:text-[#9ca8ca]
                      "
                    />

                    <div
                      className="
                        absolute
                        bottom-[-2px]
                        right-[-3px]
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border-4
                        border-white
                        bg-gradient-to-br
                        from-[#8c4dff]
                        to-[#5c2be7]
                        text-white
                        shadow-lg
                        dark:border-[#171422]
                      "
                    >
                      <UserRoundPlus size={15} />
                    </div>
                  </div>

                </div>

                <div className="space-y-4">

                  <AccountInput
                    icon={UserRound}
                    label="Full Name"
                    value={fullName}
                    onChange={setFullName}
                  />

                  <AccountInput
                    icon={Mail}
                    label="Account Email"
                    value={email}
                    onChange={setEmail}
                    type="email"
                  />

                </div>
              </div>

              {profileError && (
                <MessageBox
                  type="error"
                  message={profileError}
                />
              )}

              {profileMessage && (
                <MessageBox
                  type="success"
                  message={profileMessage}
                />
              )}

              <button
                type="button"
                disabled={updatingProfile}
                onClick={handleUpdateProfile}
                className="
                  mt-5
                  flex
                  h-[49px]
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-[15px]
                  bg-gradient-to-r
                  from-[#7138ef]
                  to-[#5421dd]
                  text-[10px]
                  font-black
                  text-white
                  shadow-[0_15px_30px_rgba(99,50,239,0.24)]
                  transition-all
                  hover:-translate-y-0.5
                  hover:shadow-[0_20px_38px_rgba(99,50,239,0.30)]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                <Save size={16} />

                {updatingProfile
                  ? "Updating..."
                  : "Update Profile"}

                {!updatingProfile && (
                  <span className="text-[17px]">
                    →
                  </span>
                )}
              </button>

            </div>
          </div>

          {/* ==================================================
              CHANGE PASSWORD
          ================================================== */}

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[25px]
              border
              border-white/90
              bg-gradient-to-br
              from-white
              via-[#fffdfb]
              to-[#fff3e7]
              p-5
              shadow-[0_22px_60px_rgba(140,90,35,0.10)]
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_30px_70px_rgba(140,90,35,0.15)]
              dark:border-white/10
              dark:from-[#171411]
              dark:via-[#1b1713]
              dark:to-[#261b12]
            "
          >
            <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-[#ffc77c]/20 blur-3xl" />

            <div className="pointer-events-none absolute right-5 top-3 opacity-[0.10]">
              <LockKeyhole
                size={105}
                className="text-[#f39a35]"
              />
            </div>

            <div className="relative z-10">

              <button
                type="button"
                onClick={() => {
                  setPasswordOpen(
                    (prev) => !prev
                  );

                  setPasswordMessage("");
                  setPasswordError("");
                }}
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  text-left
                "
              >
                <SectionTitle
                  icon={LockKeyhole}
                  title="Change Password"
                  subtitle="Keep your account secure."
                  iconBg="bg-[#fff0d9] dark:bg-orange-500/10"
                  iconColor="text-[#ef9a22] dark:text-[#ffb04d]"
                />

                <div
                  className="
                    relative
                    z-20
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-[14px]
                    bg-white
                    text-[#78839a]
                    shadow-[0_10px_25px_rgba(60,45,90,0.08)]
                    transition-all
                    hover:bg-[#f8f5ff]
                    dark:bg-[#211b29]
                    dark:text-[#aaa3b8]
                    dark:hover:bg-[#2a2335]
                  "
                >
                  {passwordOpen ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </div>
              </button>

              {/* PASSWORD FORM */}

              <div
                className={`
                  grid
                  transition-all
                  duration-500
                  ${
                    passwordOpen
                      ? "mt-5 grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }
                `}
              >
                <div className="min-h-0 overflow-hidden">

                  <div className="space-y-3">

                    <PasswordInput
                      label="Current Password"
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={setCurrentPassword}
                      visible={
                        showPassword.current
                      }
                      onToggle={() =>
                        setShowPassword(
                          (prev) => ({
                            ...prev,
                            current:
                              !prev.current,
                          })
                        )
                      }
                    />

                    <PasswordInput
                      label="New Password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={setNewPassword}
                      visible={
                        showPassword.newPassword
                      }
                      onToggle={() =>
                        setShowPassword(
                          (prev) => ({
                            ...prev,
                            newPassword:
                              !prev.newPassword,
                          })
                        )
                      }
                    />

                    <PasswordInput
                      label="Confirm New Password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={setConfirmPassword}
                      visible={
                        showPassword.confirm
                      }
                      onToggle={() =>
                        setShowPassword(
                          (prev) => ({
                            ...prev,
                            confirm:
                              !prev.confirm,
                          })
                        )
                      }
                    />

                    {passwordError && (
                      <MessageBox
                        type="error"
                        message={passwordError}
                      />
                    )}

                    {passwordMessage && (
                      <MessageBox
                        type="success"
                        message={passwordMessage}
                      />
                    )}

                    <div
                      className="
                        flex
                        items-start
                        gap-2
                        rounded-[13px]
                        border
                        border-[#ffe4c6]
                        bg-[#fff8ef]
                        px-3
                        py-2.5
                        dark:border-orange-500/10
                        dark:bg-orange-500/5
                      "
                    >
                      <ShieldCheck
                        size={13}
                        className="
                          mt-0.5
                          shrink-0
                          text-[#ed982f]
                        "
                      />

                      <p
                        className="
                          text-[7px]
                          font-semibold
                          leading-3.5
                          text-[#8b795f]
                          dark:text-[#a99b86]
                        "
                      >
                        Use a strong password with
                        uppercase, lowercase, numbers
                        and special characters.
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={
                        updatingPassword
                      }
                      onClick={
                        handleUpdatePassword
                      }
                      className="
                        flex
                        h-[49px]
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-[15px]
                        bg-gradient-to-r
                        from-[#7138ef]
                        to-[#5421dd]
                        text-[10px]
                        font-black
                        text-white
                        shadow-[0_15px_30px_rgba(99,50,239,0.24)]
                        transition-all
                        hover:-translate-y-0.5
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    >
                      <LockKeyhole size={16} />

                      {updatingPassword
                        ? "Updating..."
                        : "Update Password"}

                      {!updatingPassword && (
                        <span className="text-[17px]">
                          →
                        </span>
                      )}
                    </button>

                  </div>
                </div>
              </div>

              {!passwordOpen && (
                <div
                  className="
                    mt-5
                    rounded-[15px]
                    border
                    border-[#f4e5d5]
                    bg-white/70
                    px-4
                    py-3
                    dark:border-white/10
                    dark:bg-white/[0.035]
                  "
                >
                  <div className="flex items-center gap-2">

                    <Check
                      size={13}
                      className="text-[#17ae79]"
                    />

                    <p
                      className="
                        text-[8px]
                        font-bold
                        text-[#727c92]
                        dark:text-[#9199aa]
                      "
                    >
                      Click above to securely change
                      your password.
                    </p>

                  </div>
                </div>
              )}

            </div>
          </div>

          {/* ==================================================
              WHATSAPP
          ================================================== */}

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[25px]
              border
              border-white/90
              bg-gradient-to-br
              from-white
              via-[#fbfffd]
              to-[#eafff6]
              p-5
              shadow-[0_22px_60px_rgba(45,100,75,0.10)]
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-1
              dark:border-white/10
              dark:from-[#111a17]
              dark:via-[#111b18]
              dark:to-[#10251d]
            "
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#20d67a]/15 blur-3xl" />

            <div className="pointer-events-none absolute right-8 top-8 opacity-[0.08]">
              <FaWhatsapp
                size={110}
                className="text-[#0bbd70]"
              />
            </div>

            <div className="relative z-10">

              <div className="flex items-start justify-between gap-4">

                <SectionTitle
                  icon={FaWhatsapp}
                  title="WhatsApp Notifications"
                  subtitle="Get automatic birthday reminders on WhatsApp."
                  iconBg="bg-[#dff9ec] dark:bg-emerald-500/10"
                  iconColor="text-[#08b879] dark:text-[#28d890]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setWhatsappEnabled(
                      (prev) => !prev
                    )
                  }
                  className={`
                    relative
                    flex
                    h-7
                    w-12
                    shrink-0
                    items-center
                    overflow-hidden
                    rounded-full
                    p-1
                    transition-all
                    duration-300
                    ${
                      whatsappEnabled
                        ? "bg-gradient-to-r from-[#6338ef] to-[#8b4fff] shadow-[0_7px_18px_rgba(99,56,239,0.25)]"
                        : "bg-[#cbd0db] dark:bg-[#393544]"
                    }
                  `}
                >
                  <span
                    className={`
                      block
                      h-5
                      w-5
                      shrink-0
                      rounded-full
                      bg-white
                      shadow-md
                      transition-transform
                      duration-300
                      ${
                        whatsappEnabled
                          ? "translate-x-5"
                          : "translate-x-0"
                      }
                    `}
                  />
                </button>

              </div>

              {whatsappEnabled && (
                <div
                  className={`
                    mt-5
                    flex
                    items-center
                    justify-between
                    rounded-[17px]
                    border
                    p-3.5
                    ${
                      whatsappConnected
                        ? "border-[#c9f2df] bg-[#f0fff8] dark:border-emerald-500/10 dark:bg-emerald-500/5"
                        : "border-[#ffd3d8] bg-[#fff7f8] dark:border-rose-500/10 dark:bg-rose-500/5"
                    }
                  `}
                >

                  <div className="flex min-w-0 items-center gap-3">

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-[14px]
                        bg-[#10c77a]
                        shadow-[0_10px_25px_rgba(16,199,122,0.25)]
                      "
                    >
                      <FaWhatsapp
                        size={23}
                        className="text-white"
                      />
                    </div>

                    <div className="min-w-0">

                      <p
                        className="
                          truncate
                          text-[10px]
                          font-black
                          text-[#202a3d]
                          dark:text-white
                        "
                      >
                        {loadingWhatsapp
                          ? "Checking WhatsApp..."
                          : whatsappConnected
                          ? "WhatsApp is Connected"
                          : "WhatsApp is Disconnected"}
                      </p>

                      <p
                        className="
                          mt-1
                          truncate
                          text-[8px]
                          font-semibold
                          text-[#7d879d]
                          dark:text-[#8790a3]
                        "
                      >
                        {whatsappConnected
                          ? whatsappPhone
                          : "Connect WhatsApp to receive birthday reminders."}
                      </p>

                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (whatsappConnected) {
                        setWhatsappConnected(
                          false
                        );
                        setWhatsappPhone("");
                      } else {
                        setShowWhatsAppConnect(
                          true
                        );
                      }
                    }}
                    className={`
                      ml-3
                      shrink-0
                      rounded-[12px]
                      px-4
                      py-2.5
                      text-[8px]
                      font-black
                      shadow-[0_8px_20px_rgba(99,56,239,0.18)]
                      transition-all
                      hover:-translate-y-0.5
                      ${
                        whatsappConnected
                          ? "border border-[#ff9da9] bg-white text-[#ec4561] dark:border-rose-500/20 dark:bg-white/5"
                          : "bg-gradient-to-r from-[#6638ef] to-[#8144ff] text-white"
                      }
                    `}
                  >
                    {whatsappConnected
                      ? "Disconnect"
                      : "Connect"}
                  </button>

                </div>
              )}

              {!whatsappEnabled && (
                <div
                  className="
                    mt-5
                    rounded-[17px]
                    border
                    border-[#e5e7ef]
                    bg-white/70
                    p-4
                    dark:border-white/10
                    dark:bg-white/[0.03]
                  "
                >
                  <p
                    className="
                      text-[9px]
                      font-bold
                      text-[#7d879d]
                      dark:text-[#8d96aa]
                    "
                  >
                    WhatsApp birthday reminders are
                    currently turned off.
                  </p>
                </div>
              )}

              <div
                className="
                  mt-3
                  flex
                  items-center
                  justify-between
                  rounded-[17px]
                  border
                  border-white/80
                  bg-white/70
                  p-3
                  shadow-[0_10px_25px_rgba(45,100,75,0.05)]
                  backdrop-blur-xl
                  dark:border-white/10
                  dark:bg-white/[0.035]
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-[11px]
                      bg-[#fff0df]
                      text-[#f49a2e]
                    "
                  >
                    <BellRing size={17} />
                  </div>

                  <div>
                    <p
                      className="
                        text-[9px]
                        font-black
                        text-[#263047]
                        dark:text-white
                      "
                    >
                      Send Birthday Reminders
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-[7px]
                        font-semibold
                        text-[#8992a6]
                      "
                    >
                      Receive automatic birthday reminders.
                    </p>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setWhatsappEnabled(
                      (prev) => !prev
                    )
                  }
                  className={`
                    relative
                    flex
                    h-7
                    w-12
                    shrink-0
                    items-center
                    overflow-hidden
                    rounded-full
                    p-1
                    transition-all
                    duration-300
                    ${
                      whatsappEnabled
                        ? "bg-gradient-to-r from-[#6338ef] to-[#8b4fff]"
                        : "bg-[#cbd0db] dark:bg-[#393544]"
                    }
                  `}
                >
                  <span
                    className={`
                      block
                      h-5
                      w-5
                      rounded-full
                      bg-white
                      shadow-md
                      transition-transform
                      duration-300
                      ${
                        whatsappEnabled
                          ? "translate-x-5"
                          : "translate-x-0"
                      }
                    `}
                  />
                </button>

              </div>

            </div>
          </div>

          {/* ==================================================
              REMINDER TIME
          ================================================== */}

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[25px]
              border
              border-white/90
              bg-gradient-to-br
              from-white
              via-[#f8fbff]
              to-[#eaf3ff]
              p-5
              shadow-[0_22px_60px_rgba(45,80,150,0.10)]
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-1
              dark:border-white/10
              dark:from-[#111722]
              dark:via-[#111823]
              dark:to-[#101e30]
            "
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[#5798ff]/15 blur-3xl" />

            <div className="pointer-events-none absolute right-6 top-4 opacity-[0.09]">
              <Clock3
                size={110}
                className="text-[#317df0] dark:text-[#5c9dff]"
              />
            </div>

            <div className="relative z-10">

              <SectionTitle
                icon={Clock3}
                title="Reminder Time"
                subtitle="Set the time to send daily birthday reminders."
                iconBg="bg-[#e4f0ff] dark:bg-blue-500/10"
                iconColor="text-[#2679ed] dark:text-[#62a4ff]"
              />

              <div className="mt-6">

                <label
                  className="
                    mb-2
                    block
                    text-[8px]
                    font-black
                    uppercase
                    tracking-[0.5px]
                    text-[#59647d]
                    dark:text-[#aab4c8]
                  "
                >
                  Reminder Time
                </label>

                <div className="relative">

                  <Clock3
                    size={15}
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      top-1/2
                      z-10
                      -translate-y-1/2
                      text-[#687590]
                      dark:text-[#9ca9c0]
                    "
                  />

                  <select
                    value={reminderTime}
                    disabled={
                      updatingReminder
                    }
                    onChange={(e) =>
                      updateReminderSettings(
                        e.target.value
                      )
                    }
                    className="
                      h-[50px]
                      w-full
                      appearance-none
                      rounded-[15px]
                      border
                      border-[#dce2ed]
                      bg-white
                      pl-11
                      pr-11
                      text-[10px]
                      font-black
                      text-[#303b54]
                      outline-none
                      transition-all
                      focus:border-[#7040ee]
                      focus:ring-4
                      focus:ring-[#7040ee]/10
                      dark:border-[#302b40]
                      dark:bg-[#171522]
                      dark:text-[#e5e7ef]
                      [&>option]:bg-white
                      [&>option]:text-[#303b54]
                      dark:[&>option]:bg-[#171522]
                      dark:[&>option]:text-white
                    "
                  >
                    <option value="06:00">
                      6:00 AM
                    </option>

                    <option value="07:00">
                      7:00 AM
                    </option>

                    <option value="08:00">
                      8:00 AM
                    </option>

                    <option value="09:00">
                      9:00 AM
                    </option>

                    <option value="10:00">
                      10:00 AM
                    </option>

                    <option value="11:00">
                      11:00 AM
                    </option>

                    <option value="12:00">
                      12:00 PM
                    </option>

                    <option value="13:00">
                      1:00 PM
                    </option>

                    <option value="14:00">
                      2:00 PM
                    </option>

                    <option value="15:00">
                      3:00 PM
                    </option>

                    <option value="16:00">
                      4:00 PM
                    </option>

                    <option value="17:00">
                      5:00 PM
                    </option>

                    <option value="18:00">
                      6:00 PM
                    </option>

                    <option value="19:00">
                      7:00 PM
                    </option>

                    <option value="20:00">
                      8:00 PM
                    </option>

                    <option value="21:00">
                      9:00 PM
                    </option>

                    <option value="22:00">
                      10:00 PM
                    </option>

                    <option value="23:00">
                      11:00 PM
                    </option>
                  </select>

                  <ChevronDown
                    size={18}
                    className="
                      pointer-events-none
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-[#66728d]
                      dark:text-[#9ca7bc]
                    "
                  />

                </div>

                <div
                  className="
                    mt-4
                    flex
                    items-start
                    gap-3
                    rounded-[15px]
                    border
                    border-[#dce7fa]
                    bg-[#edf5ff]
                    px-3
                    py-3
                    dark:border-blue-500/10
                    dark:bg-blue-500/5
                  "
                >
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-[11px]
                      bg-white
                      text-[#2679ed]
                      shadow-sm
                      dark:bg-[#192235]
                      dark:text-[#67a6ff]
                    "
                  >
                    <Info size={16} />
                  </div>

                  <p
                    className="
                      text-[8px]
                      font-semibold
                      leading-4
                      text-[#63708c]
                      dark:text-[#9da9be]
                    "
                  >
                    You will receive a daily reminder
                    at{" "}
                    <span
                      className="
                        font-black
                        text-[#315b9d]
                        dark:text-[#78aaff]
                      "
                    >
                      {formattedReminderTime}
                    </span>
                    <br />
                    for upcoming birthdays.
                  </p>
                </div>

                {updatingReminder && (
                  <p
                    className="
                      mt-2
                      text-[8px]
                      font-bold
                      text-[#7040ee]
                      dark:text-[#a985ff]
                    "
                  >
                    Updating reminder time...
                  </p>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ======================================================
          WHATSAPP CONNECT MODAL
      ====================================================== */}

      {showWhatsAppConnect && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-[#151329]/45
            px-4
            backdrop-blur-sm
          "
        >
          <div
            className="
              relative
              w-full
              max-w-[410px]
              overflow-hidden
              rounded-[28px]
              border
              border-white/80
              bg-white
              p-6
              shadow-[0_35px_90px_rgba(30,20,80,0.30)]
              dark:border-white/10
              dark:bg-[#171923]
            "
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#38d78b]/15 blur-3xl" />

            <div className="relative z-10">

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-[16px]
                    bg-[#dcf8eb]
                    text-[#08b879]
                    shadow-[0_10px_25px_rgba(8,184,121,0.14)]
                    dark:bg-emerald-500/10
                  "
                >
                  <FaWhatsapp size={25} />
                </div>

                <div>
                  <h2
                    className="
                      text-[15px]
                      font-black
                      text-[#202640]
                      dark:text-white
                    "
                  >
                    Connect your WhatsApp
                  </h2>

                  <p
                    className="
                      mt-1
                      text-[8px]
                      font-semibold
                      text-[#8a94a9]
                      dark:text-[#858da0]
                    "
                  >
                    Connect your number to receive
                    birthday reminders.
                  </p>
                </div>

              </div>

              <div className="mt-6">

                <label
                  className="
                    mb-2
                    block
                    text-[9px]
                    font-black
                    text-[#4d5871]
                    dark:text-[#b4bccd]
                  "
                >
                  WhatsApp Number
                </label>

                <div className="relative">

                  <Phone
                    size={14}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-[#8a94a8]
                    "
                  />

                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(
                        e.target.value
                      )
                    }
                    placeholder="+919876543210"
                    className="
                      h-[46px]
                      w-full
                      rounded-[13px]
                      border
                      border-[#dfe3ed]
                      bg-[#fafaff]
                      pl-11
                      pr-4
                      text-[9px]
                      font-semibold
                      text-[#4f5972]
                      outline-none
                      transition
                      focus:border-[#6f3bf0]
                      focus:ring-4
                      focus:ring-[#6f3bf0]/10
                      dark:border-white/10
                      dark:bg-white/[0.04]
                      dark:text-white
                    "
                  />

                </div>
              </div>

              <div className="mt-4">

                <label
                  className="
                    mb-2
                    block
                    text-[9px]
                    font-black
                    text-[#4d5871]
                    dark:text-[#b4bccd]
                  "
                >
                  Confirm WhatsApp Number
                </label>

                <div className="relative">

                  <Check
                    size={14}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-[#8a94a8]
                    "
                  />

                  <input
                    type="text"
                    value={
                      confirmPhoneNumber
                    }
                    onChange={(e) =>
                      setConfirmPhoneNumber(
                        e.target.value
                      )
                    }
                    placeholder="+919876543210"
                    className="
                      h-[46px]
                      w-full
                      rounded-[13px]
                      border
                      border-[#dfe3ed]
                      bg-[#fafaff]
                      pl-11
                      pr-4
                      text-[9px]
                      font-semibold
                      text-[#4f5972]
                      outline-none
                      transition
                      focus:border-[#6f3bf0]
                      focus:ring-4
                      focus:ring-[#6f3bf0]/10
                      dark:border-white/10
                      dark:bg-white/[0.04]
                      dark:text-white
                    "
                  />

                </div>
              </div>

              {whatsappError && (
                <div
                  className="
                    mt-3
                    rounded-[12px]
                    border
                    border-rose-100
                    bg-rose-50
                    px-3
                    py-2
                    dark:border-rose-500/10
                    dark:bg-rose-500/5
                  "
                >
                  <p className="text-[8px] font-bold text-rose-500">
                    {whatsappError}
                  </p>
                </div>
              )}

              <div className="mt-6 flex gap-2">

                <button
                  type="button"
                  onClick={() => {
                    setShowWhatsAppConnect(
                      false
                    );
                    setWhatsappError("");
                    setPhoneNumber("");
                    setConfirmPhoneNumber("");
                  }}
                  className="
                    h-[45px]
                    flex-1
                    rounded-[13px]
                    border
                    border-[#dfe2eb]
                    bg-white
                    text-[9px]
                    font-black
                    text-[#69748c]
                    transition
                    hover:bg-[#f7f7fb]
                    dark:border-white/10
                    dark:bg-white/5
                    dark:text-[#aeb5c5]
                  "
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={
                    handleConnectWhatsApp
                  }
                  disabled={
                    connectingWhatsapp
                  }
                  className="
                    h-[45px]
                    flex-1
                    rounded-[13px]
                    bg-gradient-to-r
                    from-[#6638ef]
                    to-[#8144ff]
                    text-[9px]
                    font-black
                    text-white
                    shadow-[0_12px_25px_rgba(99,56,239,0.24)]
                    transition
                    hover:-translate-y-0.5
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {connectingWhatsapp
                    ? "Connecting..."
                    : "Connect WhatsApp"}
                </button>

              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// SECTION TITLE
// ============================================================

function SectionTitle({
  icon: Icon,
  title,
  subtitle,
  iconBg,
  iconColor,
}) {
  return (
    <div className="flex items-center gap-3">

      <div
        className={`
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-[16px]
          shadow-[0_10px_25px_rgba(50,50,100,0.06)]
          ${iconBg}
        `}
      >
        <Icon
          size={22}
          className={iconColor}
        />
      </div>

      <div>
        <h2
          className="
            text-[13px]
            font-black
            text-[#202640]
            dark:text-white
            sm:text-[14px]
          "
        >
          {title}
        </h2>

        <p
          className="
            mt-1
            text-[8px]
            font-semibold
            text-[#858ea3]
            dark:text-[#858da0]
            sm:text-[9px]
          "
        >
          {subtitle}
        </p>
      </div>

    </div>
  );
}

// ============================================================
// ACCOUNT INPUT
// ============================================================

function AccountInput({
  icon: Icon,
  label,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div>

      <label
        className="
          mb-1.5
          block
          text-[8px]
          font-black
          text-[#59637c]
          dark:text-[#aab2c3]
        "
      >
        {label}
      </label>

      <div className="relative">

        <Icon
          size={15}
          className="
            pointer-events-none
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-[#65718d]
            dark:text-[#8f9ab2]
          "
        />

        <input
          type={type}
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="
            h-[48px]
            w-full
            rounded-[14px]
            border
            border-[#dfe3ed]
            bg-white/80
            pl-11
            pr-4
            text-[9px]
            font-bold
            text-[#4e5871]
            outline-none
            transition
            focus:border-[#7540ef]
            focus:ring-4
            focus:ring-[#7540ef]/10
            dark:border-white/10
            dark:bg-white/[0.04]
            dark:text-[#d2d6e0]
          "
        />

      </div>
    </div>
  );
}

// ============================================================
// PASSWORD INPUT
// ============================================================

function PasswordInput({
  label,
  placeholder,
  value,
  onChange,
  visible,
  onToggle,
}) {
  return (
    <div>

      <label
        className="
          mb-1.5
          block
          text-[8px]
          font-black
          text-[#59637c]
          dark:text-[#aab2c3]
        "
      >
        {label}
      </label>

      <div className="relative">

        {/* Lock Icon */}

        <LockKeyhole
          size={14}
          className="
            pointer-events-none
            absolute
            left-4
            top-1/2
            z-10
            -translate-y-1/2
            text-[#73809b]
            dark:text-[#929bb0]
          "
        />

        {/* Password Input */}

        <input
          type={
            visible
              ? "text"
              : "password"
          }
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder={placeholder}
          className="
            h-[48px]
            w-full
            rounded-[14px]
            border
            border-[#dfe3ed]
            bg-white/80
            pl-11
            pr-12
            text-[9px]
            font-semibold
            text-[#4f5972]
            outline-none
            transition-all
            placeholder:text-[#a1a9b8]
            focus:border-[#7540ef]
            focus:ring-4
            focus:ring-[#7540ef]/10
            dark:border-white/10
            dark:bg-white/[0.04]
            dark:text-white
            dark:placeholder:text-[#697184]
          "
        />

        {/* EYE BUTTON */}

        <button
          type="button"
          aria-label={
            visible
              ? `Hide ${label}`
              : `Show ${label}`
          }
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggle();
          }}
          className="
            absolute
            right-3
            top-1/2
            z-30
            flex
            h-8
            w-8
            -translate-y-1/2
            cursor-pointer
            items-center
            justify-center
            rounded-[9px]
            bg-transparent
            text-[#7b849a]
            transition-all
            hover:bg-[#f2effa]
            hover:text-[#6338ef]
            active:scale-95
            dark:text-[#929aaa]
            dark:hover:bg-white/5
            dark:hover:text-[#a985ff]
          "
        >
          {visible ? (
            <EyeOff
              size={16}
              strokeWidth={2.2}
            />
          ) : (
            <Eye
              size={16}
              strokeWidth={2.2}
            />
          )}
        </button>

      </div>
    </div>
  );
}

// ============================================================
// MESSAGE BOX
// ============================================================

function MessageBox({
  type,
  message,
}) {
  const isSuccess =
    type === "success";

  return (
    <div
      className={`
        mt-3
        rounded-[13px]
        border
        px-3
        py-2.5

        ${
          isSuccess
            ? "border-emerald-100 bg-emerald-50 dark:border-emerald-500/10 dark:bg-emerald-500/5"
            : "border-rose-100 bg-rose-50 dark:border-rose-500/10 dark:bg-rose-500/5"
        }
      `}
    >
      <div className="flex items-center gap-2">

        {isSuccess ? (
          <Check
            size={13}
            className="text-emerald-500"
          />
        ) : (
          <Info
            size={13}
            className="text-rose-500"
          />
        )}

        <p
          className={`
            text-[8px]
            font-bold
            ${
              isSuccess
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-rose-500 dark:text-rose-400"
            }
          `}
        >
          {message}
        </p>

      </div>
    </div>
  );
}

export default Settings;