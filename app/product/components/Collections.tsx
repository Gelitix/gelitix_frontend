import React from "react";

interface ProductProps {
  category: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
}

const Product: React.FC<ProductProps> = ({
  category,
  title,
  imageUrl,
  imageAlt,
}) => {
  return (
    <div>
      <a
        href="#"
        className="group mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3"
      >
        <img
          src={imageUrl}
          loading="lazy"
          alt={imageAlt}
          className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
        />
      </a>
      <div className="flex flex-col">
        <span className="text-gray-500">{category}</span>
        <a
          href="#"
          className="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl"
        >
          {title}
        </a>
      </div>
    </div>
  );
};

const Collections: React.FC = () => {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
          <Product
            category="Men"
            title="Business Casual"
            imageUrl="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700"
            imageAlt="Photo by Austin Wade"
          />
          <Product
            category="Women"
            title="Summer Season"
            imageUrl="https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?auto=format&q=75&fit=crop&crop=top&w=600&h=700"
            imageAlt="Photo by engin akyurt"
          />
          <Product
            category="Men"
            title="Streetwear"
            imageUrl="https://images.unsplash.com/photo-1552668693-d0738e00eca8?auto=format&q=75&fit=crop&crop=top&w=600&h=700"
            imageAlt="Photo by Austin Wade"
          />
          <Product
            category="Women"
            title="Sale"
            imageUrl="https://images.unsplash.com/photo-1560269999-cef6ebd23ad3?auto=format&q=75&fit=crop&w=600&h=700"
            imageAlt="Photo by Austin Wade"
          />
        </div>
      </div>
    </div>
  );
};

export default Collections;
