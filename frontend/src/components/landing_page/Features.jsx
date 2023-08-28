import React from "react";
import { featureIcon1, featureIcon2, featureIcon3 } from "../../assets";
import { FeatureList } from "./FeaturesSect";

function Features() {
  const features = [
    {
      id: 1,
      image: featureIcon1,
      title: "Share notes with friends",
      text: "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
    },
    {
      id: 2,
      image: featureIcon2,
      title: "Auto Completion",
      text: "An all-in-one customer service platform that helps you balance everything your customers need to be happy.",
    },
    {
      id: 3,
      image: featureIcon3,
      title: "Manage your notes with friends",
      text: "Measure what matters with Untitled’s easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.",
    },
  ];
  return (
    <div>
      <div className="custom-container">
        <h2 className="text-[40px] md:text-[57px] font-medium mb-9 text-center font-clash">
          Features
        </h2>
        <FeatureList features={features} />
      </div>
    </div>
  );
}

export default Features;
