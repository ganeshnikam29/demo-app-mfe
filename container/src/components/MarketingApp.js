import React, { useRef, useEffect } from "react";
import { mount } from "marketing/MarketingIndex";
import { useHistory } from 'react-router-dom'; // Borwser history

const MarketingApp = () => {
  const ref = useRef(null);
  const history = useHistory()

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current,{ 
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        if(pathname !== nextPathname) {
          history.push(nextPathname)
        }
      }
    });

    if(onParentNavigate) {
      history.listen(onParentNavigate)
    }
  }, []);

  return <div ref={ref}></div>;
};

export default MarketingApp;
