"use client";
import React, { useState } from "react";
import Image from "next/image";

const NavBar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/original/test-discovery/2024/03/01/ac13e03e-896c-4bbb-ba7c-cdf9b04a68b7-1709290197088-cb26aa8c25b24b1aa5df8bb2edce7ea7.png"
          alt="Logo"
          className="h-8"
          height="32"
          width="128"
        />
      </div>
      <div className="hidden md:flex items-center space-x-6">
        <img src="/handshake.png" alt="Indonesia Flag" className="h-4 w-6" />
        <a href="#" className="text-gray-600 hover:text-gray-800">
          Jadi Partner tiket.com
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-800">
          Blibli Tiket Rewards
        </a>
        <div className="flex items-center space-x-1">
          <span className="text-gray-600">IDR</span>
          <img
            src="/indonesia-flag.png"
            alt="Indonesia Flag"
            className="h-4 w-6"
          />
        </div>
        <div className="relative">
          <button className="relative text-gray-600 hover:text-gray-800">
            <img
              src="/mail.png"
              alt="Mail"
              className="h-4 w-6"
              height={250}
              width={100}
            />
          </button>
        </div>
        <div className="relative">
          <div
            className="h-8 w-8 bg-yellow-500 text-white flex items-center justify-center rounded-full cursor-pointer"
            onClick={toggleDropdown}
          >
            HH
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="md:hidden flex items-center">
        <button
          className="text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md z-10">
          <div className="flex flex-col items-end p-4 space-y-4">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Jadi Partner tiket.com
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Blibli Tiket Rewards
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Profile
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Setting
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Logout
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
