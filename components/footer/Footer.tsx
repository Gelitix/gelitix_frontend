import React from "react";
import logopng from "@/public/logo.png";
import Image from "next/image";
import chat from "@/public/footer/chat.webp";
import callCenter from "@/public/footer/call_center.webp";
import mail from "@/public/footer/mail.webp";
import googleplay from "@/public/footer/googleplay.webp";
import applestore from "@/public/footer/applestore.webp";
import wonderfulindo from "@/public/footer/wonderfulindo.webp";
import ae from "@/public/footer/americanexpress.webp";
import jcb from "@/public/footer/jcb.webp";
import mc from "@/public/footer/mastercard.webp";
import visa from "@/public/footer/visa.webp";
import iata from "@/public/footer/iata.webp";
import topbrand from "@/public/footer/topbrand.webp";
import superbrand from "@/public/footer/superbrand.webp";
import bliblitiket from "@/public/footer/bliblitiket.png";

const Footer = () => {
  return (
    <section>
      <div className="border-solid border-b-[1px] border-gray-300"></div>
      <div className="mx-[16px] md:mx-[230px]  mt-4">
        <div className=" md:flex md:justify-between items-start md:border-solid md:border-b-[1px] md:pb-6">
          <div>
            <Image
              src={logopng}
              alt="logo.png  "
              className="w-32 md:w-40 h-auto mt-6"
            />
            <div className=" flex md:flex-col md:gap-8 text-[11px] md:text-[13px] tracking-tight mt-8 md:mt-4 border-dotted border-b-2 md:border-b-0 pb-6">
              <div className=" flex flex-col gap-8 mr-14">
                <div className=" flex gap-[6px]">
                  <Image src={chat} alt="chat.webp" className="w-8" />
                  <div>
                    <p className="mb-[1px] text-gray-500">WhatsApp</p>
                    <p> +62 858 1150 0888</p>
                  </div>
                </div>

                <div className=" flex gap-[6px] ">
                  <Image src={mail} alt="email.webp" className="w-8" />
                  <div>
                    <p className="mb-[1px] text-gray-600">Email</p>
                    <p> cs@gelitix.com</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-[6px] items-start">
                <Image
                  src={callCenter}
                  alt="callcenter.webp"
                  className="w-8 "
                />
                <div>
                  <p className="mb-[1px] text-gray-600">Call Center</p>
                  <p>Indonesia only</p>
                  <p className="mb-[12px]"> +62 804 1500 878</p>
                  <p>International</p>
                  <p>+62 21 3973 0888</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex mt-8 md:mt-6 md:gap-10 ">
            <div className="text-[11px]  flex flex-col gap-3 mr-24 md:text-[13px]">
              <p className="font-[600] text-[13px]">Company</p>
              <p>Blog</p>
              <p>Careers</p>
              <p>Corporate</p>
              <p>Affiliate</p>
              <p>Blibli Tiket Rewards</p>
              <p>Protection</p>
              <p>Installment</p>
            </div>

            <div className="text-[11px] flex flex-col gap-3 md:text-[13px]">
              <p className="font-[600] text-[13px]">Product</p>
              <p>Flights</p>
              <p>Hotels</p>
              <p>Villas & Apt.</p>
              <p>To Dos</p>
              <p>Trains</p>
              <p>Bus & Shuttle</p>
              <p>Ferry</p>
              <p>Car Rentals</p>
              <p>Events</p>
            </div>
          </div>

          <div className="flex md:gap-10 mt-[24px] border-dotted border-b-2 md:border-b-0 pb-6">
            <div className="mr-[48px]">
              <div className="text-[11px] md:text-[13px] flex flex-col gap-3 ">
                <p className="font-[600] text-[13px]">Support</p>
                <p>Help Center</p>
                <p>Group Booking</p>
                <p>Privacy Policy</p>
                <p>Terms & Conditions</p>
                <p>Register Your Hotel</p>
                <p>Register Your Activity/Event</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[13px] md:text-[13px] font-[600]">
                Cheaper on the app
              </p>
              <Image
                src={applestore}
                alt="applestore.webp"
                className="w-28 md:w-48"
              />
              <Image
                src={googleplay}
                alt="googleplay.webp"
                className="w-28 md:w-48"
              />
            </div>
          </div>
        </div>

        <div className="md:flex justify-between text-[13px] border-solid md:border-b-[1px] py-6 md:py-10">
          <div className=" md:mt-0">
            <p className="font-semibold mb-2 md:mb-6">Partner</p>
            <div className="flex gap-4">
              <Image
                src={wonderfulindo}
                alt="wonderfulindo.webp"
                className="w-28 md:w-40 h-fit "
              />
              <p className="text-[9px] md:text-[11px]  w-24 md:w-36">
                Official Partner of the Ministry of Tourism, Republic Indonesia
              </p>
            </div>
          </div>

          <div className="mt-6 md:mt-0">
            <p className="font-semibold mb-2 md:mb-6">
              Secure your transaction
            </p>
            <div className="flex gap-3 items-start">
              <Image src={visa} alt="visa.webp" className="w-14 h-fit" />
              <Image src={mc} alt="mastercard.webp" className="w-14 h-fit" />
              <Image src={jcb} alt="jcb.webp" className="w-14 h-fit" />
              <Image src={ae} alt="ae.webp" className="w-14 h-fit" />
            </div>
          </div>

          <div className="mt-6 md:mt-0">
            <p className="font-semibold mb-2 md:mb-6">Awards</p>
            <div className="flex gap-3 items-start">
              <Image src={iata} alt="iata.webp" className="w-10 h-fit" />
              <Image
                src={topbrand}
                alt="topbrand.webp"
                className="w-10 h-fit"
              />
              <Image
                src={superbrand}
                alt="superbrand.webp"
                className="w-9 h-fit"
              />
            </div>
          </div>

          <div className="mt-6 md:mt-0 border-dotted border-b-2 md:border-b-0 pb-6">
            <p className="font-semibold mb-2 md:mb-6">Follow Us</p>
            <div className="flex gap-5 items-start">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 320 512"
                height="2.5em"
                width="2.5em"
                xmlns="http://www.w3.org/2000/svg"
                className="border-[1px] rounded-full p-[6px] text-gray-600 md:w-10 h-fit"
              >
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
              </svg>

              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                height="2.5em"
                width="2.5em"
                xmlns="http://www.w3.org/2000/svg"
                className="border-[1px] rounded-full p-[6px] text-gray-600 md:w-10 h-fit"
              >
                <path d="M928 254.3c-30.6 13.2-63.9 22.7-98.2 26.4a170.1 170.1 0 0 0 75-94 336.64 336.64 0 0 1-108.2 41.2A170.1 170.1 0 0 0 672 174c-94.5 0-170.5 76.6-170.5 170.6 0 13.2 1.6 26.4 4.2 39.1-141.5-7.4-267.7-75-351.6-178.5a169.32 169.32 0 0 0-23.2 86.1c0 59.2 30.1 111.4 76 142.1a172 172 0 0 1-77.1-21.7v2.1c0 82.9 58.6 151.6 136.7 167.4a180.6 180.6 0 0 1-44.9 5.8c-11.1 0-21.6-1.1-32.2-2.6C211 652 273.9 701.1 348.8 702.7c-58.6 45.9-132 72.9-211.7 72.9-14.3 0-27.5-.5-41.2-2.1C171.5 822 261.2 850 357.8 850 671.4 850 843 590.2 843 364.7c0-7.4 0-14.8-.5-22.2 33.2-24.3 62.3-54.4 85.5-88.2z"></path>
              </svg>

              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                height="2.5em"
                width="2.5em"
                xmlns="http://www.w3.org/2000/svg"
                className="border-[1px] rounded-full p-[6px] text-gray-600 md:w-10 h-fit"
              >
                <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM349.3 793.7H230.6V411.9h118.7v381.8zm-59.3-434a68.8 68.8 0 1 1 68.8-68.8c-.1 38-30.9 68.8-68.8 68.8zm503.7 434H675.1V608c0-44.3-.8-101.2-61.7-101.2-61.7 0-71.2 48.2-71.2 98v188.9H423.7V411.9h113.8v52.2h1.6c15.8-30 54.5-61.7 112.3-61.7 120.2 0 142.3 79.1 142.3 181.9v209.4z"></path>
              </svg>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                height="2.5em"
                width="2.5em"
                xmlns="http://www.w3.org/2000/svg"
                className="border-[1px] rounded-full p-[6px] text-gray-600 md:w-10 h-fit"
              >
                <path d="M941.3 296.1a112.3 112.3 0 0 0-79.2-79.3C792.2 198 512 198 512 198s-280.2 0-350.1 18.7A112.12 112.12 0 0 0 82.7 296C64 366 64 512 64 512s0 146 18.7 215.9c10.3 38.6 40.7 69 79.2 79.3C231.8 826 512 826 512 826s280.2 0 350.1-18.8c38.6-10.3 68.9-40.7 79.2-79.3C960 658 960 512 960 512s0-146-18.7-215.9zM423 646V378l232 133-232 135z"></path>
              </svg>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                height="2.5em"
                width="2.5em"
                xmlns="http://www.w3.org/2000/svg"
                className="border-[1px] rounded-full p-[6px] text-gray-600 md:w-10 h-fit"
              >
                <path d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9z"></path>
              </svg>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                role="img"
                viewBox="0 0 24 24"
                height="2.5em"
                width="2.5em"
                xmlns="http://www.w3.org/2000/svg"
                className="border-[1px] rounded-full p-[6px] text-gray-600 md:w-10 h-fit"
              >
                <title></title>
                <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-center md:justify-between mt-6 mb-12 md:mb-18">
          <p className="text-[12px] md:text-[12px]">
            &copy; 2011-2024 PT. Global Tiket Network. All Rights Reserved.
          </p>
          <Image
            src={bliblitiket}
            alt="bliblitiket.png"
            className="w-24 md:w-36 h-fit"
          />
        </div>
      </div>
    </section>
  );
};

export default Footer;
