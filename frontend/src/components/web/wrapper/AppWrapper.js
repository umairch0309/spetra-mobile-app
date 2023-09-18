import React from "react";
import Footer from "../body/Footer";
import Header from "../body/Header";

export default function AppWrapper(props) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}
