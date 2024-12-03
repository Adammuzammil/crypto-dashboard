import {
  BarChart3,
  Bell,
  Globe,
  LineChart,
  Shield,
  Wallet,
} from "lucide-react";
import React from "react";
import { Card } from "../ui/card";

const features = [
  {
    icon: LineChart,
    title: "Real-Time Charts",
    description:
      "Track cryptocurrency prices with live charts and detailed market data",
  },
  {
    icon: Bell,
    title: "Price Alerts",
    description: "Set custom alerts for price movements and market changes",
  },
  {
    icon: Wallet,
    title: "Portfolio Tracking",
    description: "Manage and monitor your crypto portfolio in one place",
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Enterprise-grade security to protect your investments",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Deep market analysis and trading insights",
  },
  {
    icon: Globe,
    title: "Global Markets",
    description: "Access to worldwide cryptocurrency markets 24/7",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Everything you need to trade Crypto
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform provides all the tools and features you need to make
            informed trading decisions and manage your cryptocurrency
            investments effectively.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index}>
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className="flex flex-col h-full">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
