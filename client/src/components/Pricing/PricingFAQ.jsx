import React, { useState } from "react";
import { ChevronDown, CircleHelp } from "lucide-react";

function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "Can I use BirthBuddy for free?",
      answer:
        "Yes! BirthBuddy offers a free plan with essential features to help you manage birthdays, organize important dates, and stay connected with your loved ones.",
    },
    {
      id: 2,
      question: "Can I cancel anytime?",
      answer:
        "Yes. You can cancel your plan anytime without any long-term commitment. Your access will remain available according to the terms of your current plan.",
    },
    {
      id: 3,
      question: "How do WhatsApp reminders work?",
      answer:
        "BirthBuddy can send birthday reminders through WhatsApp, helping you remember important dates and giving you timely notifications so you never miss a special occasion.",
    },
    {
      id: 4,
      question: "Is my data secure?",
      answer:
        "Yes. We take your privacy and security seriously. Your personal information and birthday data are protected using appropriate security measures and are only used to provide and improve the BirthBuddy experience.",
    },
    {
      id: 5,
      question: "Can I change my plan later?",
      answer:
        "Yes. You can upgrade or change your plan whenever your needs change. Your account and saved birthday information will remain available when you switch plans.",
    },
    {
      id: 6,
      question: "What happens to my data if I cancel?",
      answer:
        "When you cancel your plan, your data is not immediately deleted. Your information can remain associated with your account according to BirthBuddy's data-retention policy.",
    },
  ];

  const FAQItem = ({ faq }) => {
    const isOpen = openIndex === faq.id;

    return (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {/* Question */}
        <button
          type="button"
          onClick={() => setOpenIndex(isOpen ? null : faq.id)}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        >
          <span className="text-sm font-semibold text-[#10194A]">
            {faq.question}
          </span>

          <ChevronDown
            size={18}
            className={`shrink-0 text-[#5820C7] transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Answer */}
        {isOpen && (
          <div className="px-5 pb-5">
            <p className="text-sm leading-6 text-[#64748B]">
              {faq.answer}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="bg-white px-6 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">

        {/* ================= HEADING ================= */}

        <div className="text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F1ECFF] px-4 py-2 shadow-sm">
            <CircleHelp
              size={14}
              className="text-[#5820C7]"
              fill="#DCD0FF"
            />

            <span className="text-[11px] font-bold text-[#5820C7]">
              Frequently Asked Questions
            </span>
          </div>

          {/* Heading */}
          <h2 className="mt-4 text-3xl font-black tracking-tight text-[#10194A]">
            Have Questions? We've Got Answers.
          </h2>

          {/* Description */}
          <p className="mt-2 text-sm text-[#64748B]">
            Everything you need to know about BirthBuddy pricing and plans.
          </p>
        </div>

        {/* ================= FAQ QUESTIONS ================= */}

        <div className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-2 md:items-start">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-3">
            {faqs
              .filter((_, index) => index % 2 === 0)
              .map((faq) => (
                <FAQItem key={faq.id} faq={faq} />
              ))}
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-3">
            {faqs
              .filter((_, index) => index % 2 !== 0)
              .map((faq) => (
                <FAQItem key={faq.id} faq={faq} />
              ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default PricingFAQ;