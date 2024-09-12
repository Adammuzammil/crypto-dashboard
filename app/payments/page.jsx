"use client";

import Image from "next/image";
import React, { useState } from "react";
import classNames from "classnames";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { payments } from "../../utils/demo";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Payments = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedData, setSortedData] = useState(payments);
  const [searchQuery, setSearchQuery] = useState("");
  //   const transactions = [

  const sortEmails = () => {
    const sorted = [...sortedData].sort((a, b) => {
      const emailA = a.email.toLowerCase();
      const emailB = b.email.toLowerCase();

      if (sortOrder === "asc") {
        return emailA < emailB ? -1 : emailA > emailB ? 1 : 0;
      } else {
        return emailA > emailB ? -1 : emailA < emailB ? 1 : 0;
      }
    });

    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortedData(sorted);
  };

  const getStatusClass = (status) => {
    return classNames({
      "text-blue-500": status === "processing",
      "text-yellow-500": status === "pending",
      "text-green-500": status === "completed",
      "text-red-500": status === "failed",
    });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = sortedData.filter((payment) =>
    payment.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-5">
      <Input
        placeholder="Search..."
        className="max-w-sm mb-4"
        onChange={handleSearch}
      />
      <Table className="w-full border">
        <TableCaption>A list of your latest transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">
              <Button variant="ghost" onClick={sortEmails}>
                Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((transaction, i) => (
            <TableRow key={i}>
              <TableCell>{transaction.id}</TableCell>
              <TableCell>
                <span className={getStatusClass(transaction.status)}>
                  {transaction.status}
                </span>
              </TableCell>
              <TableCell className="text-center">{transaction.email}</TableCell>
              <TableCell className="text-right">{transaction.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="grid grid-cols-3 gap-5 mt-5">
        <div className="relative">
          <Card className="">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>

          <div className="w-28 h-28 rounded-full shadow-2xl bg-gradient-to-r from-black to-gray-500 absolute -right-5 -bottom-3" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Payments;
