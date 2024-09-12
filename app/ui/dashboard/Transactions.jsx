import Image from "next/image";
import React from "react";
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

const Transactions = () => {
  const transactions = [
    {
      invoice: "INV001",
      name: "John Doe",
      status: "Pending",
      method: "Credit Card",
      amount: "$3,200",
    },
    {
      invoice: "INV002",
      name: "Jane Smith",
      status: "Completed",
      method: "Debit Card",
      amount: "$1,200",
    },
    {
      invoice: "INV003",
      name: "Alice Johnson",
      status: "Failed",
      method: "Paypal",
      amount: "$800",
    },
  ];

  const getStatusClass = (status) => {
    return classNames({
      "text-yellow-500": status === "Pending",
      "text-green-500": status === "Completed",
      "text-red-500": status === "Failed",
    });
  };

  return (
    <>
      <Table className="w-full border ">
        <TableCaption>A list of your latest transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction, i) => (
            <TableRow key={i}>
              <TableCell>{transaction.invoice}</TableCell>
              <TableCell>
                <span className={getStatusClass(transaction.status)}>
                  {transaction.status}
                </span>
              </TableCell>
              <TableCell className="">{transaction.method}</TableCell>
              <TableCell className="text-right">{transaction.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Transactions;
