"use client";
import React, { useState, useEffect } from "react";

const SectionBar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isBottom, setIsBottom] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSectionId = "";

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 50) {
          currentSectionId = section.getAttribute("id") || "";
        }
      });

      setActiveSection(currentSectionId);

      // Check if the user is near the bottom of the page
      const scrollPosition = window.scrollY + window.innerHeight;
      const threshold = document.body.offsetHeight - 100; // Adjust this value as needed
      setIsBottom(scrollPosition >= threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`flex items-center justify-center p-5 bg-white shadow-md ${
        isBottom ? "relative" : "sticky top-0 z-10"
      }`}
    >
      <div className="flex items-center space-x-6">
        <a
          href="#overview"
          className={`text-gray-600 hover:text-gray-800 ${
            activeSection === "overview" ? "text-blue-600 underline" : ""
          }`}
        >
          Overview
        </a>
        <a
          href="#highlight"
          className={`text-gray-600 hover:text-gray-800 ${
            activeSection === "highlight" ? "text-blue-600 underline" : ""
          }`}
        >
          Highlight
        </a>
        <a
          href="#package"
          className={`text-gray-600 hover:text-gray-800 ${
            activeSection === "package" ? "text-blue-600 underline" : ""
          }`}
        >
          Package
        </a>
        <a
          href="#more"
          className={`text-gray-600 hover:text-gray-800 ${
            activeSection === "more" ? "text-blue-600 underline" : ""
          }`}
        >
          More
        </a>
        <a
          href="#description"
          className={`text-gray-600 hover:text-gray-800 ${
            activeSection === "description" ? "text-blue-600 underline" : ""
          }`}
        >
          Description
        </a>
      </div>
    </nav>
  );
};

export default SectionBar;
