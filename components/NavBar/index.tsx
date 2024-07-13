"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import logo from "@/public/logo.png";
import { BellRing, HeartHandshake, Mail, MailPlus } from "lucide-react";
import Image from "next/image";
import logoWhite from "@/public/logo-white.webp";
import Link from "next/link";

const NavBar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const pathname = usePathname();

  return (
    <nav
      className={`flex items-center justify-between p-4  ${
        pathname === "/"
          ? `bg-transparent shadow-none text-white hover:text-white`
          : `bg-white shadow-md text-gray-600 hover:text-gray-800 border-b-[1px] border-gray-300 px-72`
      }`}
    >
      <div className="flex items-center space-x-4">
        <Link href={"/"}>
          {pathname === "/" ? (
            <Image
              src={logoWhite}
              alt="logo"
              className="w-[90px] md:w-[128px]  h-fit"
            />
          ) : (
            <Image src={logo} alt="logo" className="w-[128px] h-fit" />
          )}
        </Link>
      </div>
      <div className="hidden md:flex items-center space-x-6 font-semibold text-[13px]">
        <div className="flex gap-2 items-center">
          {" "}
          <HeartHandshake className="" />
          <a href="#" className="">
            Jadi Partner tiket.com
          </a>
        </div>
        <a href="#" className="">
          Blibli Tiket Rewards
        </a>
        <div className="flex items-center space-x-1">
          <span className="">IDR</span>
          <img
            src="/navbar/indonesia-flag.png"
            alt="Indonesia Flag"
            className="h-4 w-6"
          />
        </div>
        <div className="relative">
          <button className="relative ">
            <MailPlus />
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
          className={`focus:outline-none ${
            pathname === "/" ? "text-white" : "text-gray-800"
          }`}
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
            <a
              href="#"
              className="text-gray-600 font-semibold hover:text-gray-800"
            >
              Jadi Partner tiket.com
            </a>
            <a
              href="#"
              className="text-gray-600 font-semibold hover:text-gray-800"
            >
              Blibli Tiket Rewards
            </a>
            <a
              href="#"
              className="text-gray-600 font-semibold hover:text-gray-800"
            >
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
