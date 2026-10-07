import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axiosInstance from "../../api/axiosInstance";
import axios from "axios";

import {
  MessageSquareText,
  Send,
  CheckCircle2,
  Clock3,
  XCircle,
  Search,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  CheckCheck,
  Gift,
  Sparkles,
  Phone,
  Heart,
  ArrowUpRight,
  MessageCircle,
  WandSparkles,
  Smartphone,
  CircleDot,
  RefreshCw,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

import messagesHero from "../../assets/dashboard/messagesHero.png";


const statusStyles = {
  Sent: "bg-[#dcf8eb] text-[#08ae76] dark:bg-[#0d392b] dark:text-[#52dda8]",
  Failed: "bg-[#ffe3e9] text-[#ed4760] dark:bg-[#3d1d27] dark:text-[#ff7189]",
  Pending: "bg-[#fff3e7] text-[#f07832] dark:bg-[#402c1d] dark:text-[#ffb06f]",
};


function Messages() {
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedBirthday, setSelectedBirthday] =
    useState(null);

  const [messageText, setMessageText] =
    useState("");

  const [statusDropdownOpen, setStatusDropdownOpen] =
    useState(false);

  const [searchText, setSearchText] =
    useState("");

  const [sending, setSending] =
    useState(false);

  const {
    accessToken,
    setAccessToken,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();


  /* ============================================================
     COUNTERS
  ============================================================ */

  const sentToday = birthdays.filter(
    (item) => item.status === "sent"
  ).length;

  const pending = birthdays.filter(
    (item) => item.status === "pending"
  ).length;

  const failed = birthdays.filter(
    (item) => item.status === "failed"
  ).length;

  const totalSent = sentToday;


  /* ============================================================
     FILTER
  ============================================================ */

  const filteredBirthdays = useMemo(() => {
    const search = searchText
      .trim()
      .toLowerCase();

    if (!search) {
      return birthdays;
    }

    return birthdays.filter((item) => {
      const name =
        item.person?.fullName?.toLowerCase() || "";

      const phone =
        item.person?.phone?.toLowerCase() || "";

      const message =
        item.message?.message?.toLowerCase() || "";

      return (
        name.includes(search) ||
        phone.includes(search) ||
        message.includes(search)
      );
    });
  }, [birthdays, searchText]);


  /* ============================================================
     SET SELECTED PERSON FROM DASHBOARD
  ============================================================ */

  useEffect(() => {
    const selectedPerson =
      location.state?.selectedPerson;

    if (!selectedPerson) {
      return;
    }

    setBirthdays((current) => {
      const exists = current.some(
        (item) =>
          item.person?._id ===
          selectedPerson._id
      );

      if (exists) {
        return current;
      }

      return [
        ...current,
        {
          person: selectedPerson,
          status: "pending",
          message: null,
        },
      ];
    });

    setSelectedBirthday((current) => {
      if (
        current?.person?._id ===
        selectedPerson._id
      ) {
        return current;
      }

      return {
        person: selectedPerson,
        status: "pending",
        message: null,
      };
    });

  }, [location.state]);


  /* ============================================================
     GET TODAY'S BIRTHDAYS
  ============================================================ */

  const getTodaysBirthdays = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        "/todays-birthdays",
        {
          headers: {
            Authorization:
              `Bearer ${accessToken}`,
          },
        }
      );

      const birthdayData =
        response.data.birthdays || [];

      setBirthdays((currentBirthdays) => {
        const currentSelectedId =
          selectedBirthday?.person?._id;

        const merged = [...birthdayData];

        currentBirthdays.forEach((item) => {
          const exists = merged.some(
            (birthday) =>
              birthday.person?._id ===
              item.person?._id
          );

          if (!exists && item.person) {
            merged.push(item);
          }
        });

        return merged;
      });

      if (birthdayData.length > 0) {
        setSelectedBirthday((currentSelected) => {
          if (!currentSelected) {
            return birthdayData[0];
          }

          const updatedSelected =
            birthdayData.find(
              (item) =>
                item.person._id ===
                currentSelected.person._id
            );

          return (
            updatedSelected ||
            currentSelected ||
            birthdayData[0]
          );
        });
      }

    } catch (error) {
      console.error(
        "GET TODAY'S BIRTHDAYS ERROR:",
        error
      );

      if (
        error.response?.status === 401
      ) {
        try {
          const refreshResponse =
            await axiosInstance.post(
              "/auth/refresh",
              {},
              {
                withCredentials: true,
              }
            );

          const newAccessToken =
            refreshResponse.data.accessToken;

          setAccessToken(
            newAccessToken
          );

          const retryResponse =
            await axiosInstance.get(
              "/todays-birthdays",
              {
                headers: {
                  Authorization:
                    `Bearer ${newAccessToken}`,
                },
              }
            );

          const birthdayData =
            retryResponse.data.birthdays ||
            [];

          setBirthdays(birthdayData);

          if (birthdayData.length > 0) {
            setSelectedBirthday(
              birthdayData[0]
            );
          }

        } catch (refreshError) {
          console.error(
            "REFRESH TOKEN ERROR:",
            refreshError
          );

          if (
            refreshError.response?.status ===
            401
          ) {
            alert(
              "Session expired. Please login again."
            );

            setTimeout(() => {
              navigate("/login");
            }, 2000);
          }
        }
      }

    } finally {
      setLoading(false);
    }
  };


  /* ============================================================
     INITIAL LOAD
  ============================================================ */

  useEffect(() => {
    if (accessToken) {
      getTodaysBirthdays();
    }
  }, [accessToken]);


  /* ============================================================
     MIDNIGHT REFRESH
  ============================================================ */

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    let timer;

    const scheduleNextMidnight = () => {
      const now = new Date();

      const nextMidnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        1
      );

      const timeUntilMidnight =
        nextMidnight.getTime() -
        now.getTime();

      timer = setTimeout(async () => {
        await getTodaysBirthdays();
        scheduleNextMidnight();
      }, timeUntilMidnight);
    };

    scheduleNextMidnight();

    return () => {
      clearTimeout(timer);
    };
  }, [accessToken]);


  /* ============================================================
     LOAD EXISTING MESSAGE INTO TEXTAREA
  ============================================================ */

  useEffect(() => {
    if (!selectedBirthday) {
      setMessageText("");
      return;
    }

    if (
      selectedBirthday.message?.message
    ) {
      setMessageText(
        selectedBirthday.message.message
      );
      return;
    }

    setMessageText("");
  }, [selectedBirthday]);


  /* ============================================================
     UPDATE MESSAGE STATUS
  ============================================================ */

  const updateMessageStatus = async (
    status
  ) => {
    try {
      if (
        !selectedBirthday?.message?._id
      ) {
        alert(
          "Please click 'Wish on WhatsApp' first."
        );
        return;
      }

      const response = await axiosInstance.put(
        `/messages/${selectedBirthday.message._id}/status`,
        {
          status,
        },
        {
          headers: {
            Authorization:
              `Bearer ${accessToken}`,
          },
        }
      );

      const updatedMessage =
        response.data.data;

      const updatedBirthday = {
        ...selectedBirthday,
        status:
          updatedMessage.status,
        message:
          updatedMessage,
      };

      setSelectedBirthday(
        updatedBirthday
      );

      setBirthdays((current) =>
        current.map((item) =>
          item.person._id ===
          selectedBirthday.person._id
            ? updatedBirthday
            : item
        )
      );

      setStatusDropdownOpen(false);

      if (status === "sent") {
        navigate("/dashboard");
      }

    } catch (error) {
      console.error(
        "UPDATE MESSAGE STATUS ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update message status"
      );
    }
  };


  /* ============================================================
     CREATE MESSAGE + OPEN WHATSAPP
  ============================================================ */

  const handleWhatsApp = async () => {
    if (!selectedBirthday) {
      alert("Please select a birthday.");
      return;
    }

    if (!messageText.trim()) {
      alert("Please enter a message.");
      return;
    }

    const phone =
      selectedBirthday.person.phone;

    if (!phone) {
      alert(
        "WhatsApp number is not available."
      );
      return;
    }

    const digits =
      phone.replace(/\D/g, "");

    try {
      setSending(true);

      const response =
        await axiosInstance.post(
          "/send-birthday-message",
          {
            personId:
              selectedBirthday.person._id,
            message:
              messageText.trim(),
          },
          {
            headers: {
              Authorization:
                `Bearer ${accessToken}`,
            },
          }
        );

      const createdMessage =
        response.data.data;

      const whatsappUrl =
        `https://wa.me/${digits}?text=${encodeURIComponent(
          messageText.trim()
        )}`;

      window.open(
        whatsappUrl,
        "_blank"
      );

      if (createdMessage) {
        const updatedBirthday = {
          ...selectedBirthday,
          status:
            createdMessage.status,
          message:
            createdMessage,
        };

        setSelectedBirthday(
          updatedBirthday
        );

        setBirthdays((current) =>
          current.map((item) =>
            item.person._id ===
            selectedBirthday.person._id
              ? updatedBirthday
              : item
          )
        );
      }

      setStatusDropdownOpen(false);

    } catch (error) {
      console.error(
        "WHATSAPP MESSAGE ERROR:",
        error
      );

      if (
        error.response?.status === 401
      ) {
        try {
          const refreshResponse =
            await axiosInstance.post(
              "/auth/refresh",
              {},
              {
                withCredentials: true,
              }
            );

          const newAccessToken =
            refreshResponse.data.accessToken;

          setAccessToken(
            newAccessToken
          );

          const retryResponse =
            await axiosInstance.post(
              "/send-birthday-message",
              {
                personId:
                  selectedBirthday.person._id,
                message:
                  messageText.trim(),
              },
              {
                headers: {
                  Authorization:
                    `Bearer ${newAccessToken}`,
                },
              }
            );

          const createdMessage =
            retryResponse.data.data;

          const whatsappUrl =
            `https://wa.me/${digits}?text=${encodeURIComponent(
              messageText.trim()
            )}`;

          window.open(
            whatsappUrl,
            "_blank"
          );

          if (createdMessage) {
            const updatedBirthday = {
              ...selectedBirthday,
              status:
                createdMessage.status,
              message:
                createdMessage,
            };

            setSelectedBirthday(
              updatedBirthday
            );

            setBirthdays((current) =>
              current.map((item) =>
                item.person._id ===
                selectedBirthday.person._id
                  ? updatedBirthday
                  : item
              )
            );
          }

        } catch (refreshError) {
          console.error(
            "REFRESH ERROR:",
            refreshError
          );

          if (
            refreshError.response?.status ===
            401
          ) {
            alert(
              "Session expired. Please login again."
            );

            setTimeout(() => {
              navigate("/login");
            }, 2000);
          }
        }

      } else {
        alert(
          error.response?.data?.message ||
            "Failed to create birthday message"
        );
      }

    } finally {
      setSending(false);
    }
  };


  /* ============================================================
     STATUS
  ============================================================ */

  const currentStatus =
    selectedBirthday?.status === "sent"
      ? "Sent"
      : selectedBirthday?.status === "failed"
      ? "Failed"
      : "Pending";


  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f4f5ff] px-3 py-4 text-[#171c38] transition-colors duration-500 dark:bg-[#090911] dark:text-white sm:px-5 lg:px-7">

      <div className="mx-auto max-w-[1500px]">


        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="group relative mb-5 min-h-[175px] overflow-hidden rounded-[30px] border border-white/90 bg-gradient-to-br from-[#fcfaff] via-[#f7efff] to-[#e8dcff] shadow-[0_20px_60px_rgba(70,48,140,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(70,48,140,0.18)] dark:border-white/10 dark:from-[#211a34] dark:via-[#181526] dark:to-[#10101a] dark:shadow-[0_25px_70px_rgba(0,0,0,0.35)]">

          <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-[#d8c5ff]/60 blur-3xl dark:bg-[#7848ff]/10" />

          <div className="absolute right-[30%] -top-20 h-60 w-60 rounded-full bg-[#ffcce5]/40 blur-3xl dark:bg-[#ff4d91]/10" />

          <div className="absolute bottom-[-100px] left-[40%] h-52 w-52 rounded-full bg-[#bddbff]/40 blur-3xl dark:bg-[#5686ff]/10" />


          <div className="relative z-10 flex min-h-[175px] items-center px-5 py-7 sm:px-8 lg:px-10">

            <div>

              <div className="mb-2 flex items-center gap-2">

                <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-white/80 text-[#6338ef] shadow-[0_10px_22px_rgba(70,40,140,0.12)] backdrop-blur-xl dark:bg-white/10 dark:text-[#aa96ff]">

                  <MessageSquareText
                    size={19}
                    strokeWidth={2.5}
                  />

                </div>

                <span className="rounded-full border border-white/80 bg-white/60 px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.18em] text-[#7650db] shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-[#aa96ff]">
                  Birthday Messages
                </span>

              </div>


              <h1 className="text-[32px] font-black leading-tight tracking-[-1.5px] text-[#101631] sm:text-[40px] dark:text-white">
                Messages
              </h1>

              <p className="mt-1 max-w-[550px] text-[10px] font-medium leading-5 text-[#78829c] sm:text-[12px] dark:text-[#969caf]">
                Create a personal birthday wish, open it directly in WhatsApp, and manage its delivery status.
              </p>


              <div className="mt-4 flex flex-wrap gap-2">

                <MiniBadge
                  icon={Gift}
                  text={`${birthdays.length} birthdays`}
                />

                <MiniBadge
                  icon={Send}
                  text={`${sentToday} sent today`}
                />

                <MiniBadge
                  icon={Sparkles}
                  text="Personalized wishes"
                />

              </div>

            </div>

          </div>


          <img
            src={messagesHero}
            alt="Birthday messages"
            className="pointer-events-none absolute bottom-[-18px] right-[3%] hidden h-[180px] w-auto object-contain drop-shadow-[0_25px_25px_rgba(60,35,140,0.18)] transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-1 md:block"
          />

        </section>


        {/* =====================================================
            STATS
        ===================================================== */}

        <section className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">

          <StatCard
            icon={Send}
            value={totalSent}
            label="Messages Sent"
            bg="bg-[#eee9ff]"
            color="text-[#6437ee]"
          />

          <StatCard
            icon={CheckCircle2}
            value={sentToday}
            label="Sent Today"
            bg="bg-[#e4faf2]"
            color="text-[#09b879]"
          />

          <StatCard
            icon={Clock3}
            value={pending}
            label="Pending"
            bg="bg-[#fff3e7]"
            color="text-[#f07832]"
          />

          <StatCard
            icon={XCircle}
            value={failed}
            label="Failed"
            bg="bg-[#ffecef]"
            color="text-[#ee405b]"
          />

        </section>


        {/* =====================================================
            MAIN
        ===================================================== */}

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-[0.9fr_1.1fr]">


          {/* ===================================================
              LEFT
          =================================================== */}

          <div className="flex h-[560px] flex-col overflow-hidden rounded-[28px] border border-white/90 bg-white/90 shadow-[0_18px_55px_rgba(40,45,90,0.09)] backdrop-blur-xl dark:border-white/10 dark:bg-[#12121b]/95">


            {/* HEADER */}

            <div className="border-b border-[#edf0f5] p-4 dark:border-white/10">

              <div className="mb-3 flex items-center justify-between">

                <div>

                  <h2 className="text-[13px] font-black text-[#20263f] dark:text-white">
                    Today's Birthdays
                  </h2>

                  <p className="mt-1 text-[8px] text-[#8a94a9] dark:text-[#777d91]">
                    Select someone to write their wish
                  </p>

                </div>


                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#eee9ff] to-[#ddd4ff] text-[#6338ef] shadow-[0_8px_18px_rgba(99,56,239,0.12)] dark:from-[#352a50] dark:to-[#28213d] dark:text-[#aa96ff]">

                  <Gift size={16} />

                </div>

              </div>


              <div className="relative">

                <Search
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8490a8] dark:text-[#73798d]"
                />

                <input
                  value={searchText}
                  onChange={(e) =>
                    setSearchText(
                      e.target.value
                    )
                  }
                  placeholder="Search people..."
                  className="h-10 w-full rounded-xl border border-[#e0e3ec] bg-[#fafbff] pl-10 pr-3 text-[9px] font-semibold text-[#424b64] outline-none transition focus:border-[#7650ee] focus:bg-white focus:shadow-[0_0_0_4px_rgba(117,80,238,0.08)] dark:border-white/10 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-[#666c7e]"
                />

              </div>

            </div>


            {/* LIST */}

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2.5 scrollbar-thin scrollbar-thumb-[#c9c0e8] scrollbar-track-transparent dark:scrollbar-thumb-[#51466e]">

              {loading ? (

                <LoadingState />

              ) : filteredBirthdays.length === 0 ? (

                <EmptyMessageState />

              ) : (

                <div className="space-y-2">

                  {filteredBirthdays.map(
                    (item) => (

                      <MessageListItem
                        key={
                          item.person._id
                        }
                        item={item}
                        active={
                          selectedBirthday?.person?._id ===
                          item.person?._id
                        }
                        onClick={() => {
                          setSelectedBirthday(
                            item
                          );

                          setStatusDropdownOpen(
                            false
                          );
                        }}
                      />

                    )
                  )}

                </div>

              )}

            </div>

          </div>


          {/* ===================================================
              RIGHT
          =================================================== */}

          <div className="flex min-h-[560px] flex-col overflow-hidden rounded-[28px] border border-white/90 bg-white/95 shadow-[0_18px_55px_rgba(40,45,90,0.10)] backdrop-blur-xl dark:border-white/10 dark:bg-[#12121b]/95">


            {/* PERSON HEADER */}

            <div className="flex items-center justify-between border-b border-[#edf0f5] px-4 py-3.5 dark:border-white/10">

              <div className="flex min-w-0 items-center gap-3">

                <ProfileAvatar
                  person={
                    selectedBirthday?.person
                  }
                  size="medium"
                />

                <div className="min-w-0">

                  <h3 className="truncate text-[12px] font-black text-[#171c38] dark:text-white">

                    {selectedBirthday?.person?.fullName ||
                      "Select a person"}

                  </h3>

                  <div className="mt-1 flex items-center gap-2">

                    <Phone
                      size={9}
                      className="text-[#7d879e]"
                    />

                    <p className="truncate text-[8px] font-semibold text-[#7d879e] dark:text-[#858b9d]">

                      {selectedBirthday?.person?.phone ||
                        "No phone number"}

                    </p>

                  </div>

                </div>

              </div>


              <div className="flex items-center gap-2">

                <StatusBadge
                  status={
                    currentStatus
                  }
                />

                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-[#707a93] transition hover:bg-[#f2f1f8] dark:hover:bg-white/10"
                >
                  <MoreVertical
                    size={15}
                  />
                </button>

              </div>

            </div>


            {/* BIRTHDAY DATE */}

            <div className="flex items-center justify-center border-b border-[#f0f1f6] py-2.5 dark:border-white/10">

              <div className="flex items-center gap-2 rounded-full border border-[#e8e5f3] bg-[#f8f7fc] px-4 py-1.5 text-[8px] font-bold text-[#7a849d] shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-[#8e94a6]">

                <CalendarDays
                  size={11}
                />

                {selectedBirthday
                  ? new Date(
                      selectedBirthday.person.dateOfBirth
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : "No birthday selected"}

              </div>

            </div>


            {/* CHAT */}

            <div className="relative min-h-[250px] flex-1 overflow-hidden bg-gradient-to-br from-[#fbfaff] via-white to-[#f4f0ff] px-4 py-5 dark:from-[#171521] dark:via-[#12121a] dark:to-[#19152a]">

              <div className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.025]">

                <div className="grid grid-cols-4 gap-10 p-8">

                  {Array.from({
                    length: 28,
                  }).map(
                    (_, index) => (
                      <Gift
                        key={index}
                        size={28}
                        className="text-[#6638ed]"
                      />
                    )
                  )}

                </div>

              </div>


              {selectedBirthday ? (

                <div className="relative flex h-full items-end justify-end">

                  <div className="relative max-w-[88%] sm:max-w-[70%]">

                    <div className="absolute -bottom-2 right-3 h-10 w-20 rounded-full bg-[#6338ef]/10 blur-xl" />


                    <div className="rounded-[20px] rounded-br-[5px] border border-white/80 bg-gradient-to-br from-[#eafff6] via-[#e0fff2] to-[#d4f8e9] px-4 py-3.5 shadow-[0_15px_35px_rgba(35,130,95,0.12)] dark:border-white/5 dark:from-[#17372d] dark:via-[#163329] dark:to-[#122a23] dark:shadow-[0_15px_35px_rgba(0,0,0,0.22)]">

                      <div className="mb-2 flex items-center gap-1.5">

                        <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-white/70 text-[#1aa679] dark:bg-white/10 dark:text-[#52dda8]">

                          <MessageCircle
                            size={10}
                          />

                        </div>

                        <span className="text-[7px] font-black uppercase tracking-wider text-[#4c927b] dark:text-[#68b99e]">
                          Birthday Wish
                        </span>

                      </div>


                      <p className="whitespace-pre-line text-[10px] font-semibold leading-[18px] text-[#29354d] dark:text-[#d8dedb]">

                        {messageText ||
                          "Write a personal birthday message below..."}

                      </p>


                      <div className="mt-2.5 flex items-center justify-end gap-1.5">

                        <span className="text-[7px] font-medium text-[#78839a] dark:text-[#7f958c]">

                          {selectedBirthday?.message?.sendAt
                            ? new Date(
                                selectedBirthday.message.sendAt
                              ).toLocaleTimeString(
                                "en-IN",
                                {
                                  hour: "2-digit",
                                  minute:
                                    "2-digit",
                                }
                              )
                            : "Not sent yet"}

                        </span>

                        <CheckCheck
                          size={12}
                          className={
                            currentStatus ===
                            "Sent"
                              ? "text-[#229f79]"
                              : "text-[#9aa5a0]"
                          }
                        />

                      </div>

                    </div>

                  </div>

                </div>

              ) : (

                <div className="relative flex h-full items-center justify-center">

                  <div className="text-center">

                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br from-[#eee9ff] to-[#ddd4ff] text-[#6338ef] shadow-[0_15px_30px_rgba(99,56,239,0.15)] dark:from-[#352a50] dark:to-[#28213d] dark:text-[#aa96ff]">

                      <MessageSquareText
                        size={27}
                      />

                    </div>

                    <h3 className="text-[12px] font-black text-[#272d47] dark:text-white">
                      Select a birthday
                    </h3>

                    <p className="mt-1 text-[8px] text-[#8a94a9] dark:text-[#777d91]">
                      Choose someone from the list to start writing.
                    </p>

                  </div>

                </div>

              )}

            </div>


            {/* COMPOSER */}

            <div className="border-t border-[#e9ebf2] bg-white p-3.5 dark:border-white/10 dark:bg-[#15151f]">

              <div className="mb-2 flex items-center justify-between">

                <div className="flex items-center gap-1.5">

                  <WandSparkles
                    size={12}
                    className="text-[#7045e8]"
                  />

                  <span className="text-[8px] font-black text-[#68728b] dark:text-[#9399aa]">
                    Personalize your wish
                  </span>

                </div>

                <span className="text-[7px] font-medium text-[#a0a7b7]">
                  {messageText.length}/500
                </span>

              </div>


              <div className="flex flex-col gap-2 sm:flex-row">

                <textarea
                  value={messageText}
                  onChange={(e) =>
                    setMessageText(
                      e.target.value.slice(
                        0,
                        500
                      )
                    )
                  }
                  rows={3}
                  disabled={
                    !selectedBirthday ||
                    sending
                  }
                  placeholder={
                    selectedBirthday
                      ? "Write something personal and memorable..."
                      : "Select a person first..."
                  }
                  className="min-h-[78px] flex-1 resize-none rounded-[17px] border border-[#dfe2eb] bg-[#fafbff] px-3.5 py-3 text-[9px] font-semibold leading-4 text-[#59637d] outline-none transition-all placeholder:text-[#a1a9b9] focus:border-[#7650ee] focus:bg-white focus:shadow-[0_0_0_4px_rgba(117,80,238,0.07)] disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.035] dark:text-[#d5d8e2] dark:placeholder:text-[#656b7d] dark:focus:bg-white/[0.05]"
                />


                <div className="flex shrink-0 flex-row sm:w-[175px] sm:flex-col">

                  <button
                    type="button"
                    disabled={
                      !selectedBirthday ||
                      sending
                    }
                    onClick={
                      handleWhatsApp
                    }
                    className="flex h-[48px] flex-1 items-center justify-center gap-2 rounded-l-[15px] bg-gradient-to-br from-[#6338ef] to-[#8b55ff] px-4 text-[9px] font-black text-white shadow-[0_10px_25px_rgba(99,56,239,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_30px_rgba(99,56,239,0.32)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:h-[42px] sm:rounded-t-[15px] sm:rounded-bl-none"
                  >

                    {sending ? (

                      <RefreshCw
                        size={14}
                        className="animate-spin"
                      />

                    ) : (

                      <Smartphone
                        size={14}
                      />

                    )}

                    {sending
                      ? "Opening..."
                      : "Wish on WhatsApp"}

                  </button>


                  <div className="relative flex">

                    <button
                      type="button"
                      disabled={
                        !selectedBirthday?.message?._id
                      }
                      onClick={() =>
                        setStatusDropdownOpen(
                          (current) =>
                            !current
                        )
                      }
                      className="flex h-[48px] w-[48px] items-center justify-center border-l border-white/30 bg-gradient-to-br from-[#5a31df] to-[#7443ed] text-white transition hover:bg-[#5428d8] disabled:cursor-not-allowed disabled:opacity-40 sm:h-[42px] sm:w-full sm:border-l-0 sm:border-t sm:rounded-b-[15px]"
                    >

                      <ChevronDown
                        size={14}
                        className={
                          statusDropdownOpen
                            ? "rotate-180 transition-transform"
                            : "transition-transform"
                        }
                      />

                    </button>


                    {statusDropdownOpen &&
                      selectedBirthday?.message?._id && (

                        <div className="absolute bottom-full right-0 z-50 mb-2 w-[145px] overflow-hidden rounded-[16px] border border-white/90 bg-white p-1.5 shadow-[0_20px_50px_rgba(40,30,100,0.18)] dark:border-white/10 dark:bg-[#1a1924]">

                          <StatusOption
                            icon={
                              Clock3
                            }
                            label="Pending"
                            color="text-[#f07832]"
                            bg="hover:bg-[#fff3e7] dark:hover:bg-[#402c1d]"
                            onClick={() =>
                              updateMessageStatus(
                                "pending"
                              )
                            }
                          />

                          <StatusOption
                            icon={
                              CheckCircle2
                            }
                            label="Sent"
                            color="text-[#08ae76]"
                            bg="hover:bg-[#dcf8eb] dark:hover:bg-[#0d392b]"
                            onClick={() =>
                              updateMessageStatus(
                                "sent"
                              )
                            }
                          />

                          <StatusOption
                            icon={
                              XCircle
                            }
                            label="Failed"
                            color="text-[#ed4760]"
                            bg="hover:bg-[#ffe3e9] dark:hover:bg-[#3d1d27]"
                            onClick={() =>
                              updateMessageStatus(
                                "failed"
                              )
                            }
                          />

                        </div>

                      )}

                  </div>

                </div>

              </div>


              <div className="mt-2 flex items-center gap-1.5 text-[7px] font-medium text-[#9aa2b3] dark:text-[#686f82]">

                <CircleDot
                  size={8}
                  className="text-[#6338ef]"
                />

                Clicking WhatsApp opens a pre-filled message. Mark it as Sent only after you actually send it.

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            MOBILE TIP
        ===================================================== */}

        <div className="mt-4 flex items-center gap-2 rounded-[18px] border border-white/80 bg-white/60 px-4 py-3 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/[0.025]">

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#eee9ff] text-[#6338ef] dark:bg-[#30264b] dark:text-[#aa96ff]">

            <Heart
              size={13}
              fill="currentColor"
            />

          </div>

          <p className="text-[7px] font-semibold leading-4 text-[#818ba0] dark:text-[#747b8d]">

            Tip: Write something personal instead of using a generic birthday message. It makes the wish feel much more meaningful.

          </p>

        </div>

      </div>

    </div>
  );
}


/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  icon: Icon,
  value,
  label,
  bg,
  color,
}) {
  return (
    <div className="group relative overflow-hidden rounded-[23px] border border-white/90 bg-white/90 p-3.5 shadow-[0_12px_35px_rgba(40,45,90,0.07)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(55,45,120,0.14)] dark:border-white/10 dark:bg-[#12121b]/90">

      <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#eee9ff] blur-2xl dark:bg-[#7148ef]/10" />

      <div className="relative flex items-center gap-3">

        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[17px] ${bg} shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_8px_18px_rgba(40,30,100,0.08)] transition-all duration-300 group-hover:-translate-y-1 group-hover:rotate-[-4deg]`}>

          <Icon
            size={20}
            strokeWidth={2.4}
            className={color}
          />

        </div>

        <div>

          <h3 className="text-[23px] font-black leading-none tracking-[-0.8px] text-[#171c38] dark:text-white">
            {value}
          </h3>

          <p className="mt-1.5 text-[8px] font-bold text-[#727d98] dark:text-[#7f8699]">
            {label}
          </p>

        </div>

      </div>

    </div>
  );
}


/* ============================================================
   MINI BADGE
============================================================ */

function MiniBadge({
  icon: Icon,
  text,
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-white/80 bg-white/60 px-3 py-1.5 text-[7px] font-bold text-[#69738c] shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-[#aeb3c4]">

      <Icon
        size={10}
        className="text-[#7045e8]"
      />

      {text}

    </div>
  );
}


/* ============================================================
   MESSAGE LIST ITEM
============================================================ */

function MessageListItem({
  item,
  active,
  onClick,
}) {
  const status =
    item.status === "sent"
      ? "Sent"
      : item.status === "failed"
      ? "Failed"
      : "Pending";

  const messagePreview =
    item.message?.message ||
    "Write a birthday message";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-full overflow-hidden rounded-[19px] border p-3 text-left transition-all duration-300 ${
        active
          ? "border-[#cfc1ff] bg-gradient-to-br from-[#f5f0ff] to-[#eee8ff] shadow-[0_12px_28px_rgba(99,56,239,0.13)] dark:border-[#5d478d] dark:from-[#2a2140] dark:to-[#211b32]"
          : "border-transparent bg-[#fafbff] hover:-translate-y-0.5 hover:border-[#e5e0f5] hover:bg-white hover:shadow-[0_10px_25px_rgba(40,45,90,0.08)] dark:bg-white/[0.025] dark:hover:border-white/10 dark:hover:bg-white/[0.05]"
      }`}
    >

      {active && (
        <div className="absolute bottom-3 left-0 top-3 w-1 rounded-r-full bg-gradient-to-b from-[#6338ef] to-[#a06cff]" />
      )}

      <div className="flex items-center gap-3">

        <ProfileAvatar
          person={item.person}
          size="small"
        />

        <div className="min-w-0 flex-1">

          <div className="flex items-center justify-between gap-2">

            <h3 className="truncate text-[10px] font-black text-[#20263d] dark:text-white">
              {item.person.fullName}
            </h3>

            <span className="shrink-0 text-[7px] font-semibold text-[#8a94a9] dark:text-[#777d91]">
              Today
            </span>

          </div>

          <p className="mt-1 truncate text-[8px] font-medium text-[#808aa1] dark:text-[#858b9d]">
            {messagePreview}
          </p>

          <div className="mt-2 flex items-center justify-between">

            <span className="flex items-center gap-1 text-[7px] text-[#858fa5] dark:text-[#777d91]">

              <Phone size={8} />

              {item.person.phone ||
                "No phone"}

            </span>

            <span
              className={`rounded-full px-2 py-1 text-[6px] font-black ${statusStyles[status]}`}
            >
              {status}
            </span>

          </div>

        </div>

        <ChevronRight
          size={13}
          className={`shrink-0 transition-transform ${
            active
              ? "translate-x-1 text-[#7045e8]"
              : "text-[#8a94a9]"
          }`}
        />

      </div>

    </button>
  );
}


/* ============================================================
   STATUS BADGE
============================================================ */

function StatusBadge({
  status,
}) {
  return (
    <span
      className={`rounded-full px-3 py-1.5 text-[7px] font-black ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}


/* ============================================================
   STATUS OPTION
============================================================ */

function StatusOption({
  icon: Icon,
  label,
  color,
  bg,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-[8px] font-black ${color} ${bg} transition`}
    >

      <Icon size={12} />

      {label}

    </button>
  );
}


/* ============================================================
   PROFILE AVATAR
============================================================ */

function ProfileAvatar({
  person,
  size = "medium",
}) {
  const sizes = {
    small: "h-11 w-11 rounded-[14px]",
    medium: "h-12 w-12 rounded-[16px]",
    large: "h-16 w-16 rounded-[20px]",
  };

  const textSizes = {
    small: "text-[11px]",
    medium: "text-[14px]",
    large: "text-[18px]",
  };

  const getInitials = (name) => {
    if (!name) return "?";

    const words =
      name.trim().split(/\s+/);

    if (words.length === 1) {
      return words[0]
        .charAt(0)
        .toUpperCase();
    }

    return (
      words[0].charAt(0) +
      words[1].charAt(0)
    ).toUpperCase();
  };

  return (
    <div
      className={`relative shrink-0 ${sizes[size]}`}
    >

      <div className="absolute inset-0 rounded-[inherit] bg-[#7045e8]/20 blur-md" />

      <div
        className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-[inherit] border-2 border-white bg-gradient-to-br from-[#eee9ff] to-[#ddd3ff] font-black text-[#6338ef] shadow-[0_10px_22px_rgba(70,45,140,0.17)] dark:border-[#2e2939] dark:from-[#352a50] dark:to-[#28213d] dark:text-[#aa96ff] ${textSizes[size]}`}
      >

        {person?.profilePhoto ? (

          <img
            src={person.profilePhoto}
            alt={
              person.fullName ||
              "Profile"
            }
            className="h-full w-full object-cover"
          />

        ) : (

          getInitials(
            person?.fullName
          )

        )}

      </div>

    </div>
  );
}


/* ============================================================
   LOADING
============================================================ */

function LoadingState() {
  return (
    <div className="flex h-full min-h-[300px] items-center justify-center">

      <div className="text-center">

        <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[18px] bg-gradient-to-br from-[#eee9ff] to-[#ddd3ff] text-[#6338ef] shadow-[0_12px_25px_rgba(99,56,239,0.14)] dark:from-[#352a50] dark:to-[#28213d] dark:text-[#aa96ff]">

          <MessageSquareText
            size={23}
          />

          <span className="absolute inset-0 animate-ping rounded-[18px] border border-[#8b63f5]/30" />

        </div>

        <p className="text-[9px] font-black text-[#69738c] dark:text-[#969caf]">
          Loading birthdays...
        </p>

      </div>

    </div>
  );
}


/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyMessageState() {
  return (
    <div className="flex h-full min-h-[300px] items-center justify-center px-5">

      <div className="text-center">

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br from-[#eee9ff] to-[#ddd3ff] text-[#6338ef] shadow-[0_15px_30px_rgba(99,56,239,0.15)] dark:from-[#352a50] dark:to-[#28213d] dark:text-[#aa96ff]">

          <Gift size={27} />

        </div>

        <h3 className="text-[12px] font-black text-[#252b45] dark:text-white">
          No birthdays today
        </h3>

        <p className="mx-auto mt-1 max-w-[220px] text-[8px] leading-4 text-[#8a94a9] dark:text-[#777d91]">
          When someone has a birthday today, they will appear here.
        </p>

      </div>

    </div>
  );
}


export default Messages;