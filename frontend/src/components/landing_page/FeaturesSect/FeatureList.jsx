import React from "react";
import Feature from "./Feature";

function FeatureList({ features }) {
  return (
    <div className="grid md:grid-cols-3 gap-10 w-full">
      {features.map(({id, image, title, text }) => (
        <Feature image={image} title={title} text={text} key={id} />
      ))}
    </div>
  );
}

export default FeatureList;
