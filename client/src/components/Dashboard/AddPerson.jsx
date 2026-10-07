import React, { useState, useContext, useEffect } from "react";

import {
  Home,
  ChevronRight,
  UserRound,
  Phone,
  CalendarDays,
  Plus,
  Settings2,
  FileText,
  UploadCloud,
  ImagePlus,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Cake,
  Heart,
  ShieldCheck,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import addPersonHero from "../../assets/dashboard/addPersonHero.png";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../api/axiosInstance";
function AddPerson() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [existingPhoto, setExistingPhoto] = useState("");
  const [Notes, setNotes] = useState("");
  const [sendReminder, setSendReminder] = useState(false);
  const [customMessage, setCustomMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const { id } = useParams();

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (!profilePhoto) {
      setImagePreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(profilePhoto);
    setImagePreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [profilePhoto]);

  useEffect(() => {
    if (!id || !accessToken) return;

    const getPerson = async () => {
      try {
        const response = await axiosInstance.get(`/persons/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const person = response.data.person;

        setFullName(person.fullName || "");
        setPhoneNumber(person.phone || "");

        setDateOfBirth(
          person.dateOfBirth
            ? new Date(person.dateOfBirth).toISOString().split("T")[0]
            : ""
        );

        setNotes(person.notes || "");
        setSendReminder(person.sendWhatsAppReminder || false);
        setCustomMessage(person.customMessage || "");
        setExistingPhoto(person.profilePhoto || "");
      } catch (error) {
        console.log("GET PERSON ERROR:", error);

        if (error.response?.status === 401) {
          try {
            const refreshResponse = await axiosInstance.post(
              "/auth/refresh",
              {},
              {
                withCredentials: true,
              }
            );

            const newAccessToken = refreshResponse.data.accessToken;

            setAccessToken(newAccessToken);

            const retryResponse = await axiosInstance.get(
              `/persons/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              }
            );

            const person = retryResponse.data.person;

            setFullName(person.fullName || "");
            setPhoneNumber(person.phone || "");

            setDateOfBirth(
              person.dateOfBirth
                ? new Date(person.dateOfBirth).toISOString().split("T")[0]
                : ""
            );

            setNotes(person.notes || "");
            setSendReminder(person.sendWhatsAppReminder || false);
            setCustomMessage(person.customMessage || "");
            setExistingPhoto(person.profilePhoto || "");
          } catch (refreshError) {
            console.log("REFRESH TOKEN ERROR:", refreshError);

            if (refreshError.response?.status === 401) {
              setServerError("Session expired. Please login again.");

              setTimeout(() => {
                navigate("/login");
              }, 2000);
            }
          }
        }
      }
    };

    getPerson();
  }, [id, accessToken, navigate, setAccessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setServerError("");

    if (!fullName.trim()) {
      setServerError("Please enter the person's full name.");
      return;
    }

    if (!dateOfBirth) {
      setServerError("Please select the date of birth.");
      return;
    }

    const formData = new FormData();

    formData.append("fullName", fullName.trim());
    formData.append("phone", phoneNumber.trim());
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("notes", Notes.trim());
    formData.append("sendWhatsAppReminder", sendReminder);
    formData.append("customMessage", customMessage.trim());

    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }

    try {
      const response = isEditMode
        ? await axiosInstance.put(
            `/persons/${id}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
        : await axiosInstance.post(
            "/add-person",
            formData,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

      console.log(response.data);

      setSuccessMessage(
        isEditMode
          ? "Person updated successfully"
          : "Person added successfully"
      );

      setTimeout(() => {
        navigate("/dashboard/contacts");
      }, 1800);
    } catch (error) {
      console.log("SUBMIT ERROR:", error);

      if (error.response?.status === 401) {
        try {
          const refreshResponse = await axiosInstance.post(
            "/auth/refresh",
            {},
            {
              withCredentials: true,
            }
          );

          const newAccessToken = refreshResponse.data.accessToken;

          setAccessToken(newAccessToken);

          const retryResponse = isEditMode
            ? await axiosInstance.put(
                `/persons/${id}`,
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${newAccessToken}`,
                  },
                }
              )
            : await axiosInstance.post(
                "/add-person",
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${newAccessToken}`,
                  },
                }
              );

          console.log(retryResponse.data);

          setSuccessMessage(
            isEditMode
              ? "Person updated successfully"
              : "Person added successfully"
          );

          setTimeout(() => {
            navigate("/dashboard/contacts");
          }, 1800);
        } catch (refreshError) {
          console.log("REFRESH TOKEN ERROR:", refreshError);

          if (refreshError.response?.status === 401) {
            setServerError("Session expired. Please login again.");

            setTimeout(() => {
              navigate("/login");
            }, 2000);
          } else {
            setServerError(
              refreshError.response?.data?.message ||
                "Something went wrong. Please try again."
            );
          }
        }
      } else {
        setServerError(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/contacts");
  };

  return (
    <div className="min-h-screen bg-[#f6f7ff] px-3 py-3 text-[#151a35] transition-colors duration-500 sm:px-5 sm:py-5 lg:px-7 lg:py-6 dark:bg-[#0b0b12] dark:text-white">
      <div className="mx-auto max-w-[1550px]">

        {/* ================= TOP BREADCRUMB ================= */}
        <div className="mb-4 flex items-center gap-2 text-[11px] font-medium text-[#737d98] dark:text-[#9499ad] sm:text-[12px]">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/80 bg-white/80 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
            <Home size={14} />
          </div>

          <ChevronRight size={14} />

          <span className="font-semibold text-[#1b203b] dark:text-white">
            {isEditMode ? "Edit Person" : "Add Person"}
          </span>
        </div>

        {/* ================= PAGE HEADER ================= */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="hidden h-1.5 w-8 rounded-full bg-gradient-to-r from-[#6738ef] to-[#a56cff] sm:block" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7957e9] dark:text-[#a993ff]">
                {isEditMode ? "Update Contact" : "New Contact"}
              </span>
            </div>

            <h1 className="text-[30px] font-black leading-tight tracking-[-1.2px] text-[#101631] dark:text-white sm:text-[38px] lg:text-[42px]">
              {isEditMode ? "Edit Person" : "Add Person"}
            </h1>

            <p className="mt-1 text-[12px] font-medium text-[#7a849f] dark:text-[#9da2b7] sm:text-[13px]">
              {isEditMode
                ? "Keep their birthday details up to date and never miss their special day."
                : "Add a new contact and never miss their special day! 🎉"}
            </p>
          </div>

          {/* Small trust badge */}
          <div className="hidden items-center gap-2 self-start rounded-2xl border border-[#e7e2ff] bg-white/80 px-3 py-2 shadow-[0_8px_25px_rgba(84,55,170,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.05] sm:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#eee9ff] dark:bg-[#6b4de31f]">
              <ShieldCheck
                size={16}
                className="text-[#6337ef] dark:text-[#a994ff]"
              />
            </div>

            <div>
              <p className="text-[10px] font-extrabold text-[#272c46] dark:text-white">
                Your contacts are private
              </p>
              <p className="text-[8px] font-medium text-[#8991a7] dark:text-[#858a9f]">
                Securely stored in your account
              </p>
            </div>
          </div>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[390px_minmax(0,1fr)]">

          {/* ================= LEFT HERO CARD ================= */}
          <section className="group relative min-h-[390px] overflow-hidden rounded-[28px] border border-white/90 bg-gradient-to-br from-[#f8ecff] via-[#f5efff] to-[#eae5ff] shadow-[0_25px_70px_rgba(73,48,145,0.13)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_35px_90px_rgba(73,48,145,0.18)] dark:border-white/10 dark:from-[#211936] dark:via-[#17152a] dark:to-[#10111d] dark:shadow-[0_25px_70px_rgba(0,0,0,0.35)] sm:min-h-[520px] xl:sticky xl:top-24 xl:h-[calc(100vh-150px)] xl:max-h-[760px]">

            {/* Background blobs */}
            <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-[#dcb9ff]/50 blur-3xl transition-transform duration-700 group-hover:scale-125 dark:bg-[#7749ff]/15" />

            <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-[#ffc9e2]/50 blur-3xl transition-transform duration-700 group-hover:scale-125 dark:bg-[#ff6fae]/10" />

            <div className="absolute right-10 top-10 h-16 w-16 rounded-full border border-white/60 bg-white/20 blur-[1px] dark:border-white/10 dark:bg-white/5" />

            {/* Top floating badge */}
            <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/80 bg-white/55 px-3 py-2 shadow-[0_10px_30px_rgba(79,47,145,0.10)] backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#6938ef] text-white shadow-lg">
                <Sparkles size={12} />
              </div>

              <span className="text-[9px] font-extrabold text-[#40365f] dark:text-[#e5e0ff]">
                Make every birthday special
              </span>
            </div>

            {/* Illustration */}
            <div className="relative flex h-[390px] items-center justify-center px-5 pt-12 sm:h-[430px] sm:px-7 xl:h-[calc(100%-125px)]">
              <div className="absolute bottom-10 h-28 w-64 rounded-full bg-[#7c4dff]/10 blur-2xl dark:bg-[#8b5cff]/15" />

              <img
                src={addPersonHero}
                alt="Birthday celebration"
                className="relative z-[1] h-full w-full object-contain drop-shadow-[0_25px_28px_rgba(73,42,120,0.22)] transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-[1.03]"
              />

              {/* Floating decorative icons */}
              <div className="absolute left-8 top-28 flex h-9 w-9 rotate-[-12deg] items-center justify-center rounded-2xl border border-white/70 bg-white/60 text-[#f04b89] shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/10">
                <Heart size={17} fill="currentColor" />
              </div>

              <div className="absolute right-7 top-32 flex h-9 w-9 rotate-[12deg] items-center justify-center rounded-2xl border border-white/70 bg-white/60 text-[#7544ee] shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/10">
                <Cake size={17} />
              </div>
            </div>

            {/* Quote card */}
            <div className="absolute bottom-4 left-4 right-4 rounded-[22px] border border-white/70 bg-white/45 px-4 py-4 shadow-[0_15px_40px_rgba(70,45,130,0.10)] backdrop-blur-xl dark:border-white/10 dark:bg-black/20 sm:left-5 sm:right-5 sm:px-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6b3df0] to-[#9d69ff] text-white shadow-[0_8px_20px_rgba(105,59,240,0.30)]">
                  <Heart size={17} fill="currentColor" />
                </div>

                <div>
                  <p className="font-serif text-[13px] font-bold italic leading-5 text-[#343951] dark:text-[#e5e0f5] sm:text-[14px]">
                    A small reminder today can create a big smile tomorrow.
                  </p>

                  <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.15em] text-[#856de0] dark:text-[#aa96ff]">
                    BirthdayBuddy
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ================= RIGHT FORM ================= */}
          <section className="relative overflow-hidden rounded-[28px] border border-white/90 bg-white/95 p-4 shadow-[0_25px_70px_rgba(35,45,90,0.09)] backdrop-blur-xl transition-all duration-500 dark:border-white/10 dark:bg-[#11111a]/95 dark:shadow-[0_25px_70px_rgba(0,0,0,0.35)] sm:p-6 lg:p-7">

            {/* Top decorative gradient */}
            <div className="pointer-events-none absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-[#6534ed] via-[#9c61ff] to-[#e26bad]" />

            {/* Success */}
            {successMessage && (
              <div className="mb-5 flex items-center gap-3 rounded-2xl border border-[#b7ebd0] bg-[#ecfaf4] px-4 py-3 shadow-[0_10px_25px_rgba(32,201,120,0.08)] dark:border-emerald-500/20 dark:bg-emerald-500/10">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#20c978] text-white shadow-lg">
                  <CheckCircle2 size={18} />
                </div>

                <div>
                  <p className="text-[11px] font-extrabold text-[#168653] dark:text-emerald-400">
                    {successMessage}
                  </p>

                  <p className="mt-0.5 text-[9px] font-medium text-[#579174] dark:text-emerald-500/70">
                    Redirecting you to contacts...
                  </p>
                </div>
              </div>
            )}

            {/* Error */}
            {serverError && (
              <div className="mb-5 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 shadow-[0_10px_25px_rgba(239,68,68,0.07)] dark:border-red-500/20 dark:bg-red-500/10">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500 text-white shadow-lg">
                  <AlertCircle size={18} />
                </div>

                <div>
                  <p className="text-[11px] font-extrabold text-red-600 dark:text-red-400">
                    Something went wrong
                  </p>

                  <p className="mt-0.5 text-[9px] font-medium text-red-500/80 dark:text-red-400/70">
                    {serverError}
                  </p>
                </div>
              </div>
            )}

            {/* ================= PERSON DETAILS ================= */}
            <div className="mb-7">

              {/* Section heading */}
              <div className="mb-5 flex items-center gap-3">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#eee8ff] to-[#ddd3ff] shadow-[0_8px_20px_rgba(99,55,239,0.12)] dark:from-[#3a2b63] dark:to-[#292042]">
                  <UserRound
                    size={19}
                    strokeWidth={2.5}
                    className="text-[#6337ef] dark:text-[#a995ff]"
                  />

                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#6337ef] text-[8px] text-white shadow-md">
                    <Plus size={9} strokeWidth={3} />
                  </span>
                </div>

                <div>
                  <h2 className="text-[17px] font-black tracking-[-0.3px] text-[#151a35] dark:text-white">
                    Person Details
                  </h2>

                  <p className="mt-0.5 text-[10px] font-medium text-[#7a849d] dark:text-[#9297aa]">
                    Fill in the details to keep this contact in your birthday list.
                  </p>
                </div>
              </div>

              {/* Form fields */}
              <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">

                {/* Full Name */}
                <FormField
                  label="Full Name"
                  required
                  icon={UserRound}
                  placeholder="e.g. Rahul Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-[10px] font-extrabold text-[#252b45] dark:text-[#dfe1eb] sm:text-[11px]">
                    Phone Number{" "}
                    <span className="font-medium text-[#9299ad]">
                      (Optional)
                    </span>
                  </label>

                  <div className="group flex h-[46px] overflow-hidden rounded-xl border border-[#dfe2eb] bg-[#fbfcff] shadow-[inset_0_1px_2px_rgba(30,40,80,0.02)] transition-all focus-within:border-[#8060ef] focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(128,96,239,0.08)] dark:border-white/10 dark:bg-white/[0.035] dark:focus-within:bg-white/[0.05]">
                    <div className="flex items-center gap-1.5 border-r border-[#e6e8ef] px-3 text-[11px] font-bold text-[#4d5873] dark:border-white/10 dark:text-[#aeb3c4]">
                      <Phone size={14} />
                      +91
                    </div>

                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="9876543210"
                      className="min-w-0 flex-1 bg-transparent px-3 text-[12px] font-medium text-[#252b45] outline-none placeholder:text-[#a1a8ba] dark:text-white dark:placeholder:text-[#666b7e]"
                      value={phoneNumber}
                      onChange={(e) =>
                        setPhoneNumber(
                          e.target.value.replace(/\D/g, "").slice(0, 10)
                        )
                      }
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <FormField
                  label="Date of Birth"
                  required
                  icon={CalendarDays}
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />

                {/* Profile Photo */}
                <div>
                  <label className="mb-2 block text-[10px] font-extrabold text-[#252b45] dark:text-[#dfe1eb] sm:text-[11px]">
                    Profile Photo{" "}
                    <span className="font-medium text-[#9299ad]">
                      (Optional)
                    </span>
                  </label>

                  <label
                    htmlFor="profilePhoto"
                    className="group/upload relative flex min-h-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[#d6c9ff] bg-gradient-to-br from-[#fcfaff] to-[#f8f4ff] px-4 py-3 transition-all duration-300 hover:border-[#9675ff] hover:bg-[#f7f1ff] hover:shadow-[0_10px_30px_rgba(102,55,239,0.10)] dark:border-[#57477d] dark:from-[#181523] dark:to-[#16131f] dark:hover:border-[#8f70ff] dark:hover:bg-[#1d192a]"
                  >
                    {imagePreview ? (
                      <div className="flex w-full items-center gap-3">
                        <div className="relative shrink-0">
                          <img
                            src={imagePreview}
                            alt="Profile preview"
                            className="h-16 w-16 rounded-2xl border-2 border-white object-cover shadow-[0_8px_20px_rgba(55,35,110,0.18)] dark:border-white/10"
                          />

                          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#6337ef] text-white shadow-md">
                            <ImagePlus size={10} />
                          </span>
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-[11px] font-extrabold text-[#252b45] dark:text-white">
                            {profilePhoto?.name}
                          </p>

                          <p className="mt-1 text-[9px] font-medium text-[#8c95aa] dark:text-[#858a9e]">
                            Click to change photo
                          </p>
                        </div>
                      </div>
                    ) : existingPhoto ? (
                      <div className="flex w-full items-center gap-3">
                        <div className="relative shrink-0">
                          <img
                            src={existingPhoto}
                            alt="Profile preview"
                            className="h-16 w-16 rounded-2xl border-2 border-white object-cover shadow-[0_8px_20px_rgba(55,35,110,0.18)] dark:border-white/10"
                          />

                          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#6337ef] text-white shadow-md">
                            <ImagePlus size={10} />
                          </span>
                        </div>

                        <div>
                          <p className="text-[11px] font-extrabold text-[#252b45] dark:text-white">
                            Existing photo
                          </p>

                          <p className="mt-1 text-[9px] font-medium text-[#8c95aa] dark:text-[#858a9e]">
                            Click to replace photo
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e8e0ff] to-[#d8ccff] shadow-inner dark:from-[#322752] dark:to-[#292040]">
                          <UploadCloud
                            size={21}
                            className="text-[#6a40ed] dark:text-[#a58fff]"
                          />

                          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#6337ef] text-white shadow-md">
                            <Plus size={11} strokeWidth={3} />
                          </span>
                        </div>

                        <div>
                          <p className="text-[11px] font-extrabold text-[#252b45] dark:text-white">
                            Upload profile photo
                          </p>

                          <p className="mt-1 text-[9px] font-medium text-[#8c95aa] dark:text-[#858a9e]">
                            PNG or JPG • Maximum 2MB
                          </p>
                        </div>
                      </div>
                    )}

                    <input
                      id="profilePhoto"
                      type="file"
                      accept="image/png, image/jpeg"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (!file) return;

                        if (file.size > 2 * 1024 * 1024) {
                          setServerError("Profile photo must be under 2MB.");
                          return;
                        }

                        setServerError("");
                        setProfilePhoto(file);
                      }}
                    />
                  </label>
                </div>

                {/* Notes */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-[10px] font-extrabold text-[#252b45] dark:text-[#dfe1eb] sm:text-[11px]">
                    Notes{" "}
                    <span className="font-medium text-[#9299ad]">
                      (Optional)
                    </span>
                  </label>

                  <div className="relative">
                    <FileText
                      size={15}
                      className="absolute left-3.5 top-3.5 text-[#78839d] dark:text-[#777d92]"
                    />

                    <textarea
                      value={Notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add a short note about this person..."
                      rows={3}
                      className="w-full resize-none rounded-xl border border-[#dfe2eb] bg-[#fbfcff] py-3 pl-10 pr-4 text-[12px] font-medium text-[#252b45] outline-none transition-all placeholder:text-[#a1a8ba] focus:border-[#8060ef] focus:bg-white focus:shadow-[0_0_0_4px_rgba(128,96,239,0.08)] dark:border-white/10 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-[#666b7e] dark:focus:bg-white/[0.05]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ================= DIVIDER ================= */}
            <div className="mb-7 h-px bg-gradient-to-r from-transparent via-[#e8e8f1] to-transparent dark:via-white/10" />

            {/* ================= REMINDER SETTINGS ================= */}
            <div>

              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#eae4ff] to-[#dcd2ff] shadow-[0_8px_20px_rgba(99,55,239,0.10)] dark:from-[#3a2b63] dark:to-[#292042]">
                  <Settings2
                    size={19}
                    strokeWidth={2.5}
                    className="text-[#6337ef] dark:text-[#a995ff]"
                  />
                </div>

                <div>
                  <h2 className="text-[17px] font-black tracking-[-0.3px] text-[#151a35] dark:text-white">
                    Reminder & Message Settings
                  </h2>

                  <p className="mt-0.5 text-[10px] font-medium text-[#7a849d] dark:text-[#9297aa]">
                    Choose how BirthdayBuddy should remind you.
                  </p>
                </div>
              </div>

              {/* WhatsApp Reminder */}
              <div
                className={`group/reminder flex flex-col gap-4 rounded-2xl border px-4 py-4 transition-all duration-300 sm:flex-row sm:items-center sm:justify-between ${
                  sendReminder
                    ? "border-[#bcefd7] bg-gradient-to-r from-[#effcf6] to-[#e8faf3] shadow-[0_12px_30px_rgba(32,201,120,0.08)] dark:border-emerald-500/20 dark:from-emerald-500/[0.09] dark:to-emerald-500/[0.04]"
                    : "border-[#ececf3] bg-[#fafaff] dark:border-white/10 dark:bg-white/[0.025]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl shadow-md transition-all duration-300 ${
                      sendReminder
                        ? "bg-[#20c978] text-white shadow-[0_8px_20px_rgba(32,201,120,0.25)]"
                        : "bg-[#e9edf2] text-[#788294] dark:bg-white/10 dark:text-[#8e94a7]"
                    }`}
                  >
                    <FaWhatsapp size={21} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-[11px] font-extrabold text-[#25304a] dark:text-white sm:text-[12px]">
                        Send WhatsApp reminder
                      </h3>

                      {sendReminder && (
                        <span className="rounded-full bg-[#d4f7e5] px-2 py-0.5 text-[7px] font-extrabold uppercase tracking-wide text-[#15915b] dark:bg-emerald-500/10 dark:text-emerald-400">
                          Enabled
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-[9px] font-medium text-[#7a8497] dark:text-[#858a9d]">
                      Get automatic birthday reminders on WhatsApp.
                    </p>
                  </div>
                </div>

                {/* Toggle */}
                <button
                  type="button"
                  aria-label="Toggle WhatsApp reminder"
                  aria-pressed={sendReminder}
                  onClick={() => setSendReminder(!sendReminder)}
                  className={`relative h-7 w-12 shrink-0 rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-4 ${
                    sendReminder
                      ? "bg-[#6337ef] shadow-[0_5px_15px_rgba(99,55,239,0.30)] focus:ring-[#6337ef]/15"
                      : "bg-[#d9dce5] focus:ring-gray-300/30 dark:bg-white/15"
                  }`}
                >
                  <div
                    className={`h-5 w-5 rounded-full bg-white shadow-[0_3px_8px_rgba(0,0,0,0.20)] transition-transform duration-300 ${
                      sendReminder ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Custom Message */}
              <div className="mt-5">
                <label className="mb-2 flex items-center gap-1.5 text-[10px] font-extrabold text-[#252b45] dark:text-[#dfe1eb] sm:text-[11px]">
                  <FileText size={13} className="text-[#7040ef]" />

                  Custom Message{" "}
                  <span className="font-medium text-[#9299ad]">
                    (Optional)
                  </span>
                </label>

                <div className="relative">
                  <textarea
                    rows={4}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Happy birthday! 🎂 Wishing you a wonderful day filled with happiness..."
                    className="w-full resize-none rounded-2xl border border-[#dfe2eb] bg-[#fbfcff] px-4 py-3 text-[12px] font-medium leading-5 text-[#59627b] outline-none transition-all placeholder:text-[#a1a8ba] focus:border-[#8060ef] focus:bg-white focus:shadow-[0_0_0_4px_rgba(128,96,239,0.08)] dark:border-white/10 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-[#666b7e] dark:focus:bg-white/[0.05]"
                  />

                  <div className="pointer-events-none absolute bottom-3 right-3 rounded-lg bg-white/80 px-2 py-1 text-[8px] font-bold text-[#9aa0b2] shadow-sm dark:bg-[#181821] dark:text-[#707587]">
                    Personalize it ✨
                  </div>
                </div>
              </div>
            </div>

            {/* ================= BUTTONS ================= */}
            <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#eeeeF4] pt-5 dark:border-white/10 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="flex h-11 w-full items-center justify-center rounded-xl border border-[#dddff0] bg-white px-6 text-[11px] font-extrabold text-[#626b84] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c8c1e8] hover:bg-[#faf9ff] hover:text-[#6337ef] hover:shadow-[0_8px_20px_rgba(80,60,140,0.08)] dark:border-white/10 dark:bg-white/[0.035] dark:text-[#a8adbd] dark:hover:border-white/20 dark:hover:bg-white/[0.07] dark:hover:text-white sm:w-auto"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="group relative flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#6032e8] via-[#7139f2] to-[#8a4cff] px-7 text-[11px] font-extrabold text-white shadow-[0_10px_25px_rgba(102,51,238,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(102,51,238,0.35)] active:translate-y-0 sm:w-auto"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <Plus
                  size={15}
                  strokeWidth={2.7}
                  className="relative transition-transform duration-300 group-hover:rotate-90"
                />

                <span className="relative">
                  {isEditMode ? "Update Person" : "Add Person"}
                </span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE FORM FIELD ================= */

function FormField({
  label,
  required,
  icon: Icon,
  placeholder,
  type = "text",
  value,
  onChange,
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-extrabold text-[#252b45] dark:text-[#dfe1eb] sm:text-[11px]">
        {label}

        {required && (
          <span className="ml-0.5 text-[#ef4444]">
            *
          </span>
        )}
      </label>

      <div className="group relative">
        <Icon
          size={15}
          className="absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-[#68738d] transition-colors group-focus-within:text-[#7040ef] dark:text-[#777d92] dark:group-focus-within:text-[#a994ff]"
        />

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="h-[46px] w-full rounded-xl border border-[#dfe2eb] bg-[#fbfcff] pl-10 pr-4 text-[12px] font-medium text-[#252b45] outline-none shadow-[inset_0_1px_2px_rgba(30,40,80,0.02)] transition-all duration-300 placeholder:text-[#a1a8ba] hover:border-[#cfd2df] focus:border-[#8060ef] focus:bg-white focus:shadow-[0_0_0_4px_rgba(128,96,239,0.08)] dark:border-white/10 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-[#666b7e] dark:hover:border-white/20 dark:focus:bg-white/[0.05]"
        />
      </div>
    </div>
  );
}

export default AddPerson;