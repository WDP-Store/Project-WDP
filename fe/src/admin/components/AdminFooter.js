import React from "react";
export default function AdminFooter() {
  return (
    <footer style={{ background: "white" }}>
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        &copy; {new Date().getFullYear()} Copyright: Made with by group 4
        SDN301m from FPT University
      </div>
    </footer>
  );
}
