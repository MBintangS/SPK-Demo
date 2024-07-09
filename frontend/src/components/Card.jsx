import React from "react";

const Card = ({ logo, title, desc }) => {
  return (
    <div className="mb-5 flex items-center">
      <div className="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
        <div className="py-7 px-6">
          <div className="flex gap-4 items-center mb-5">
            <div className="bg-success inline-block p-3 text-[#f1f2f3] rounded-full">
              <LuFolder />
            </div>
            <p className="text-[#3b3f5c] text-xl">100</p>
          </div>
          <h5 className="text-[#3b3f5c] text-lg font-semibold mb-4 dark:text-white-light">
            Data Kriteria
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Card;
