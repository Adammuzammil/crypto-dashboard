import CryptoConverter from "@/components/shared/CryptoConverter";
import React from "react";

const Exchange = () => {
  return (
    <div className="h-[89vh] flex items-center justify-center dark:from-gray-900 dark:to-gray-800">
      <CryptoConverter />
    </div>
  );
};

export default Exchange;
