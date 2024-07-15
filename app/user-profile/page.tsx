"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/components/footer/Footer";
import { Verified } from "lucide-react";
import { CircleUserIcon } from "lucide-react";
import defaultprofilepic from "@/public/userprofile/defaultprofile.webp";
import logo from "@/public/logo.png";
import Image from "next/image";
import referral from "@/public/userprofile/referral.webp";
import ranch from "@/public/userprofile/ranch.webp";
import Link from "next/link";
import mobilehero from "@/public/userprofile/mobile-hero.webp";
import { useSession } from "next-auth/react";
interface ProfileData {
  username: string;
  email: string;
  phoneNumber?: string;
  profilePicture?: string;
  pointBalance?: number;
  referralCode?: string;
}

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const { data: session } = useSession();

  const fetchProfileData = async () => {
    if (!session?.accessToken) {
      console.error("No access token available");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/user/profile",
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }
      const data = await response.json();
      setProfileData(data.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchProfileData();
    }
  }, [session]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-[#f4f7fe] md:pt-20">
      <Image src={mobilehero} alt="mobilehero.webp" className="md:hidden" />
      <h1 className="md:hidden px-5 font-semibold text-[22px] mb-4 text-white md:relative absolute top-20 md:top-0 ">
        Account
      </h1>
      <div className="md:grid gap-5 grid-cols-7 mx-4 md:mx-72 ">
        <div className="col-span-2 -mt-10 md:mt-0 relative md:static z-50">
          <div className=" md:top-0 top-[120px] flex flex-col gap-1 md:gap-3 bg-white p-6  rounded-t-2xl h-fit mb-[6px]">
            <div className="flex items-center gap-2 md:justify-between">
              <p className="font-semibold text-[18px] md:text-[22px]">
                {profileData.username}
              </p>
              <Verified className="fill-[#0064D2] text-white size-8 " />
            </div>
            <p className="md:hidden text-[12px] text-[#0064d2] font-semibold">
              Edit Account Details
            </p>
            <div className="flex gap-3 rounded-xl md:rounded-3xl text-[14px] md:text-[24px] items-center p-3 md:p-10 bg-url bg-gradient-to-bl from-[#cbd6ec] to-[#47506f] ">
              <CircleUserIcon className="size-8 text-white" />
              <p className="font-semibold text-white">
                {profileData.pointBalance !== undefined
                  ? `${profileData.pointBalance} Points`
                  : "Points not available"}
              </p>
            </div>
          </div>

          <div className=" bg-white p-6  rounded-b-2xl md:flex flex-col gap-3 hidden">
            <Image src={logo} alt="logo.webp" className="w-20" />
            <p className="font-semibold text-[14px]">Account Center</p>
            <p className="text-[13px] text-gray-500">
              Enter to edit account and profile info, change password, or set
              country and language preference.
            </p>
            <Link href="/" className="text-[#0064D2] font-semibold text-[14px]">
              {" "}
              To Account Center
            </Link>
          </div>
        </div>

        <div className="col-span-5 md:mt-0">
          <h2 className="font-semibold text-[24px] mb-4 hidden md:block">
            Account
          </h2>
          <div className="bg-white rounded-2xl p-6  flex flex-col gap-2 mb-4">
            <Image src={logo} alt="logo.png" className="w-20" />
            <p className="font-semibold">Account Center</p>
            <p className="text-[12px] md:text-[14px]">
              To access your profile details and these categories below, go to
              the
              <span className="font-semibold">
                {" "}
                Blibli Tiket Account Center
              </span>
              .
            </p>
            <div className="bg-[#F4F7FE] md:flex justify-between rounded-2xl p-3  ">
              <div className="flex gap-4 items-center md:items-start">
                <Image
                  src={profileData.profilePicture || defaultprofilepic}
                  alt="profile picture"
                  className="w-14 md:w-20 h-14 md:h-20 rounded-full object-cover"
                  width={80}
                  height={80}
                />
                <div className="text-[12px] md:text-[14px] flex flex-col gap-2  ">
                  <p className="text-[14px] font-semibold">
                    {profileData.username}
                  </p>
                  <p>{profileData.phoneNumber || "No phone number"}</p>
                  <p>{profileData.email}</p>
                </div>
              </div>
              <div className="flex items-center ml-[71px] mt-3">
                {" "}
                <Link
                  href="/edit-profile"
                  className="text-[#0064D2] font-semibold text-[12px] md:text-base"
                >
                  Edit Your Profile
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6  flex flex-col gap-2 mb-4 ">
            <p className="font-semibold mb-2 md:mb-4">
              Complete this mission to claim 30,000 points!
            </p>
            <div>
              <div
                className="flex gap-4 items-center rounded-2xl p-3 md:p-4"
                style={{ boxShadow: "0 0 5px 0 rgba(48, 49, 53, .16)" }}
              >
                <Image src={referral} alt="referral.webp" className="w-12" />
                <div className="flex flex-col">
                  <p className="text-[12px] md:text-[14px]">
                    Invite 3 friends to join tiket.com via your referral link.
                  </p>
                  {profileData.referralCode && (
                    <p className="text-[12px] md:text-[14px] text-[#0064D2] font-semibold mt-2">
                      Your Referral Code: {profileData.referralCode}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6  flex flex-col gap-2 ">
            <p className="text-lg font-semibold">Must See!</p>
            <Image src={ranch} alt="ranch.webp" />
          </div>
        </div>
      </div>
      <div className="bg-white mt-20">
        {" "}
        <Footer />
      </div>
    </section>
  );
};

export default Profile;
