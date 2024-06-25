"use client";
import React, { useState } from "react";
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";

export default function ImageUpload() {
  const [imageData, setImageData] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // You can add any logic here that you want to execute on form submission
    console.log("Form submitted with image:", imageData);
  };

  return (
    <main className="h-fit flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:max-w-lg w-full p-5 bg-white rounded-xl">
        <div className="text-center">
          <h2 className="mt-5 text-2xl font-bold text-gray-900">
            Image Upload
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Lorem ipsum is placeholder text.
          </p>
        </div>
        <div className="mt-8 space-y-3">
          <div className="grid grid-cols-1 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Attach Image
              </label>
              {imageData && (
                <button
                  type="button"
                  onClick={() => setImageData("")}
                  className="py-1 px-3 focus:outline-none hover:bg-gray-200"
                >
                  + edit image
                </button>
              )}
            </div>
            {imageData ? (
              <div className="col-span-6 sm:col-span-4 shadow">
                <Image
                  src={imageData}
                  alt="productImage"
                  width={1000}
                  height={100}
                  className="object-cover w-full h-[250px]"
                />
              </div>
            ) : (
              <UploadDropzone
                endpoint="productImage"
                onClientUploadComplete={(url: any) => {
                  console.log("files", url);
                  setImageData(url?.[0]?.url);
                  window.alert("Upload completed");
                }}
                onUploadError={(error) => {
                  window.alert(`${error?.message}`);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
