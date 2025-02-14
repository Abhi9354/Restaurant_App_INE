import React, { useState } from "react";

const Card = ({ restaurant, idx, onClick }) => {
  const [btnName, setBtnName] = useState("Add to cart");

  return (
    <>
      {idx !== 2 && idx !== 4 ? (
        <div className="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
          <div className="h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="rounded-t-lg w-full h-60 object-cover" src={restaurant.img} alt={restaurant.name} />
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {restaurant.name}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {restaurant.dsc.slice(0, 20)}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {restaurant.country}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Rs. {restaurant.price}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Rating {restaurant.rate}
              </p>
              <button
                type="button"
                className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
                onClick={(e) => {
                  onClick(btnName, restaurant);
                  setBtnName((prev) =>
                    prev === "Add to cart" ? "Remove from cart" : "Add to cart"
                  );
                }}
              >
                {btnName}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden"></div>
      )}
    </>
  );
};

export default Card;
