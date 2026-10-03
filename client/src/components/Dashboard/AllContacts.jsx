import React,{useContext,useState,useEffect} from "react";
import {
  Users,
  Cake,
  Gift,
  UserPlus,
  Search,
  CalendarDays,
  ArrowUpDown,
  Plus,
  ChevronDown,
  Pencil,
  Trash2,
} from "lucide-react";
import {useNavigate, NavLink} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";


const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN",{
    day:"2-digit",
    month:"short",
    year:"numeric",
  });
};


const getDaysLeft = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  const birthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  // if birthday already passed this year
  // use next year's birthday
  if(birthday < today){
    birthday.setFullYear(today.getFullYear() + 1);
  }

  const difference = birthday - today;

  return Math.ceil(difference/(1000*60*60*24));
};


function AllContacts() {

  const[contacts,setContacts] = useState([]);

  const {accessToken,setAccessToken} = useContext(AuthContext);

  const navigate = useNavigate();


  const getAllPersons = async() => {

    try{

      const response = await axios.get(
        "http://localhost:3000/api/persons",
        {
          headers:{
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setContacts(response.data.persons);

      console.log("Persons:",response.data.persons);

    }catch(error){

      console.log("GET PERSONS ERROR:",error);

      if(error.response?.status === 401){

        try{

          const refreshResponse = await axios.post(
            "http://localhost:3000/api/auth/refresh",
            {},
            {
              withCredentials: true,
            }
          );

          const newAccessToken = refreshResponse.data.accessToken;

          setAccessToken(newAccessToken);

          const retryResoponse = await axios.get(
            "http://localhost:3000/api/persons",
            {
              headers:{
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );

          setContacts(retryResoponse.data.persons);

        }catch(refreshError){

          if(refreshError.response?.status === 401){

            alert("Session expired. Please login again.");

            setTimeout(() => {
              navigate("/login");
            },2000);

          }

        }

      }

    }

  };
  const handleEdit = (id) => {
    navigate(`/dashboard/add-person/${id}`)
  }
  const handleDelete = async(id) => {
    try{
      const response = await axios.delete(
        `http://localhost:3000/api/persons/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      // remove deleted contact  from ui
      setContacts((prevContacts) => {
        return prevContacts.filter((contact) => contact._id !== id)
      });

    }catch(error){
      console.log("DELETE PERS0N ERROR:", error);
      if(error.response?.status === 401){
        try{
          // get new access token
          const refreshResponse =  await axios.post(
            "http://localhost:3000/api/auth/refresh",
            {},
            {
              withCredentials: true,
            }
          );
          const newAccessToken = refreshResponse.data.accessToken;
          // save new token in AuthContext
          setAccessToken(newAccessToken);
          // retry delete request 
          const retryResponse = await axios.delete(
            `http://localhost:3000/api/persons/${id}`,
            {
              headers:{
                Authorization: `Bearer ${newAccessToken}`,

              },
            }
          );
          console.log(retryResponse.data);
          // Remove from ui
          setContacts ((prevContacts) => {
            return prevContacts.filter((contact) => contact._id !== id)
          });
        }catch(refreshError){
          if(refreshError.response?.status === 401){
            alert("Session expired. Please login again.");
            setTimeout(() => {
              navigate("/login");
            },2000);
          }
        }
      }else{
        console.log("DELETE PERSON ERROR:",error);
      }
    }
  };


  useEffect(() => {

    if(accessToken){
      getAllPersons();
    }

  },[accessToken]);


  return (

    <div className="min-h-screen bg-[#f7f8ff] px-3 py-4 sm:px-5 lg:px-7">

      <div className="mx-auto max-w-[1500px]">


        {/* ================= HERO HEADER ================= */}

        <section className="relative mb-4 h-[150px] overflow-hidden rounded-[18px] border border-white bg-gradient-to-r from-[#faf8ff] via-[#f7efff] to-[#eee8ff] shadow-[0_8px_30px_rgba(73,45,150,0.07)]">

          <div className="absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[#dfccff]/40 blur-3xl" />

          <div className="absolute right-[30%] -top-20 h-48 w-48 rounded-full bg-[#f6d4ff]/40 blur-3xl" />

          <div className="relative z-10 px-5 pt-5 sm:px-7">

            <div className="flex items-center gap-2">

              <h1 className="text-[27px] font-extrabold tracking-[-0.8px] text-[#101631] sm:text-[32px]">
                All Contacts
              </h1>

              <Users
                size={29}
                strokeWidth={2.5}
                className="text-[#6738ef]"
              />

            </div>

            <p className="mt-0.5 text-[11px] font-medium text-[#78829c] sm:text-[13px]">
              Manage your contacts and keep track of their special days.
            </p>

          </div>


          {/* Decorative Illustration */}

          <div className="absolute right-[8%] top-[-15px] hidden md:block">

            <div className="relative h-[145px] w-[300px]">

              <div className="absolute left-[85px] top-[5px] h-[125px] w-[82px] rotate-[5deg] rounded-[10px] bg-gradient-to-br from-[#7d43f4] to-[#5422d7] shadow-[0_15px_25px_rgba(78,35,190,0.25)]">

                <div className="absolute left-1/2 top-[30px] flex h-[35px] w-[35px] -translate-x-1/2 items-center justify-center rounded-full bg-white/90">

                  <Users
                    size={21}
                    className="text-[#7540eb]"
                    fill="#7540eb"
                  />

                </div>

              </div>


              <span className="absolute left-[50px] top-[30px] text-xl">
                ✦
              </span>

              <span className="absolute left-[40px] top-[70px] text-xl">
                💗
              </span>

              <span className="absolute right-[70px] top-[5px] text-lg">
                💜
              </span>

              <span className="absolute right-[25px] top-[55px] text-xl">
                ⭐
              </span>


              <div className="absolute right-[-10px] top-[35px] w-[105px] rotate-[7deg] rounded-sm bg-[#fff4c9] px-3 py-2 text-center shadow-md">

                <p className="text-[9px] font-bold leading-3 text-[#35333b]">
                  People
                  <br />
                  make life
                  <br />
                  more special!
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ================= STAT CARDS ================= */}

        <section className="mb-3 grid grid-cols-2 gap-3 md:grid-cols-4">

          <StatCard
            icon={Users}
            value="0"
            label="Total Contacts"
            iconBg="bg-[#eee9ff]"
            iconColor="text-[#6338ef]"
          />

          <StatCard
            icon={Cake}
            value="0"
            label="Birthdays This Week"
            iconBg="bg-[#fff0f3]"
            iconColor="text-[#f0445f]"
          />

          <StatCard
            icon={Gift}
            value="0"
            label="Birthdays This Month"
            iconBg="bg-[#fff5df]"
            iconColor="text-[#f3a300]"
          />

          <StatCard
            icon={UserPlus}
            value="+"
            label="Add New Contact"
            iconBg="bg-[#e5faf2]"
            iconColor="text-[#0bb77c]"
          />

        </section>


        {/* ================= FILTER BAR ================= */}

        <section className="mb-2 rounded-[9px] border border-[#e7e9f1] bg-white p-2 shadow-[0_4px_18px_rgba(35,45,90,0.04)]">

          <div className="flex flex-col gap-2 lg:flex-row">


            {/* Search */}

            <div className="relative flex-1">

              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7c86a0]"
              />

              <input
                type="text"
                placeholder="Search by name, phone or email..."
                className="h-[35px] w-full rounded-[6px] border border-[#dfe2eb] bg-white pl-9 pr-3 text-[10px] text-[#313850] outline-none placeholder:text-[#98a1b5] focus:border-[#7650ee] focus:ring-2 focus:ring-[#7650ee]/10"
              />

            </div>


            <FilterButton
              icon={CalendarDays}
              text="All Birthdays"
            />

            <FilterButton
              icon={ArrowUpDown}
              text="Sort by Name"
            />


            <NavLink
              to="/dashboard/add-person"
              type="button"
              className="flex h-[35px] items-center justify-center gap-2 rounded-[7px] bg-gradient-to-r from-[#6331ed] to-[#793dff] px-5 text-[11px] font-bold text-white shadow-[0_5px_14px_rgba(99,49,237,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(99,49,237,0.3)]"
            >

              <Plus size={14} strokeWidth={2.5} />

              Add Person

            </NavLink>

          </div>

        </section>


        {/* ================= CONTACT TABLE ================= */}

        <section className="overflow-hidden rounded-[10px] border border-[#e5e7ef] bg-white shadow-[0_5px_22px_rgba(35,45,90,0.05)]">

          {/* ONLY CHANGE: added max height + vertical scrolling */}

          <div className=" max-h-[400px] overflow-y-auto overflow-x-auto">

            <table className="w-full relative min-w-[850px] border-collapse">

              <thead className="sticky top-0 z-10">

                <tr className="border-b border-[#e7e9f0] bg-[#fafbff]">

                  <th className="w-[40px] px-3 py-2 text-left">

                    <input
                      type="checkbox"
                      className="h-[13px] w-[13px] accent-[#6337ef]"
                    />

                  </th>

                  <TableHeader text="Name" sort />

                  <TableHeader text="Date of Birth" sort />

                  <TableHeader text="Days Left" sort />

                  <TableHeader text="Phone Number" sort />


                  <th className="px-3 py-2 text-left text-[9px] font-extrabold uppercase tracking-wide text-[#68728c]">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {contacts.map((contact) => (

                  <tr
                    key={contact._id}
                    className="border-b border-[#eef0f5]"
                  >

                    <td className="px-3 py-3">

                      <input
                        type="checkbox"
                        className="h-[13px] w-[13px] accent-[#6337ef]"
                      />

                    </td>


                    <td className="px-3 py-3">

                      <div className="flex items-center gap-2">

                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eee9ff] text-[11px] font-bold text-[#6337ef]">
                          {contact.fullName?.charAt(0)}
                        </div>

                        <span className="text-[11px] font-bold text-[#20263d]">
                          {contact.fullName}
                        </span>

                      </div>

                    </td>


                    <td className="px-3 py-3 text-[10px] text-[#59637d]">
                      {formatDate(contact.dateOfBirth)}
                    </td>


                    <td className="px-3 py-3 text-[10px] text-[#59637d]">
                      {getDaysLeft(contact.dateOfBirth)} days
                    </td>


                    <td className="px-3 py-3 text-[10px] text-[#59637d]">
                      {contact.phone || "-"}
                    </td>


                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="rounded-md p-1.5 text-[#6337ef] hover:bg-[#f1edff]"
                          title="Edit"
                          onClick={() => 
                            handleEdit(contact._id)
                          }
                        >
                          <Pencil size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            handleDelete(contact._id);
                          }}
                          className="rounded-md p-1.5 text-red-500 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

      </div>

    </div>

  );

}


/* ================= STAT CARD ================= */

function StatCard({
  icon: Icon,
  value,
  label,
  iconBg,
  iconColor,
}) {

  return (

    <div className="relative flex h-[57px] items-center gap-3 overflow-hidden rounded-[10px] border border-[#e8eaf2] bg-white px-3 shadow-[0_4px_15px_rgba(35,45,90,0.04)] transition-all duration-200">

      <div
        className={`flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[9px] ${iconBg}`}
      >

        <Icon
          size={19}
          strokeWidth={2.4}
          className={iconColor}
        />

      </div>


      <div>

        <h3 className="text-[16px] font-extrabold leading-none text-[#171c38]">
          {value}
        </h3>

        <p className="mt-1 text-[9px] font-medium text-[#727d98]">
          {label}
        </p>

      </div>

    </div>

  );

}


/* ================= FILTER BUTTON ================= */

function FilterButton({
  icon: Icon,
  text,
}) {

  return (

    <button
      type="button"
      className="flex h-[35px] min-w-[125px] items-center justify-between gap-3 rounded-[6px] border border-[#dfe2eb] bg-white px-3 text-[10px] font-semibold text-[#59637d] transition hover:border-[#9b84ee]"
    >

      <span className="flex items-center gap-2">

        <Icon
          size={14}
          className="text-[#68738f]"
        />

        {text}

      </span>

      <ChevronDown size={13} />

    </button>

  );

}


/* ================= TABLE HEADER ================= */

function TableHeader({
  text,
  sort,
}) {

  return (

    <th className="px-3 py-2 text-left">

      <div className="flex items-center gap-1 text-[9px] font-extrabold text-[#68728c]">

        {text}

        {sort && (

          <ArrowUpDown
            size={10}
            className="text-[#8a93aa]"
          />

        )}

      </div>

    </th>

  );

}


export default AllContacts;