import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { purchaseCoinsAsBuyer } from "@/services/api";
import { useUserContext,  } from "@/context/userContext";
import { toast } from "sonner";

const coinPackages = [
  { coins: 100, price: 10 },
  { coins: 250, price: 25 },
  { coins: 500, price: 50 },
];

export default function PurchaseCoin() {
  const { loggedInUser, updateCoins } = useUserContext();
  const [customCoins, setCustomCoins] = useState(""); // Default to an empty string
  const [customPrice, setCustomPrice] = useState(""); // Default to an empty string
  const [selectedPackage, setSelectedPackage] = useState(null); // Default to null
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle changes in the custom coin input
  function handleCustomCoinsChange(e) {
    const value = +e.target.value;

    if (!isNaN(value) && value > 0) {
      setCustomCoins(value);
      setCustomPrice((value / 10).toFixed(2)); // Assuming 1 coin = $0.10
      setSelectedPackage(null); // Deselect any selected package
    } else {
      setCustomCoins("");
      setCustomPrice("");
    }
  }

  // Handle package selection
  function handlePackageSelect(pkg) {
    setSelectedPackage((prevPkg) =>
      prevPkg?.coins === pkg.coins ? null : pkg
    );
    setCustomCoins(""); // Reset custom coins when selecting a package
    setCustomPrice(""); // Reset custom price when selecting a package
  }

  // Open the confirmation modal
  function handlePurchase() {
    setIsModalOpen(true);
  }

  // Proceed with the purchase
  async function handleProceed() {
    if (!loggedInUser) {
      toast.error("You must be logged in to purchase coins.");
      return;
    }

    try {
      setIsLoading(true);

      const coinsPurchased = selectedPackage?.coins || Number(customCoins);
      const amountPaid = selectedPackage?.price || parseFloat(customPrice);

      if (!coinsPurchased || !amountPaid) {
        toast.error("Invalid coin or price value. Please try again.");
        return;
      }

      const apiData = {
        buyerId: loggedInUser._id,
        coinsPurchased,
        amountPaid,
      };

      const response = await purchaseCoinsAsBuyer(apiData);
      if (response.status === 200) {
        updateCoins("inc", Number(coinsPurchased));
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
      setCustomCoins("");
      setCustomPrice("");
      setSelectedPackage(null);
    }
  }

  // Disable custom amount input if a package is selected
  const isCustomAmountDisabled = selectedPackage !== null;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Purchase Coins</h1>

      {/* Predefined Packages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {coinPackages.map((pkg) => (
          <Card
            key={pkg.coins}
            className={`cursor-pointer transition-all duration-200 ${
              selectedPackage?.coins === pkg.coins
                ? "border-primary ring-2 ring-primary"
                : "hover:border-primary"
            }`}
            onClick={() => handlePackageSelect(pkg)}
          >
            <CardHeader>
              <CardTitle>{pkg.coins} Coins</CardTitle>
              <CardDescription>${pkg.price}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                variant={
                  selectedPackage?.coins === pkg.coins ? "default" : "outline"
                }
              >
                {selectedPackage?.coins === pkg.coins ? "Selected" : "Select"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Custom Amount Input */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Custom Amount</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="coins">Number of Coins</Label>
              <Input
                id="coins"
                placeholder="Enter number of coins"
                value={customCoins}
                onChange={handleCustomCoinsChange}
                type="number"
                disabled={isCustomAmountDisabled}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Price in Dollars</Label>
              <Input id="price" value={customPrice} disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={handlePurchase}
            disabled={!selectedPackage && !customCoins}
          >
            Purchase
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
            <DialogDescription>
              You are about to purchase{" "}
              {selectedPackage ? selectedPackage.coins : customCoins} coins for $
              {selectedPackage ? selectedPackage.price : customPrice}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Decline
            </Button>
            <Button onClick={handleProceed} disabled={isLoading}>
              {isLoading ? "Processing..." : "Proceed"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
