import React, { useRef, useEffect } from "react";
import { mount } from "marketing/MarketingIndex";

const MarketingApp = () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref}></div>;
};

export default MarketingApp;
