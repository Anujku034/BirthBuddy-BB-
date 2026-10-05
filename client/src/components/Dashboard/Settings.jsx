import React, { useState, useEffect, useContext } from "react";
import {
  Clock3,
  RotateCcw,
  Info,
  MessageSquareText,
  Upload,
  Download,
  Trash2,
  UserRound,
  LockKeyhole,
  Moon,
  Sun,
  Monitor,
  LogOut,
  Eye,
  EyeOff,
  Check,
  Settings as SettingsIcon,
  Users,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import settingsHero from "../../assets/dashboard/settingsHero.png";

function Settings() {
  const [showPassword, setShowPassword] = useState({
    current: false,
    newPassword: false,
    confirm: false,
  });

  const { accessToken,setAccessToken } = useContext(AuthContext);

  // ================= WHATSAPP =================

  const [whatsappConnected, setWhatsappConnected] = useState(false);
  const [whatsappPhone, setWhatsappPhone] = useState("");
  const [loadingWhatsapp, setLoadingWhatsapp] = useState(true);

  const [showWhatsAppConnect, setShowWhatsAppConnect] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPhoneNumber, setConfirmPhoneNumber] = useState("");

  const [whatsappError, setWhatsappError] = useState("");
  const [connectingWhatsapp, setConnectingWhatsapp] = useState(false);

  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const[reminderTime, setReminderTime] = useState("09:00");

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/refresh",
        {},
        {
          withCredentials: true,
        }
      );

      const newAccessToken = response.data.accessToken;

      setAccessToken(newAccessToken);

      return newAccessToken;
    } catch (error) {
      console.error("REFRESH TOKEN ERROR:", error);

      setAccessToken(null);

      alert("Session expired. Please login again.");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

      return null;
    }
  };
  const handleConnectWhatsApp = async () => {
    setWhatsappError("");

    if (!phoneNumber || !confirmPhoneNumber) {
      setWhatsappError(
        "Please enter and confirm your WhatsApp number."
      );
      return;
    }

    if (phoneNumber !== confirmPhoneNumber) {
      setWhatsappError("WhatsApp numbers do not match.");
      return;
    }

    try {
      setConnectingWhatsapp(true);

      const response = await axios.post(
        "http://localhost:3000/api/connect-whatsapp",
        {
          phoneNumber,
          confirmPhoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setWhatsappConnected(true);

      setWhatsappPhone(
        response.data?.whatsapp?.phoneNumber || phoneNumber
      );

      setPhoneNumber("");
      setConfirmPhoneNumber("");
      setWhatsappError("");
      setShowWhatsAppConnect(false);
    } catch (error) {
      console.error("CONNECT WHATSAPP ERROR:", error);
      if(error.response?.status === 401){
        refreshAccessToken();
      }
      setWhatsappError(
        error.response?.data?.message ||
          "Failed to connect WhatsApp."
      );
    } finally {
      setConnectingWhatsapp(false);
    }
  };

  // ================= GET WHATSAPP STATUS =================

  const getWhatsAppStatus = async () => {
    try {
      setLoadingWhatsapp(true);

      const response = await axios.get(
        "http://localhost:3000/api/whatsapp-status",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setWhatsappConnected(
        response.data?.connected || false
      );

      setWhatsappPhone(
        response.data?.phoneNumber || ""
      );
    } catch (error) {
      console.error(
        "GET WHATSAPP STATUS ERROR:",
        error
      );

      setWhatsappConnected(false);
      setWhatsappPhone("");
    } finally {
      setLoadingWhatsapp(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getWhatsAppStatus();
      getReminderSettings();
    }
  }, [accessToken]);
  const getReminderSettings = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/reminder-settings",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    setReminderTime(response.data.reminderTime || "09:00");
  } catch (error) {
    console.error("GET REMINDER SETTINGS ERROR:", error);
  }
  };
  const updateReminderSettings = async (time) => {
  try {
    await axios.put(
      "http://localhost:3000/api/reminder-settings",
      {
        reminderTime: time,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    setReminderTime(time);
  } catch (error) {
    console.error("UPDATE REMINDER SETTINGS ERROR:", error);
    if(error.response?.status === 401){
      refreshAccessToken();

    }
    try{
      await axios.put(
      "http://localhost:3000/api/reminder-settings",
      {
        reminderTime: time,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    setReminderTime(time);
    }catch(error){
      console.error("Refresh token expire");
      setTimeout(() => {
        Navigate("/login");
      },1500)
    }

  }
  };

  // ================= UI =================

  return (
    <div className="min-h-screen bg-[#f7f8ff] px-3 py-4 sm:px-5 lg:px-7">
      <div className="mx-auto max-w-[1500px]">

        {/* ================= HEADER ================= */}

        <section className="relative mb-4 h-[150px] overflow-hidden rounded-[18px] border border-white bg-gradient-to-r from-[#faf8ff] via-[#f6efff] to-[#eee7ff] shadow-[0_8px_30px_rgba(73,45,150,0.07)]">

          <div className="absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[#dfcaff]/40 blur-3xl" />

          <div className="absolute right-[30%] -top-20 h-52 w-52 rounded-full bg-[#f6d1ff]/40 blur-3xl" />

          <div className="relative z-10 px-5 pt-5 sm:px-7">
            <div className="flex items-center gap-2">

              <h1 className="text-[27px] font-extrabold tracking-[-0.8px] text-[#101631] sm:text-[32px]">
                Settings
              </h1>

              <SettingsIcon
                size={29}
                strokeWidth={2.5}
                className="text-[#6338ef]"
              />

            </div>

            <p className="mt-0.5 text-[11px] font-medium text-[#78829c] sm:text-[13px]">
              Customize your experience and make BirthDayBuddy work the way you want.
            </p>
          </div>

          <img
            src={settingsHero}
            alt="Settings"
            className="absolute bottom-[-10px] right-[3%] hidden h-[155px] w-auto object-contain md:block"
          />
        </section>

        {/* ================= TOP SETTINGS ================= */}

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">

          {/* ================= WHATSAPP ================= */}

          <div className="rounded-[10px] border border-[#e6e8f0] bg-white p-3 shadow-[0_5px_20px_rgba(35,45,90,0.04)]">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-[#dcf8eb]">
                  <FaWhatsapp
                    size={18}
                    className="text-[#09b879]"
                  />
                </div>

                <div>
                  <h2 className="text-[11px] font-extrabold text-[#1b213b]">
                    WhatsApp Notifications
                  </h2>

                  <p className="text-[8px] text-[#7d87a0]">
                    Get automatic birthday reminders on WhatsApp.
                  </p>
                </div>

              </div>
                <button
                  type="button"
                  onClick={() => setWhatsappEnabled(!whatsappEnabled)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    whatsappEnabled ? "bg-purple-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      whatsappEnabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
            </div>

            <div
              className={`mt-3 flex items-center justify-between rounded-[7px] px-3 py-2 ${
                whatsappConnected
                  ? "bg-[#effbf6]"
                  : "bg-[#fff4f4]"
              }`}
            >
              {whatsappEnabled && (
                <>
                  {/* Left side: Icon + Text */}
                  <div className="flex items-center gap-2">
                    <div className="flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded-full bg-[#16c784]">
                      <FaWhatsapp
                        size={16}
                        className="text-white"
                      />
                    </div>

                  <div>
                    <p className="text-[9px] font-bold text-[#27304a]">
                      {loadingWhatsapp
                        ? "Checking WhatsApp..."
                        : whatsappConnected
                        ? "WhatsApp is Connected"
                        : "WhatsApp is Disconnected"}
                    </p>

                    <p className="text-[7px] text-[#7b869d]">
                      {whatsappConnected
                        ? whatsappPhone
                        : "Connect WhatsApp to receive birthday reminders."}
                    </p>
                  </div>
                </div>
                  {/* Right side: Connect Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (whatsappConnected) {
                        setWhatsappConnected(false);
                        setWhatsappPhone("");
                      } else {
                        setShowWhatsAppConnect(true);
                      }
                    }}
                    className="ml-6 shrink-0 rounded-[6px] border border-[#9a7aff] bg-white px-3 py-1.5 text-[8px] font-bold text-[#6338ef] transition hover:bg-[#f5f1ff]"
                  >
                    {whatsappConnected ? "Disconnect" : "Connect"}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* ================= REMINDER TIME ================= */}

          <div className="rounded-[10px] border border-[#e6e8f0] bg-white p-3 shadow-[0_5px_20px_rgba(35,45,90,0.04)]">

            <SectionTitle
              icon={Clock3}
              title="Reminder Time"
              subtitle="Set the time to send daily birthday reminders."
              iconBg="bg-[#eee9ff]"
              iconColor="text-[#6338ef]"
            />

            <label className="mb-1 block text-[8px] font-bold text-[#505b76]">
              Reminder Time
            </label>

            <div className="relative">

              <Clock3
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#68738f]"
              />

              <select
               value={reminderTime}
               onChange={(e) => updateReminderSettings(e.target.value)}
               className="h-[31px] w-full appearance-none rounded-[6px] border border-[#dfe2eb] bg-white pl-9 pr-8 text-[9px] font-semibold text-[#515c77] outline-none">
                <option value="00:00">12:00 AM</option>
                <option value="01:00">1:00 AM</option>
                <option value="02:00">2:00 AM</option>
                <option value="03:00">3:00 AM</option>
                <option value="04:00">4:00 AM</option>
                <option value="05:00">5:00 AM</option>
                <option value="06:00">6:00 AM</option>
                <option value="07:00">7:00 AM</option>
                <option value="08:00">8:00 AM</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:30">5:30 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="20:00">8:00 PM</option>
                <option value="20:00">9:00 PM</option>
              </select>

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#65708a]">
                ▼
              </span>

            </div>

            <div className="mt-2 flex items-start gap-2 rounded-[6px] bg-[#f2f5fb] px-3 py-2">

              <Info
                size={12}
                className="mt-0.5 shrink-0 text-[#55718e]"
              />

              <p className="text-[7px] leading-3 text-[#68738e]">
                You will receive a daily reminder at{" "}
                  {new Date(`1970-01-01T${reminderTime}`).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                <br />
                for upcoming birthdays.
              </p>

            </div>
          </div>
        </div>

        {/* ================= MESSAGE + CONTACTS ================= */}

        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">

          {/* MESSAGE TEMPLATE */}

          <div className="rounded-[10px] border border-[#e6e8f0] bg-white p-3 shadow-[0_5px_20px_rgba(35,45,90,0.04)]">

            <div className="flex items-center justify-between">

              <SectionTitle
                icon={MessageSquareText}
                title="Default Message Template"
                subtitle="Customize your default birthday message."
                iconBg="bg-[#eee9ff]"
                iconColor="text-[#6338ef]"
              />

              <button
                type="button"
                className="flex items-center gap-1 text-[8px] font-bold text-[#6338ef]"
              >
                <RotateCcw size={11} />
                Reset
              </button>

            </div>

            <textarea
              defaultValue={`Happy birthday, (name)! 🎉

Wishing you a wonderful year ahead! 🎂

May your day be filled with happiness, love and success! ❤️`}
              rows={4}
              className="mt-2 h-[79px] w-full resize-none rounded-[6px] border border-[#dfe2eb] bg-white px-3 py-2 text-[9px] leading-[16px] text-[#59637d] outline-none focus:border-[#8060ef] focus:ring-2 focus:ring-[#8060ef]/10"
            />

            <div className="mt-1 flex items-center justify-between">

              <p className="text-[7px] text-[#8790a6]">
                Use <b>(name)</b> to automatically insert the person's name.
              </p>

              <p className="text-[7px] text-[#8790a6]">
                Characters: 124/500
              </p>

            </div>
          </div>

          {/* MANAGE CONTACTS */}

          <div className="rounded-[10px] border border-[#e6e8f0] bg-white p-3 shadow-[0_5px_20px_rgba(35,45,90,0.04)]">

            <SectionTitle
              icon={Users}
              title="Manage Contacts"
              subtitle="Import, export or manage your contacts."
              iconBg="bg-[#e5f1ff]"
              iconColor="text-[#3686dc]"
            />

            <div className="mt-3 space-y-2">

              <SettingsAction
                icon={Upload}
                title="Import Contacts"
                subtitle="Import contacts from a CSV file."
                iconBg="bg-[#eee9ff]"
                iconColor="text-[#6338ef]"
              />

              <SettingsAction
                icon={Download}
                title="Export Contacts"
                subtitle="Download your contacts as a CSV file."
                iconBg="bg-[#e4faf2]"
                iconColor="text-[#08b879]"
              />

              <SettingsAction
                icon={Trash2}
                title="Delete All Contacts"
                subtitle="Permanently remove all contacts."
                iconBg="bg-[#ffe9ed]"
                iconColor="text-[#ef405b]"
                danger
              />

            </div>
          </div>
        </div>

        {/* ================= BOTTOM SETTINGS ================= */}

        <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-3">

          {/* ACCOUNT */}

          <div className="rounded-[10px] border border-[#e6e8f0] bg-white p-3 shadow-[0_5px_20px_rgba(35,45,90,0.04)]">

            <SectionTitle
              icon={UserRound}
              title="Account Settings"
              subtitle="Update your profile information."
              iconBg="bg-[#ffe8ef]"
              iconColor="text-[#f03f65]"
            />

            <div className="mt-3 flex items-center gap-3">

              <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#dbe5ef] to-[#bfcbdc]">
                <UserRound
                  size={27}
                  className="text-[#65728b]"
                />
              </div>

              <div className="flex-1 space-y-1.5">

                <InputRow
                  label="Full Name"
                  value="Anuj Kumar"
                />

                <InputRow
                  label="Email Address"
                  value="anujku034@example.com"
                />

              </div>
            </div>

            <button
              type="button"
              className="mt-2 h-[28px] w-full rounded-[6px] border border-[#7753f5] bg-white text-[8px] font-bold text-[#6338ef] transition hover:bg-[#f7f3ff]"
            >
              Update Profile
            </button>

          </div>

          {/* CHANGE PASSWORD */}

          <div className="rounded-[10px] border border-[#e6e8f0] bg-white p-3 shadow-[0_5px_20px_rgba(35,45,90,0.04)]">

            <SectionTitle
              icon={LockKeyhole}
              title="Change Password"
              subtitle="Keep your account secure."
              iconBg="bg-[#fff0df]"
              iconColor="text-[#ef9b2f]"
            />

            <PasswordInput
              label="Current Password"
              placeholder="Enter current password"
              visible={showPassword.current}
              onToggle={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  current: !prev.current,
                }))
              }
            />

            <PasswordInput
              label="New Password"
              placeholder="Enter new password"
              visible={showPassword.newPassword}
              onToggle={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  newPassword: !prev.newPassword,
                }))
              }
            />

            <PasswordInput
              label="Confirm New Password"
              placeholder="Confirm new password"
              visible={showPassword.confirm}
              onToggle={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  confirm: !prev.confirm,
                }))
              }
            />

            <button
              type="button"
              className="mt-2 h-[29px] w-full rounded-[6px] bg-gradient-to-r from-[#6332ef] to-[#783cff] text-[8px] font-bold text-white shadow-[0_5px_12px_rgba(99,50,239,0.2)]"
            >
              Update Password
            </button>

          </div>

          {/* APPEARANCE + LOGOUT */}

          <div className="rounded-[10px] border border-[#e6e8f0] bg-white p-3 shadow-[0_5px_20px_rgba(35,45,90,0.04)]">

            <SectionTitle
              icon={Moon}
              title="Appearance"
              subtitle="Choose your preferred theme."
              iconBg="bg-[#eee9ff]"
              iconColor="text-[#6338ef]"
            />

            <div className="mt-3 grid grid-cols-3 gap-2">

              <ThemeButton
                icon={Sun}
                label="Light"
                active
              />

              <ThemeButton
                icon={Moon}
                label="Dark"
              />

              <ThemeButton
                icon={Monitor}
                label="System"
              />

            </div>

            <div className="mt-3 border-t border-[#edf0f5] pt-2">

              <div className="mb-2 flex items-center gap-2">

                <div className="flex h-[27px] w-[27px] items-center justify-center rounded-[8px] bg-[#ffe8ed]">
                  <LogOut
                    size={15}
                    className="text-[#ef405b]"
                  />
                </div>

                <div>
                  <h3 className="text-[10px] font-extrabold text-[#20263f]">
                    Logout
                  </h3>

                  <p className="text-[7px] text-[#7c86a0]">
                    Sign out from your account.
                  </p>
                </div>

              </div>

              <button
                type="button"
                className="flex h-[28px] w-full items-center justify-center gap-2 rounded-[6px] border border-[#ff9dad] bg-[#fff7f8] text-[8px] font-bold text-[#ef405b] transition hover:bg-[#ffecef]"
              >
                <LogOut size={12} />
                Logout
              </button>

            </div>
          </div>
        </div>

        {/* ================= CONNECT WHATSAPP MODAL ================= */}

        {showWhatsAppConnect && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

            <div className="w-full max-w-[380px] rounded-xl bg-white p-5 shadow-xl">

              <div className="flex items-center gap-3">

                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#dcf8eb]">
                  <FaWhatsapp
                    size={22}
                    className="text-[#09b879]"
                  />
                </div>

                <div>
                  <h2 className="text-[15px] font-bold text-[#252b45]">
                    Connect your WhatsApp
                  </h2>

                  <p className="text-[9px] text-[#8c95aa]">
                    Connect your number to receive birthday reminders.
                  </p>
                </div>

              </div>

              {/* WhatsApp Number */}

              <div className="mt-5">

                <label className="text-[9px] font-bold text-[#252b45]">
                  WhatsApp Number
                </label>

                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(e.target.value)
                  }
                  placeholder="+919876543210"
                  className="mt-1 w-full rounded-lg border border-[#e1e4eb] px-3 py-2 text-[10px] outline-none focus:border-[#6338ef]"
                />

              </div>

              {/* Confirm Number */}

              <div className="mt-3">

                <label className="text-[9px] font-bold text-[#252b45]">
                  Confirm WhatsApp Number
                </label>

                <input
                  type="text"
                  value={confirmPhoneNumber}
                  onChange={(e) =>
                    setConfirmPhoneNumber(e.target.value)
                  }
                  placeholder="+919876543210"
                  className="mt-1 w-full rounded-lg border border-[#e1e4eb] px-3 py-2 text-[10px] outline-none focus:border-[#6338ef]"
                />

              </div>

              {/* Error */}

              {whatsappError && (
                <p className="mt-3 text-[9px] font-semibold text-red-500">
                  {whatsappError}
                </p>
              )}

              {/* Buttons */}

              <div className="mt-5 flex justify-end gap-2">

                <button
                  type="button"
                  onClick={() => {
                    setShowWhatsAppConnect(false);
                    setWhatsappError("");
                    setPhoneNumber("");
                    setConfirmPhoneNumber("");
                  }}
                  className="rounded-lg border border-[#e1e4eb] px-4 py-2 text-[9px] font-bold text-[#68728a] hover:bg-[#f7f7fa]"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleConnectWhatsApp}
                  disabled={connectingWhatsapp}
                  className="rounded-lg bg-[#6338ef] px-4 py-2 text-[9px] font-bold text-white hover:bg-[#5630d8] disabled:opacity-60"
                >
                  {connectingWhatsapp
                    ? "Connecting..."
                    : "Connect"}
                </button>

              </div>
            </div>
          </div>
        )}
      </div>
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
    <div className="flex items-center gap-2">

      <div
        className={`flex h-[30px] w-[30px] items-center justify-center rounded-[8px] ${iconBg}`}
      >
        <Icon
          size={16}
          className={iconColor}
        />
      </div>

      <div>
        <h2 className="text-[11px] font-extrabold text-[#1b213b]">
          {title}
        </h2>

        <p className="text-[8px] text-[#7d87a0]">
          {subtitle}
        </p>
      </div>

    </div>
  );
}

// ============================================================
// SETTINGS ACTION
// ============================================================

function SettingsAction({
  icon: Icon,
  title,
  subtitle,
  iconBg,
  iconColor,
  danger = false,
}) {
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-2 rounded-[7px] p-2 text-left transition ${
        danger
          ? "hover:bg-[#fff5f6]"
          : "hover:bg-[#faf9ff]"
      }`}
    >
      <div
        className={`flex h-[30px] w-[30px] items-center justify-center rounded-[7px] ${iconBg}`}
      >
        <Icon
          size={15}
          className={iconColor}
        />
      </div>

      <div className="flex-1">
        <p className="text-[9px] font-bold text-[#252b45]">
          {title}
        </p>

        <p className="text-[7px] text-[#8790a6]">
          {subtitle}
        </p>
      </div>
    </button>
  );
}

// ============================================================
// INPUT ROW
// ============================================================

function InputRow({ label, value }) {
  return (
    <div>
      <label className="mb-0.5 block text-[7px] font-bold text-[#69748e]">
        {label}
      </label>

      <input
        type="text"
        value={value}
        readOnly
        className="h-[25px] w-full rounded-[5px] border border-[#e1e4eb] bg-[#fafbfe] px-2 text-[8px] text-[#4f5972] outline-none"
      />
    </div>
  );
}

// ============================================================
// PASSWORD INPUT
// ============================================================

function PasswordInput({
  label,
  placeholder,
  visible,
  onToggle,
}) {
  return (
    <div className="mt-2">

      <label className="mb-1 block text-[8px] font-bold text-[#505b76]">
        {label}
      </label>

      <div className="relative">

        <input
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          className="h-[29px] w-full rounded-[6px] border border-[#dfe2eb] bg-white px-3 pr-9 text-[8px] text-[#59637d] outline-none focus:border-[#8060ef]"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7b849a]"
        >
          {visible ? (
            <EyeOff size={13} />
          ) : (
            <Eye size={13} />
          )}
        </button>

      </div>
    </div>
  );
}

// ============================================================
// THEME BUTTON
// ============================================================

function ThemeButton({
  icon: Icon,
  label,
  active = false,
}) {
  return (
    <button
      type="button"
      className={`flex flex-col items-center justify-center gap-1 rounded-[7px] border p-2 ${
        active
          ? "border-[#8060ef] bg-[#f6f2ff]"
          : "border-[#e1e4eb] bg-white"
      }`}
    >
      <Icon
        size={14}
        className={
          active
            ? "text-[#6338ef]"
            : "text-[#7d87a0]"
        }
      />

      <span
        className={`text-[7px] font-bold ${
          active
            ? "text-[#6338ef]"
            : "text-[#7d87a0]"
        }`}
      >
        {label}
      </span>

      {active && (
        <Check
          size={10}
          className="text-[#6338ef]"
        />
      )}
    </button>
  );
}

export default Settings;