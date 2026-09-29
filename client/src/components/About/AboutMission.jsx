import React from "react";
import {
  CalendarDays,
  Users,
  Heart,
  Sparkles,
} from "lucide-react";

function AboutMission() {
  const cards = [
    {
      icon: CalendarDays,
      title: "Remember",
      description: "Never forget the important dates.",
      color: "#F43F5E",
      bg: "from-[#FFF1F4] to-[#FFE4EA]",
    },
    {
      icon: Users,
      title: "Connect",
      description: "Stay connected with friends and family.",
      color: "#0284C7",
      bg: "from-[#EFF8FF] to-[#DBEAFE]",
    },
    {
      icon: Heart,
      title: "Celebrate",
      description: "Make every birthday feel special.",
      color: "#F59E0B",
      bg: "from-[#FFF8E7] to-[#FEF3C7]",
    },
  ];

  return (
    <section className="relative rounded-t-[40px] bg-white px-6 py-12 sm:px-8 lg:px-10">

      <div className="mx-auto max-w-6xl">

        <div className="text-center">

          <div className="inline-flex items-center gap-2 rounded-full bg-[#F4EEFF] px-3 py-1.5 text-xs font-semibold text-[#6938EF]">
            <Sparkles size={13} fill="#A78BFA" />
            Our Mission
          </div>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#10194A]">
            Our Mission
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-[#526078]">
            We want to make it easier for people to stay connected with
            the people they care about.
            <br />
            BirthBuddy helps you remember important dates, so you can focus
            on building stronger relationships.
          </p>

        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="group rounded-2xl border border-[#E9E5F1] bg-white p-6 text-center shadow-[0_10px_30px_rgba(35,20,80,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(50,30,110,0.12)]"
              >

                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${card.bg} shadow-[inset_0_3px_8px_rgba(255,255,255,0.9),0_8px_20px_rgba(40,20,80,0.10)] transition-transform duration-500 group-hover:scale-110`}
                >

                  <Icon
                    size={29}
                    strokeWidth={1.8}
                    style={{ color: card.color }}
                    fill={card.color}
                  />

                </div>

                <h3 className="mt-3 text-lg font-black text-[#10194A]">
                  {card.title}
                </h3>

                <p className="mx-auto mt-1 max-w-[190px] text-sm leading-5 text-[#526078]">
                  {card.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default AboutMission;