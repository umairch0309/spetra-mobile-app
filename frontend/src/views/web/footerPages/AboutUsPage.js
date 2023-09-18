import React from "react";
import AppWrapper from "../../../components/web/wrapper/AppWrapper";

import "./aboutUs.css";
export default function AboutUsPage() {
  // main return
  return (
    <AppWrapper>
      <div className="headerPadding">
        <div className="basicLandingRow aboutUs">
          <div className="centerFlex" style={{ height: "30vh" }}>
            <div>
              <div className="basicLandingTitle text-center">My Cloud Doc</div>
              <div className="subTitle text-center">
                Full-Spectrum Virtual Care Connecting Patients and Doctors
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="text ">
            My Cloud Doc platform helps pair enterprising doctors with the
            patients looking for their singular qualifications and offerings.
          </div>
          <div className="title">
            Making Healthcare Affordable and Accessible
          </div>
          <div className="text">
            Thanks to comprehensive telemedicine, quality healthcare is
            expanding its reach. The digital age has opened new doors for both
            patient access and doctor availability. We are a New York-based
            telemedicine platform optimizing virtual healthcare. My Cloud Doc
            provides an end-to-end telemedicine solution for both patients and
            doctors searching for wider options and a more specific fit for
            their healthcare requirements.
            <br />
            <br /> With face-to-face communication and consultation, advanced
            telemedicine provides many of the same benefits as in-person
            consultations. Above all, patients and practices are no longer bound
            by location. The specialist with niche expertise and that patient
            with rare or unique needs can now leverage the advantages of superb
            technology and easily find each other online.
          </div>
          <div className="title">Prioritizing individuals</div>
          <div className="text">
            My Cloud Doc empowers people to take control of their
            well-being—while allowing doctors to bring their skills to the
            people who need them most.
          </div>
          <div className="title">For Patients</div>
          <div className="text">
            We all form an important bond with our healthcare providers. You
            want the freedom to view a selection of professionals who are most
            qualified to address your needs — regardless of where in the world
            either of you may reside.
            <br />
            <br />
            My Cloud Doc provides access to a wide range of specialists and
            general practitioners with the right experience and expertise for
            your own unique concerns. Best of all, without the burden of travel,
            you can arrange appointments for a day and time that best suits your
            preferences and schedule.
          </div>
          <div className="title">For Doctors</div>
          <div className="text">
            My Cloud Doc gives you the ability to enrich your profession by
            treating people across the world. Market yourself as a featured
            doctor, emphasize your specializations, access new patients, and
            extend your services and care beyond the confines of your immediate
            location.
            <br />
            <br />
            My Cloud Doc helps you develop your brand and optimize your
            operations through strong data analytics and insights. You’ll
            efficiently manage your workload and discover a breadth of new
            opportunities.
          </div>
        </div>
        <div className="footerPadding"></div>
      </div>
    </AppWrapper>
  );
}
