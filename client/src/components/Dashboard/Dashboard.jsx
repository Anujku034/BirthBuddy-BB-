import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../api/axiosInstance";
import {
  Users,
  CalendarDays,
  Gift,
  Send,
  Cake,
  MessageSquareText,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import dashboardHero from "../../assets/dashboard/dashboardHero.png";

// ============================================================
// DATE HELPERS
// ============================================================

const getNextBirthday = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  const birthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  birthday.setHours(0, 0, 0, 0);

  const todayDate = new Date(today);
  todayDate.setHours(0, 0, 0, 0);

  if (birthday < todayDate) {
    birthday.setFullYear(today.getFullYear() + 1);
  }

  return birthday;
};

const getDaysLeft = (birthday) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const birthdayDate = new Date(birthday);
  birthdayDate.setHours(0, 0, 0, 0);

  const difference =
    birthdayDate.getTime() - today.getTime();

  return Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );
};

const getBirthdayStatus = (days) => {
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";

  return `${days} days left`;
};

const formatBirthdayDate = (date) => {
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatMessageDate = (date) => {
  if (!date) return "";

  const messageDate = new Date(date);

  if (Number.isNaN(messageDate.getTime())) {
    return "";
  }

  return messageDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

// ============================================================
// DASHBOARD
// ============================================================

function Dashboard() {
  const {
    user,
    accessToken,
    setAccessToken,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);

  const [loadingContacts, setLoadingContacts] =
    useState(true);

  const [loadingMessages, setLoadingMessages] =
    useState(true);

  const [contactsError, setContactsError] =
    useState("");

  const [messagesError, setMessagesError] =
    useState("");

  // ==========================================================
  // USER NAME
  // ==========================================================

  const getUserName = () => {
    if (!user) return "User";

    if (typeof user === "string") {
      return user;
    }

    return (
      user.fullName ||
      user.name ||
      `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
      user.username ||
      "User"
    );
  };

  const fullUserName = getUserName();

  const firstName =
    fullUserName.split(" ")[0] || "User";

  // ==========================================================
  // GET ALL PERSONS
  // ==========================================================

  const getAllPersons = async (
    token = accessToken
  ) => {
    try {
      setLoadingContacts(true);
      setContactsError("");

      const response = await axiosInstance.get(
        "/persons",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContacts(
        response.data.persons || []
      );

      return true;
    } catch (error) {
      console.error(
        "GET PERSONS ERROR:",
        error
      );

      if (error.response?.status === 401) {
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

          setAccessToken(newAccessToken);

          const retryResponse =
            await axiosInstance.get(
              "/persons",
              {
                headers: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              }
            );

          setContacts(
            retryResponse.data.persons || []
          );

          return true;
        } catch (refreshError) {
          console.error(
            "REFRESH ERROR:",
            refreshError
          );

          alert(
            "Session expired. Please login again"
          );

          setTimeout(() => {
            navigate("/login");
          }, 2000);

          return false;
        }
      }

      setContactsError(
        "Failed to load contacts."
      );

      return false;
    } finally {
      setLoadingContacts(false);
    }
  };

  // ==========================================================
  // GET RECENT SENT MESSAGES
  // ==========================================================

  const getRecentMessages = async (
    token = accessToken
  ) => {
    try {
      setLoadingMessages(true);
      setMessagesError("");

      const response = await axiosInstance.get(
        "/recent-messages",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRecentMessages(
        response.data.messages || []
      );

      return true;
    } catch (error) {
      console.error(
        "GET RECENT MESSAGES ERROR:",
        error
      );

      if (error.response?.status === 401) {
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

          setAccessToken(newAccessToken);

          const retryResponse =
            await axiosInstance.get(
              "/recent-messages",
              {
                headers: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              }
            );

          setRecentMessages(
            retryResponse.data.messages || []
          );

          return true;
        } catch (refreshError) {
          console.error(
            "REFRESH MESSAGE ERROR:",
            refreshError
          );

          alert(
            "Session expired. Please login again"
          );

          setTimeout(() => {
            navigate("/login");
          }, 2000);

          return false;
        }
      }

      setMessagesError(
        "Failed to load recent messages."
      );

      return false;
    } finally {
      setLoadingMessages(false);
    }
  };

  // ==========================================================
  // LOAD DASHBOARD DATA
  // ==========================================================

  useEffect(() => {
    if (!accessToken) return;

    getAllPersons();
    getRecentMessages();
  }, [accessToken]);

  // ==========================================================
  // UPCOMING BIRTHDAYS
  // EXACTLY 7
  // SORTED BY NEXT BIRTHDAY
  // ==========================================================

  const upcomingBirthdays = contacts
    .map((person) => {
      const nextBirthday = getNextBirthday(
        person.dateOfBirth
      );

      const daysLeft =
        getDaysLeft(nextBirthday);

      return {
        ...person,
        name: person.fullName,
        nextBirthday,
        daysLeft,
        date: formatBirthdayDate(
          nextBirthday
        ),
        days: getBirthdayStatus(
          daysLeft
        ),
        today: daysLeft === 0,
        profilePhoto:
          person.profilePhoto || null,
      };
    })
    .sort(
      (a, b) =>
        a.nextBirthday.getTime() -
        b.nextBirthday.getTime()
    )
    .slice(0, 7);

  // ==========================================================
  // STATISTICS
  // ==========================================================

  const allUpcomingBirthdays = contacts
    .map((person) => {
      const nextBirthday = getNextBirthday(
        person.dateOfBirth
      );

      return {
        ...person,
        nextBirthday,
        daysLeft:
          getDaysLeft(nextBirthday),
      };
    })
    .sort(
      (a, b) =>
        a.nextBirthday.getTime() -
        b.nextBirthday.getTime()
    );

  const birthdaysThisWeek =
    allUpcomingBirthdays.filter(
      (person) =>
        person.daysLeft >= 0 &&
        person.daysLeft <= 7
    ).length;

  const todayMonth =
    new Date().getMonth();

  const birthdaysThisMonth =
    allUpcomingBirthdays.filter(
      (person) =>
        person.nextBirthday.getMonth() ===
        todayMonth
    ).length;

  // ==========================================================
  // OPEN MESSAGES PAGE
  // ==========================================================

  const openMessagePage = (person) => {
    navigate("/dashboard/messages", {
      state: {
        selectedPerson: person,
      },
    });
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (
    !accessToken ||
    (loadingContacts &&
      contacts.length === 0)
  ) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#f7f8ff]
          px-4
          transition-colors
          duration-300

          dark:bg-[#0d0b17]
        "
      >
        <div className="text-center">

          <div
            className="
              mx-auto
              mb-3
              h-8
              w-8
              animate-spin
              rounded-full
              border-4
              border-[#e8e1ff]
              border-t-[#6338ef]

              dark:border-[#2c2442]
              dark:border-t-[#9b78ff]
            "
          />

          <p
            className="
              text-sm
              font-semibold
              text-[#68738d]

              dark:text-[#aaa3ba]
            "
          >
            Loading dashboard...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-[#f7f8ff]
        px-3
        py-4
        transition-colors
        duration-300
        sm:px-5
        lg:px-7

        dark:bg-[#0d0b17]
      "
    >
      <div className="mx-auto max-w-[1500px]">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section
          className="
            relative
            mb-3
            min-h-[185px]
            overflow-hidden
            rounded-[17px]
            border
            border-white
            bg-gradient-to-r
            from-[#faf8ff]
            via-[#f5efff]
            to-[#eee5ff]
            shadow-[0_8px_30px_rgba(73,45,150,0.07)]
            transition-colors
            duration-300
            sm:h-[170px]
            md:h-[180px]

            dark:border-white/[0.08]
            dark:from-[#17132b]
            dark:via-[#211735]
            dark:to-[#271a42]
            dark:shadow-[0_8px_30px_rgba(0,0,0,0.30)]
          "
        >
          <div
            className="
              absolute
              -left-20
              -top-24
              h-56
              w-56
              rounded-full
              bg-[#ddc9ff]/40
              blur-3xl

              dark:bg-[#713cff]/10
            "
          />

          <div
            className="
              absolute
              right-[35%]
              -top-20
              h-52
              w-52
              rounded-full
              bg-[#ffd9ed]/30
              blur-3xl

              dark:bg-[#ff4f91]/10
            "
          />

          <div
            className="
              relative
              z-10
              px-5
              pb-4
              pt-6
              sm:px-7
              sm:pt-6
              md:max-w-[62%]
            "
          >
            <h1
              className="
                text-[25px]
                font-extrabold
                tracking-[-0.8px]
                text-[#101631]
                sm:text-[29px]
                md:text-[31px]

                dark:text-white
              "
            >
              Welcome Back, {firstName}! 👋
            </h1>

            <p
              className="
                mt-1
                text-[11px]
                font-medium
                leading-5
                text-[#68738d]
                sm:text-[13px]

                dark:text-[#aaa3ba]
              "
            >
              Here's your birthday overview.
              Don't forget to spread happiness! 💕
            </p>

            <div
              className="
                mt-4
                w-full
                max-w-[430px]
                rounded-[14px]
                border
                border-[#e4dcef]
                bg-white/60
                px-4
                py-2.5
                shadow-[0_5px_15px_rgba(73,45,150,0.04)]
                sm:mt-5
                sm:px-5
                sm:py-3

                dark:border-white/[0.08]
                dark:bg-white/[0.05]
                dark:shadow-none
              "
            >
              <div className="flex gap-2 sm:gap-3">

                <span
                  className="
                    text-[23px]
                    font-serif
                    leading-none
                    text-[#7044e9]
                    sm:text-[27px]

                    dark:text-[#a47cff]
                  "
                >
                  “
                </span>

                <p
                  className="
                    font-serif
                    text-[12px]
                    italic
                    leading-[18px]
                    text-[#4b5270]
                    sm:text-[15px]
                    sm:leading-[22px]

                    dark:text-[#c0b9d1]
                  "
                >
                  Birthdays are small reminders
                  <br />
                  of the big love in our lives.”
                </p>

              </div>
            </div>
          </div>

          <img
            src={dashboardHero}
            alt="Birthday celebration"
            className="
              absolute
              bottom-[-1px]
              right-[2%]
              hidden
              h-[145px]
              w-auto
              object-contain
              md:block
              lg:h-[165px]
            "
          />
        </section>

        {/* =====================================================
            STATS
        ===================================================== */}

        <section
          className="
            mb-3
            grid
            grid-cols-1
            gap-2.5
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          <StatCard
            icon={Users}
            value={contacts.length}
            label="Total Contacts"
            iconBg="bg-[#eee9ff] dark:bg-[#302653]"
            iconColor="text-[#6338ef] dark:text-[#a47cff]"
          />

          <StatCard
            icon={CalendarDays}
            value={birthdaysThisWeek}
            label="Birthdays This Week"
            iconBg="bg-[#ffecef] dark:bg-[#42232e]"
            iconColor="text-[#ef405b] dark:text-[#ff7188]"
          />

          <StatCard
            icon={Gift}
            value={birthdaysThisMonth}
            label="Birthdays This Month"
            iconBg="bg-[#fff1dc] dark:bg-[#44331e]"
            iconColor="text-[#f39b17] dark:text-[#ffb94f]"
          />

          <StatCard
            icon={Send}
            value={recentMessages.length}
            label="Messages Sent"
            iconBg="bg-[#e6f8f1] dark:bg-[#193a31]"
            iconColor="text-[#08ae76] dark:text-[#38d69f]"
          />
        </section>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <section
          className="
            grid
            grid-cols-1
            gap-3
            xl:grid-cols-[1fr_1fr]
          "
        >

          {/* ===================================================
              UPCOMING BIRTHDAYS
          =================================================== */}

          <div
            className="
              rounded-[14px]
              border
              border-[#e5e7ef]
              bg-white
              p-3
              shadow-[0_5px_20px_rgba(35,45,90,0.05)]
              transition-colors
              duration-300

              dark:border-white/[0.08]
              dark:bg-[#151222]
              dark:shadow-[0_5px_20px_rgba(0,0,0,0.25)]
            "
          >
            <div
              className="
                mb-2
                flex
                items-center
                justify-between
                border-b
                border-[#edf0f5]
                pb-3

                dark:border-white/[0.08]
              "
            >
              <div className="flex min-w-0 items-center gap-2">

                <CalendarDays
                  size={19}
                  className="
                    shrink-0
                    text-[#6338ef]

                    dark:text-[#a47cff]
                  "
                />

                <h2
                  className="
                    truncate
                    text-[15px]
                    font-extrabold
                    text-[#1d233d]

                    dark:text-white
                  "
                >
                  Upcoming Birthdays
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/dashboard/upcoming-birthdays"
                  )
                }
                className="
                  shrink-0
                  text-[10px]
                  font-semibold
                  text-[#6338ef]
                  transition
                  hover:text-[#4f24db]
                  sm:text-[11px]

                  dark:text-[#a47cff]
                  dark:hover:text-[#c0aaff]
                "
              >
                View All →
              </button>
            </div>

            <div className="max-h-[480px] overflow-y-auto pr-1">

              {loadingContacts ? (
                <div className="flex min-h-[250px] items-center justify-center">

                  <div
                    className="
                      h-7
                      w-7
                      animate-spin
                      rounded-full
                      border-4
                      border-[#e8e1ff]
                      border-t-[#6338ef]

                      dark:border-[#2c2442]
                      dark:border-t-[#9b78ff]
                    "
                  />

                </div>
              ) : contactsError ? (
                <div className="flex min-h-[250px] items-center justify-center px-3">

                  <p
                    className="
                      text-center
                      text-[11px]
                      text-[#ed4760]

                      dark:text-[#ff7188]
                    "
                  >
                    {contactsError}
                  </p>

                </div>
              ) : upcomingBirthdays.length > 0 ? (
                upcomingBirthdays.map(
                  (person, index) => (
                    <BirthdayRow
                      key={
                        person._id ||
                        `${person.name}-${index}`
                      }
                      person={person}
                      isLast={
                        index ===
                        upcomingBirthdays.length - 1
                      }
                      onWish={() =>
                        openMessagePage(person)
                      }
                    />
                  )
                )
              ) : (
                <EmptyBirthdayState />
              )}

            </div>
          </div>

          {/* ===================================================
              RECENT MESSAGES
          =================================================== */}

          <div
            className="
              rounded-[14px]
              border
              border-[#e5e7ef]
              bg-white
              p-3
              shadow-[0_5px_20px_rgba(35,45,90,0.05)]
              transition-colors
              duration-300

              dark:border-white/[0.08]
              dark:bg-[#151222]
              dark:shadow-[0_5px_20px_rgba(0,0,0,0.25)]
            "
          >
            <div
              className="
                mb-2
                flex
                items-center
                justify-between
                border-b
                border-[#edf0f5]
                pb-3

                dark:border-white/[0.08]
              "
            >
              <div className="flex min-w-0 items-center gap-2">

                <MessageSquareText
                  size={19}
                  className="
                    shrink-0
                    text-[#6338ef]

                    dark:text-[#a47cff]
                  "
                />

                <h2
                  className="
                    truncate
                    text-[15px]
                    font-extrabold
                    text-[#1d233d]

                    dark:text-white
                  "
                >
                  Recent Messages
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/dashboard/messages"
                  )
                }
                className="
                  shrink-0
                  text-[10px]
                  font-semibold
                  text-[#6338ef]
                  transition
                  hover:text-[#4f24db]
                  sm:text-[11px]

                  dark:text-[#a47cff]
                  dark:hover:text-[#c0aaff]
                "
              >
                View All →
              </button>
            </div>

            <div className="max-h-[480px] overflow-y-auto pr-1">

              {loadingMessages ? (
                <div className="flex min-h-[250px] items-center justify-center">

                  <div
                    className="
                      h-7
                      w-7
                      animate-spin
                      rounded-full
                      border-4
                      border-[#e8e1ff]
                      border-t-[#6338ef]

                      dark:border-[#2c2442]
                      dark:border-t-[#9b78ff]
                    "
                  />

                </div>
              ) : messagesError ? (
                <div className="flex min-h-[250px] items-center justify-center px-3">

                  <p
                    className="
                      text-center
                      text-[11px]
                      text-[#ed4760]

                      dark:text-[#ff7188]
                    "
                  >
                    {messagesError}
                  </p>

                </div>
              ) : recentMessages.length > 0 ? (
                recentMessages.map(
                  (message, index) => (
                    <MessageRow
                      key={
                        message._id ||
                        `${message.name}-${index}`
                      }
                      message={message}
                      isLast={
                        index ===
                        recentMessages.length - 1
                      }
                    />
                  )
                )
              ) : (
                <EmptyMessageState />
              )}

            </div>
          </div>

        </section>
      </div>
    </div>
  );
}

// ============================================================
// STAT CARD
// ============================================================

function StatCard({
  icon: Icon,
  value,
  label,
  iconBg,
  iconColor,
}) {
  return (
    <div
      className="
        flex
        min-h-[92px]
        items-center
        gap-3
        rounded-[14px]
        border
        border-[#e5e7ef]
        bg-white
        px-4
        shadow-[0_4px_15px_rgba(35,45,90,0.04)]
        transition-colors
        duration-300

        dark:border-white/[0.08]
        dark:bg-[#151222]
        dark:shadow-[0_4px_15px_rgba(0,0,0,0.20)]
      "
    >
      <div
        className={`flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px] ${iconBg}`}
      >
        <Icon
          size={24}
          strokeWidth={2.3}
          className={iconColor}
        />
      </div>

      <div className="min-w-0">

        <div
          className="
            text-[25px]
            font-extrabold
            leading-none
            text-[#18203a]

            dark:text-white
          "
        >
          {value}
        </div>

        <div
          className="
            mt-2
            truncate
            text-[11px]
            font-semibold
            text-[#59647d]

            dark:text-[#aaa3ba]
          "
        >
          {label}
        </div>

      </div>
    </div>
  );
}

// ============================================================
// BIRTHDAY ROW
// ============================================================

function BirthdayRow({
  person,
  isLast,
  onWish,
}) {
  return (
    <div
      className={`
        grid
        grid-cols-[auto_minmax(0,1fr)]
        gap-x-3
        gap-y-2
        px-1
        py-3
        transition
        hover:bg-[#fafaff]

        sm:flex
        sm:min-h-[72px]
        sm:items-center
        sm:gap-3
        sm:py-2.5

        dark:hover:bg-white/[0.03]

        ${
          !isLast
            ? "border-b border-[#edf0f5] dark:border-white/[0.08]"
            : ""
        }
      `}
    >
      <div
        className="
          flex
          h-[44px]
          w-[44px]
          shrink-0
          items-center
          justify-center
          overflow-hidden
          rounded-full
          border-2
          border-white
          bg-[#e8ebf3]
          shadow-sm

          dark:border-[#302943]
          dark:bg-[#2a233d]

          sm:h-[48px]
          sm:w-[48px]
        "
      >
        {person.profilePhoto ? (
          <img
            src={person.profilePhoto}
            alt={person.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span
            className="
              text-[14px]
              font-extrabold
              text-[#6338ef]

              dark:text-[#a47cff]
            "
          >
            {person.name
              ?.charAt(0)
              ?.toUpperCase()}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">

        <h3
          className="
            truncate
            text-[12px]
            font-extrabold
            text-[#1b213b]

            dark:text-white
          "
        >
          {person.name}
        </h3>

        <p
          className="
            mt-1
            text-[9px]
            text-[#7d87a0]

            dark:text-[#928ba5]
          "
        >
          {person.date}
        </p>

      </div>

      <div
        className="
          col-span-2
          flex
          items-center
          justify-end
          gap-2

          sm:ml-auto
          sm:shrink-0
        "
      >
        <div
          className={`
            flex
            items-center
            gap-1
            rounded-[6px]
            px-2
            py-1.5

            ${
              person.today
                ? "bg-[#ffe9ee] text-[#ef405b] dark:bg-[#44232e] dark:text-[#ff7188]"
                : "bg-[#fff3df] text-[#e68d12] dark:bg-[#44331e] dark:text-[#ffb94f]"
            }
          `}
        >
          <Cake
            size={12}
            strokeWidth={2.4}
          />

          <span
            className="
              whitespace-nowrap
              text-[8px]
              font-extrabold
            "
          >
            {person.days}
          </span>
        </div>

        <button
          type="button"
          onClick={onWish}
          className="
            flex
            h-[30px]
            items-center
            gap-1
            rounded-[7px]
            bg-[#dcf8eb]
            px-3
            text-[9px]
            font-extrabold
            text-[#08ae76]
            transition

            hover:bg-[#c8f4df]

            dark:bg-[#193a31]
            dark:text-[#38d69f]
            dark:hover:bg-[#214c3f]
          "
        >
          <FaWhatsapp
            size={14}
            fill="currentColor"
          />

          <span>Wish</span>
        </button>
      </div>
    </div>
  );
}

// ============================================================
// MESSAGE ROW
// ============================================================

function MessageRow({
  message,
  isLast,
}) {
  return (
    <div
      className={`
        grid
        grid-cols-[auto_minmax(0,1fr)]
        gap-x-3
        gap-y-2
        px-1
        py-3

        sm:flex
        sm:min-h-[72px]
        sm:items-center
        sm:gap-3
        sm:py-2.5

        ${
          !isLast
            ? "border-b border-[#edf0f5] dark:border-white/[0.08]"
            : ""
        }
      `}
    >
      <div
        className="
          flex
          h-[42px]
          w-[42px]
          shrink-0
          items-center
          justify-center
          overflow-hidden
          rounded-full
          bg-[#eee9ff]

          dark:bg-[#302653]
        "
      >
        {message.profilePhoto ? (
          <img
            src={message.profilePhoto}
            alt={message.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span
            className="
              text-[12px]
              font-extrabold
              text-[#6338ef]

              dark:text-[#a47cff]
            "
          >
            {message.name
              ?.charAt(0)
              ?.toUpperCase()}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">

        <h3
          className="
            truncate
            text-[11px]
            font-extrabold
            text-[#1b213b]

            dark:text-white
          "
        >
          {message.name || "Unknown"}
        </h3>

        <p
          className="
            mt-1
            whitespace-pre-line
            break-words
            text-[9px]
            leading-4
            text-[#7d87a0]

            dark:text-[#aaa3ba]
          "
        >
          {message.message}
        </p>

        <p
          className="
            mt-1
            text-[8px]
            text-[#9aa3b6]

            dark:text-[#777087]
          "
        >
          {formatMessageDate(message.date)}
        </p>

      </div>

      <div
        className="
          col-span-2
          flex
          justify-end

          sm:ml-auto
          sm:shrink-0
        "
      >
        <div
          className="
            rounded-[6px]
            bg-[#dcf8eb]
            px-2.5
            py-1.5
            text-[8px]
            font-extrabold
            text-[#08ae76]

            dark:bg-[#193a31]
            dark:text-[#38d69f]
          "
        >
          Sent
        </div>
      </div>
    </div>
  );
}

// ============================================================
// EMPTY BIRTHDAY STATE
// ============================================================

function EmptyBirthdayState() {
  return (
    <div className="flex min-h-[250px] items-center justify-center">
      <div className="text-center">

        <div
          className="
            mx-auto
            mb-3
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-[#eee9ff]

            dark:bg-[#302653]
          "
        >
          <Cake
            size={21}
            className="
              text-[#6338ef]

              dark:text-[#a47cff]
            "
          />
        </div>

        <p
          className="
            text-[12px]
            font-bold
            text-[#252b45]

            dark:text-white
          "
        >
          No upcoming birthdays
        </p>

      </div>
    </div>
  );
}

// ============================================================
// EMPTY MESSAGE STATE
// ============================================================

function EmptyMessageState() {
  return (
    <div className="flex min-h-[250px] items-center justify-center">
      <div className="px-4 text-center">

        <div
          className="
            mx-auto
            mb-3
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-[#f1edff]

            dark:bg-[#29223e]
          "
        >
          <MessageSquareText
            size={23}
            className="
              text-[#d1c8ec]

              dark:text-[#766b8f]
            "
          />
        </div>

        <p
          className="
            text-[12px]
            font-bold
            text-[#59647d]

            dark:text-[#aaa3ba]
          "
        >
          No sent messages yet.
        </p>

        <p
          className="
            mt-1
            text-[9px]
            text-[#9aa3b6]

            dark:text-[#777087]
          "
        >
          Your sent birthday messages will appear here.
        </p>

      </div>
    </div>
  );
}

export default Dashboard;