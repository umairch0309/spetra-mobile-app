import React, { useState } from "react";

export default function FaqSec({ data }) {
  const name = data?.name;
  const isVideo = data?.isVideo;
  const isAccepting = data?.physicalTimeSlot?.length > 0;
  const faqData = [
    {
      title: `How soon can I make an appointment with Dr.${name}?`,
      text: `Generally, Dr. ${name} has appointments available on cloud doc within 1 week. You can see ${name} earliest availability on Cloud Doc and make an appointment online.`,
    },
    {
      title: `Is Dr. ${name} accepting new patients?`,
      text: `Dr. ${name} generally ${
        isAccepting ? "accepts" : " not accepting"
      } new patients on cloud doc. You can see Dr. ${name} earliest availability on Cloud Doc and schedule an appointment online.`,
    },
    {
      title: `Can I make an appointment with Dr. ${name} online?`,
      text: isVideo
        ? `Yes, you can make an appointment online with Dr. ${name} using Cloud Doc. It’s simple, secure, and free.`
        : `No, you can not make an appointment online with Dr. ${name} using Cloud Doc.`,
    },
    {
      title: `Does Dr. ${name} accept my insurance?`,
      text: isVideo
        ? `Yes, you can make an appointment online with Dr. ${name} using Cloud Doc. It’s simple, secure, and free.`
        : `No, you can not make an appointment online with Dr. ${name} using Cloud Doc.`,
    },
    {
      title: `Which hospital is Dr.${name} affiliated with?`,
      text: `Dr. ${name} is affilated with ${data?.hospital?.map(
        (item) => `${item}, `
      )}`,
    },
    {
      title: `What practice does Dr. ${name} work with?`,
      text: `Dr. ${name} is does these ${data?.practices?.map(
        (item) => `${item}, `
      )} practices`,
    },
    {
      title: `Which board certifications does  Dr. ${name} have?`,
      text: `Dr. ${name} is have certifications from  ${data?.education?.map(
        (item) => `${item}, `
      )} practices`,
    },
    {
      title: `What are some common reasons for patients to see  Dr. ${name} ?`,
      text: `Dr. ${name} have specialization in  ${data?.speciality} , so most patient visit reason is related to his specializations disease`,
    },
    {
      title: `What languages does  Dr. ${name} speak?`,
      text: `Dr. ${name} speaks ${data?.languages?.map(
        (item) => `${item.name}, `
      )}`,
    },
    {
      title: `How do patients rate Dr. ${name} in reviews?
`,
      text: `Dr. ${name} have overall rating of ${data?.rating} with ${data?.noOfReview} reviews. He mantains waiting rating of ${data?.waitingRating}  `,
    },
  ];
  return (
    <div className=" faqSec">
      <div className="title">Frequently asked questions</div>
      {faqData.map((item, index) => {
        return <QuestionComponent {...item} key={index} />;
      })}
    </div>
  );
}

const QuestionComponent = ({ title, text }) => {
  const [active, setActive] = useState(false);
  return (
    <>
      <div
        onClick={() => {
          setActive(!active);
        }}
        className="qestionDiv"
      >
        <span>{title}</span>
        <img
          src={active === true ? "/images/minus.png" : "/images/plus.png"}
          className="img pointer"
        ></img>
      </div>

      {active && <div className="text mb-4 mt-3">{text}</div>}
    </>
  );
};
