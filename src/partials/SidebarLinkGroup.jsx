import React, { useState } from "react";
import { useDashboard } from "../context/DashboardContext";

function SidebarLinkGroup({ children, activecondition }) {
  const { activeSection, setActiveSection } = useDashboard();
  const handleClick = (section) => {
    setActiveSection(section);
    console.log("set section to", section);
  };

  return (
    <li
      className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))]`}
    >
      {children(handleClick, open)}
    </li>
  );
}

export default SidebarLinkGroup;
