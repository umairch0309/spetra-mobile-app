import React from "react";
// component imports
import AppWrapper from "../../../components/web/wrapper/AppWrapper";
import ChooseDoctor from "../../../components/web/landingPage/ChooseDoctor";
import FiveStarDoctor from "../../../components/web/landingPage/FiveStarDoctor";
import LandingSlider from "../../../components/web/landingPage/LandingSlider";
import MedicalSpecialities from "../../../components/web/landingPage/MedicalSpecialities";
import PatientReview from "../../../components/web/landingPage/PatientReview";
import ProviderSec from "../../../components/web/landingPage/ProviderSec";
import StepsSection from "../../../components/web/landingPage/StepsSection";
// css imports
import "./landingPage.css";
export default function LandingPage() {
  return (
    <div>
      <AppWrapper>
        <LandingSlider />
        <ChooseDoctor />
        <MedicalSpecialities />
        <StepsSection />
        <ProviderSec />
        <FiveStarDoctor />
        <PatientReview />
      </AppWrapper>
    </div>
  );
}
