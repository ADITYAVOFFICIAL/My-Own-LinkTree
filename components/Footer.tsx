"use client";
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex martoper items-center justify-center p-4 bg-transparent text-white font-bold">
      <p className="text-center text-sm">
        &copy; {currentYear} Aditya Verma. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
