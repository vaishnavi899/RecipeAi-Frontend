import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";

function Layout({ children }) {
  const location = useLocation();
  const allowedPaths = ["/", "/dashboard"];
  const showHeader = allowedPaths.includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      <div>{children}</div>
    </>
  );
}

export default Layout;
