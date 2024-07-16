"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import logo from "@/public/logo.png";
import { HeartHandshake, MailPlus } from "lucide-react";
import Image from "next/image";
import logoWhite from "@/public/logo-white.webp";
import Link from "next/link";

interface UserProfile {
  id: string;
  email: string;
  roles: string | string[];
  name?: string;
  profilePicture?: string;
}

const NavBar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const userProfile = session?.user as UserProfile | undefined;
  const [fullUserProfile, setFullUserProfile] = useState<UserProfile | null>(
    null
  );

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const fetchUserProfile = async () => {
    if (session?.accessToken) {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/user/profile",
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setFullUserProfile(data.data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchUserProfile();
    }
  }, [status, session]);

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
        {status === "authenticated" && (fullUserProfile || userProfile) && (
          <div className="relative">
            <div
              className="h-8 w-8 bg-gray-200 text-gray-600 flex items-center justify-center rounded-full cursor-pointer overflow-hidden"
              onClick={toggleDropdown}
            >
              {fullUserProfile?.profilePicture ? (
                <Image
                  src={fullUserProfile.profilePicture}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              ) : (
                <span>
                  {fullUserProfile?.name
                    ? fullUserProfile.name.substring(0, 2).toUpperCase()
                    : userProfile?.email.substring(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <Link
                  href="/user/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
        {status === "unauthenticated" && (
          <Link href="/login" className="text-white hover:text-yellow-400">
            Login
          </Link>
        )}
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
            {status === "authenticated" && (fullUserProfile || userProfile) && (
              <>
                <Link
                  href="/user/profile"
                  className="text-gray-600 font-semibold hover:text-gray-800"
                >
                  Profile
                </Link>
                <Link
                  href="/user/settings"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-yellow-400 text-left"
                >
                  Logout
                </button>
              </>
            )}
            {status === "unauthenticated" && (
              <Link
                href="/login"
                className="text-gray-600 font-semibold hover:text-gray-800"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
