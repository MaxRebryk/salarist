import * as React from "react";
import AppBar from "../AppBar/AppBar";

export interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <>
      <AppBar />
      {children}
    </>
  );
}
