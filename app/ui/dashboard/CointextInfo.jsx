"use client";

import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CointextInfo = ({ name }) => {
  const id = name.toLowerCase();
  const url = `https://api.coingecko.com/api/v3/coins/bitcoin`;
  const [info, setInfo] = useState();

  useEffect(() => {
    const getPriceData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setInfo(data);
    };

    getPriceData();
  }, [name]);

  // Custom options for html-react-parser
  const options = {
    replace: (domNode) => {
      if (domNode.name === "a") {
        domNode.attribs.class = "text-blue-600 hover:text-blue-800";
        domNode.attribs.target = "_blank";
        domNode.attribs.rel = "noopener noreferrer";
      }
    },
  };

  return (
    <div className="mt-2 bg-white rounded">
      <div className="px-6 py-4">
        <h1 className="text-2xl font-semibold text-green-600">Basic Info</h1>

        <div className="py-4">
          <div className="mt-2 text-sm text-gray-600 leading-relaxed">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  {" "}
                  About {info?.name} ({info?.symbol?.toUpperCase()})
                </AccordionTrigger>
                <AccordionContent>
                  {info?.description?.en &&
                    parse(info?.description?.en, options)}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CointextInfo;
