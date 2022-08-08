import React from "react";
import NavigationBar from "./NavigationBar";
import { Wrapper } from "./Wrapper";

export const Layout = ({ children }: any) => {
  return (
    <>
      <NavigationBar />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default Layout;
