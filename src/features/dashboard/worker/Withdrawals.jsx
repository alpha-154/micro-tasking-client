import React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const COIN_TO_DOLLAR_RATE = 20;
const MINIMUM_WITHDRAWAL_COINS = 200;

const Withdrawals = () => {
  const [user, setUser] = useState({
    email: "worker@example.com",
    name: "John Doe",
    totalCoins: 300,
  });

  const [coinsToWithdraw, setCoinsToWithdraw] = useState(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  useEffect(() => {
    setWithdrawalAmount(
      coinsToWithdraw ? coinsToWithdraw / COIN_TO_DOLLAR_RATE : 0
    );
  }, [coinsToWithdraw]);

  const handleWithdrawal = () => {
    if (
      coinsToWithdraw === null ||
      coinsToWithdraw < MINIMUM_WITHDRAWAL_COINS ||
      coinsToWithdraw > user.totalCoins
    ) {
      alert("Invalid withdrawal amount");
      return;
    }

    const withdrawalData = {
      worker_email: user.email,
      worker_name: user.name,
      withdrawal_coin: coinsToWithdraw,
      withdrawal_amount: withdrawalAmount,
      payment_system: paymentSystem,
      account_number: accountNumber,
      withdraw_date: new Date(),
      status: "pending",
    };

    // Simulating database interaction
    console.log("Withdrawal request:", withdrawalData);

    // Reset form
    setCoinsToWithdraw(0);
    setPaymentSystem("");
    setAccountNumber("");

    // Update user's coin balance
    setUser((prevUser) => ({
      ...prevUser,
      totalCoins: prevUser.totalCoins - coinsToWithdraw,
    }));

    alert("Withdrawal request submitted successfully!");
  };

  const canWithdraw =
    user.totalCoins >= MINIMUM_WITHDRAWAL_COINS &&
    coinsToWithdraw !== null &&
    coinsToWithdraw >= MINIMUM_WITHDRAWAL_COINS &&
    coinsToWithdraw <= user.totalCoins;

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Money Withdrawal</h1>
      <div className="w-full">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-2">
              Total Coins: <span className="font-bold">{user.totalCoins}</span>
            </p>
            <p className="text-lg">
              Withdrawal Amount:{" "}
              <span className="font-bold">
                ${(user.totalCoins / COIN_TO_DOLLAR_RATE).toFixed(2)}
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Withdraw Money</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleWithdrawal();
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="coinsToWithdraw">Coins to Withdraw</Label>
                <Input
                  id="coinsToWithdraw"
                  type="number"
                  value={coinsToWithdraw === null ? "" : coinsToWithdraw}
                  onChange={(e) => {
                    const value =
                      e.target.value === ""
                        ? null
                        : Math.min(
                            parseInt(e.target.value) || 0,
                            user.totalCoins
                          );
                    setCoinsToWithdraw(value);
                  }}
                  min={0}
                  max={user.totalCoins}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="withdrawalAmount">Withdrawal Amount ($)</Label>
                <Input
                  id="withdrawalAmount"
                  type="number"
                  value={withdrawalAmount.toFixed(2)}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentSystem">Select Payment System</Label>
                <Select value={paymentSystem} onValueChange={setPaymentSystem}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment system" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bkash">Bkash</SelectItem>
                    <SelectItem value="rocket">Rocket</SelectItem>
                    <SelectItem value="nagad">Nagad</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                />
              </div>

              {canWithdraw ? (
                <Button type="submit">Withdraw</Button>
              ) : (
                <p className="text-red-500">
                   Minimum withdrawal is{" "}
                  {MINIMUM_WITHDRAWAL_COINS} coins.
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Withdrawals;
