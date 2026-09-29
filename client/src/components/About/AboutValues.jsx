import React from "react";
import {
  Shield,
  Sparkles,
  Users,
  Smile,
  Heart,
} from "lucide-react";

function AboutValues() {
  const values = [
    {
      icon: Shield,
      title: "Privacy",
      description:
        "We respect your personal information and keep your data safe and secure.",
      color: "#7C3AED",
      bg: "from-[#F3EEFF] to-[#E9D5FF]",
    },
    {
      icon: Sparkles,
      title: "Simplicity",
      description:
        "Birthday reminders should be effortless and easy to use.",
      color: "#0284C7",
      bg: "from-[#EFF8FF] to-[#DBEAFE]",
    },
    {
      icon: Users,
      title: "Connection",
      description:
        "Technology should help people stay connected with the ones they care about.",
      color: "#EC4899",
      bg: "from-[#FFF1F8] to-[#FCE7F3]",
    },
    {
      icon: Smile,
      title: "Happiness",
      description:
        "Small gestures can create meaningful moments and brighter days.",
      color: "#F59E0B",
      bg: "from-[#FFF8E7] to-[#FEF3C7]",
    },
  ];

  return (
    <section className="px-6 py-10 sm:px-8 lg:px-10">

      <div className="mx-auto max-w-6xl">

        <div className="text-center">

          <div className="inline-flex items-center gap-2 rounded-full bg-[#F4EEFF] px-3 py-1.5 text-xs font-semibold text-[#6938EF]">
            <Heart size={13} fill="#38BDF8" />
            Our Values
          </div>

          <h2 className="mt-3 text-3xl font-black">
            What We Stand For
          </h2>

          <p className="mt-2 text-sm text-[#526078]">
            These values guide everything we do at BirthBuddy.
          </p>

        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {values.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-[#E9E5F1] bg-white p-5 text-center shadow-[0_10px_30px_rgba(35,20,80,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(50,30,110,0.10)]"
              >

                <div
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${item.bg} shadow-[0_8px_20px_rgba(50,30,110,0.08)] transition-transform duration-300 group-hover:scale-110`}
                >

                  <Icon
                    size={28}
                    strokeWidth={1.8}
                    style={{ color: item.color }}
                    fill={item.color}
                  />

                </div>

                <h3 className="mt-3 text-base font-black">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-[#526078]">
                  {item.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default AboutValues;