import React from "react";
import { Card } from "../ui/card";

const stats = [
  {
    value: "2M+",
    label: "Active Users",
  },
  {
    value: "$50B+",
    label: "Trading Volume",
  },
  {
    value: "100+",
    label: "Cryptocurrencies",
  },
  {
    value: "99.9%",
    label: "Uptime",
  },
];

const Stats = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index}>
              <Card className="p-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
