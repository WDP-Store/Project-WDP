import { createContext, useEffect, useRef, useState } from "react";

export const State = createContext();

function StateContext({ children }) {
  const [width] = useState(641);

  const componentRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (window.innerWidth < width) {
      alert("Place your phone in landscape mode for the best experience");
    }
  }, [width]);

  const context = {
    width,
    componentRef,
    handlePrint,
  };

  return <State.Provider value={context}>{children}</State.Provider>;
}

export default StateContext;