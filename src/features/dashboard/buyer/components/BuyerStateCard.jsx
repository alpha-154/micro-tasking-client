import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BuyerStateCard = ({ cardTitle, state }) => {
  return (
    <Card className="w-[250px]">
      <CardHeader>
        <CardTitle className="text-lg text-gray-500 font-[400]">{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent className="-mt-4">
        <span className="text-2xl font-bold">{state}</span>
      </CardContent>
    </Card>
  );
};

export default BuyerStateCard;
