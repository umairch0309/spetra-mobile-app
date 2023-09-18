import React from "react";
import LoadingComponent from "@material-ui/core/CircularProgress";
export default function Loading({ height = "80vh" }) {
  return (
    <div className="centerFlex" style={{ height: height, width: "100%" }}>
      <LoadingComponent />
    </div>
  );
}
