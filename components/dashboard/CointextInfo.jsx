"use client";

import React from "react";
import parse from "html-react-parser";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CointextInfo = ({ name }) => {
  console.log(name);
  if (!name) {
    return <p className="text-gray-500">No description available.</p>;
  }

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
    <div className="mt-2 bg-white dark:bg-card rounded">
      <div className="px-6 py-4">
        <h1 className="text-2xl font-semibold text-green-600">Basic Info</h1>

        <div className="py-4">
          <div className="mt-2 text-base text-gray-600 dark:text-white leading-relaxed">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>About {name?.name}</AccordionTrigger>
                <AccordionContent className="text-sm text-black dark:text-white">
                  {parse(name?.description?.en, options)}
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
