import React from "react";
import Feature from "./Feature";

function FeatureList({ features }) {
  return (
    <div className="grid lg:grid-cols-3 gap-3 w-full">
      {features.map(({ image, title, text }) => (
        <Feature image={image} title={title} text={text} />
      ))}
    </div>
  );
}

export default FeatureList;
