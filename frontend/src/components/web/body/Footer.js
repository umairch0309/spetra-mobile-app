import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getSocialLinks } from "../../../services/web";
import "./footer.css";

export default function Footer() {
  // getting social links data
  const { data, isLoading } = useQuery("socialLinks", getSocialLinks, {
    staleTime: 1000 * 60,
    refetchOnMount: false,
  });
  const links = data?.data;

  // main return
  return (
    <footer className="footerBg">
      <div className="basicLandingRow footer footerPadding">
        <div className="footerFlex">
          <div className="footerItem">
            <img
              className="logo"
              src="/images/logoBlue.svg"
              alt="footerLogo"
            ></img>
            <div className="text">
              My Cloud Doc provides access to a wide range of specialists and
              general practitioners with the right experience and expertise for
              your own unique concerns. Best of all, without the burden of
              travel, you can arrange appointments for a day and time that best
              suits your preferences and schedule.
            </div>
          </div>
          <div className="footerItem mt-3">
            <div className="footerTitle">Useful Links</div>
            <Link to="/terms-and-condition" className="footerLink">
              Terms Of Use
            </Link>
            <br />
            <Link to="/privacy-policy" className="footerLink">
              Privacy Policy
            </Link>
            <br />
            <Link to="/about-us" className="footerLink">
              About Us
            </Link>
            <br />
            <Link to="contact-us" className="footerLink">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <div className="copyRightDiv">
        <span className="pr-3">
          Copyright © 2021 My Cloud Doc Inc. All rights reserved
        </span>
        {isLoading || (
          <div className="flexCenter" style={{ flexWrap: "nowrap" }}>
            <a href={links?.facebook} target="blank">
              <img
                src="/images/fb.png"
                alt="social"
                className="socialImg socialFb"
              ></img>
            </a>
            <a href={links?.twitter} target="blank">
              <img
                src="/images/twitter.png"
                alt="social"
                className="socialImg"
              ></img>
            </a>

            <a href={links?.instagram} target="blank">
              <img
                src="/images/insta.png"
                alt="social"
                className="socialImg"
              ></img>
            </a>
          </div>
        )}
      </div>
    </footer>
  );
}
