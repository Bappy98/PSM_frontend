import React from "react";
import "./home.css"

const Homepage = () => {

  
  return (
    <div className="mt-[80px]">
      <div className="common-home-bac">
        <div className="grid grid-cols-2 ">
          <div className="absolute top-[14rem] left-24">
            <h1 className="text-4xl text-blue-900 not-italic text-center py-4  uppercase">
             BRK Medicine Shop
            </h1>
            <p className="text-3xl text-green-900 not-italic  py-4  uppercase">
              Take Service from us!!!!
            </p>

            <div className="grid grid-cols-3 mt-4   gap-4 ">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
