import React from "react";

const Container = (props) => {
  return (
    <section className={props.class1} style={{ backgroundColor: "#FDFFE2" }}>
      <div className="container-xxl">{props.children}</div>
    </section>
  );
};

export default Container;
