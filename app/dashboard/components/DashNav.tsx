"use client";
import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface UserProfile {
  id: string;
  email: string;
  roles: string | string[];
  name?: string;
  profilePicture?: string;
}

const DashNav: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session, status } = useSession();
  const [fullUserProfile, setFullUserProfile] = useState<UserProfile | null>(
    null
  );

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const fetchUserProfile = async () => {
    if (session?.accessToken) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/user/profile`,
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

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md border-b border-gray-200">
      <div className="w-1/3"></div>
      <div className="w-1/3 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </div>
      <div className="w-1/3 flex justify-end">
        {status === "authenticated" && fullUserProfile && (
          <div className="relative">
            <div
              className="h-10 w-10 bg-gray-200 text-gray-600 flex items-center justify-center rounded-full cursor-pointer overflow-hidden"
              onClick={toggleDropdown}
            >
              {fullUserProfile.profilePicture ? (
                <Image
                  src={fullUserProfile.profilePicture}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <span className="text-lg font-semibold">
                  {fullUserProfile.name
                    ? fullUserProfile.name.substring(0, 2).toUpperCase()
                    : fullUserProfile.email.substring(0, 2).toUpperCase()}
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
      </div>
    </nav>
  );
};

export default DashNav;
