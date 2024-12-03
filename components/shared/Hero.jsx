import { ArrowRight, TrendingUp } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="flex  flex-col items-center justify-center">
            <div className="flex justify-center">
              <div className="inline-flex items-center  space-x-2 bg-muted px-3 py-1 rounded-full text-sm mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="">Real-time crypto tracking</span>
              </div>
            </div>

            <h1 className="text-5xl font-bold leading-tight mb-6 text-center">
              Track Crypto Markets in{" "}
              <span className="text-primary block">Real-Time</span>
            </h1>

            <p className="text-xl text-center text-muted-foreground mb-8">
              Stay ahead of the market with real-time cryptocurrency tracking,
              advanced analytics, and personalized portfolio management.
            </p>

            <div>
              <Button size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
