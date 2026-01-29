"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Check, Lock, Truck } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"
import { Alert, AlertDescription } from "@/components/ui/Alert"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export default function CheckoutPage() {
  const [step, setStep] = useState<"cart" | "shipping" | "payment" | "confirmation">("cart")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("card")

  // Mock cart items
  const cartItems: CartItem[] = [
    {
      id: "1",
      name: "Personalized Wooden Nameplate",
      price: 2499,
      quantity: 1,
      image: "/wooden-nameplate.jpg",
    },
    {
      id: "2",
      name: "Brass Candle Holders Set",
      price: 3999,
      quantity: 2,
      image: "/brass-candle-holders.jpg",
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = shippingMethod === "express" ? 500 : 200
  const tax = Math.round(subtotal * 0.1)
  const total = subtotal + shippingCost + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleContinue = () => {
    if (step === "cart") {
      setStep("shipping")
    } else if (step === "shipping") {
      setStep("payment")
    } else if (step === "payment") {
      setStep("confirmation")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-secondary/5 border-b">
        <div className="container-custom py-6">
          <Link href="/cart" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>
          <h1 className="heading-lg">Checkout</h1>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-background border-b sticky top-0 z-10">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between">
            {["cart", "shipping", "payment", "confirmation"].map((s, idx) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step === s
                      ? "bg-primary text-white"
                      : ["cart", "shipping", "payment"].indexOf(s) < ["cart", "shipping", "payment"].indexOf(step)
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {["cart", "shipping", "payment"].indexOf(s) < ["cart", "shipping", "payment"].indexOf(step) ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    idx + 1
                  )}
                </div>
                {idx < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      ["cart", "shipping", "payment"].indexOf(s) < ["cart", "shipping", "payment"].indexOf(step)
                        ? "bg-primary"
                        : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm">
            <span className={step === "cart" ? "text-primary font-medium" : "text-muted-foreground"}>Cart</span>
            <span className={step === "shipping" ? "text-primary font-medium" : "text-muted-foreground"}>Shipping</span>
            <span className={step === "payment" ? "text-primary font-medium" : "text-muted-foreground"}>Payment</span>
            <span className={step === "confirmation" ? "text-primary font-medium" : "text-muted-foreground"}>
              Confirmation
            </span>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === "cart" && (
              <div className="space-y-6">
                <h2 className="heading-md">Order Summary</h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.id} className="p-4 flex gap-4">
                      <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-muted-foreground">Quantity: {item.quantity}</p>
                        <p className="text-primary font-semibold mt-2">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {step === "shipping" && (
              <div className="space-y-6">
                <h2 className="heading-md">Shipping Address</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className="mt-2"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="mt-2"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="mt-2"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Mumbai"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Maharashtra"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="400001"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="India"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <h3 className="font-semibold mb-4">Shipping Method</h3>
                  <RadioGroup value={shippingMethod} onChange={setShippingMethod}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg mb-3 cursor-pointer hover:bg-secondary/5">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Standard Shipping</p>
                            <p className="text-sm text-muted-foreground">5-7 business days</p>
                          </div>
                          <p className="font-semibold">₹200</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg mb-3 cursor-pointer hover:bg-secondary/5">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Express Shipping</p>
                            <p className="text-sm text-muted-foreground">2-3 business days</p>
                          </div>
                          <p className="font-semibold">₹500</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === "payment" && (
              <div className="space-y-6">
                <h2 className="heading-md">Payment Method</h2>
                <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg mb-3 cursor-pointer hover:bg-secondary/5">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <p className="font-medium">Credit/Debit Card</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg mb-3 cursor-pointer hover:bg-secondary/5">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex-1 cursor-pointer">
                      <p className="font-medium">UPI</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg mb-3 cursor-pointer hover:bg-secondary/5">
                    <RadioGroupItem value="netbanking" id="netbanking" />
                    <Label htmlFor="netbanking" className="flex-1 cursor-pointer">
                      <p className="font-medium">Net Banking</p>
                    </Label>
                  </div>
                </RadioGroup>

                <Alert>
                  <Lock className="h-4 w-4" />
                  <AlertDescription>Your payment information is secure and encrypted.</AlertDescription>
                </Alert>
              </div>
            )}

            {step === "confirmation" && (
              <div className="space-y-6">
                <div className="text-center py-12">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="heading-md mb-2">Order Confirmed!</h2>
                  <p className="text-muted-foreground mb-6">
                    Thank you for your purchase. Your order has been confirmed.
                  </p>
                  <div className="bg-secondary/5 rounded-lg p-6 text-left">
                    <p className="text-sm text-muted-foreground mb-2">Order Number</p>
                    <p className="heading-sm mb-6">#ORD-2024-001234</p>
                    <p className="text-sm text-muted-foreground mb-2">Estimated Delivery</p>
                    <p className="font-semibold">5-7 business days</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <Card className="p-6 sticky top-32">
              <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 pb-4 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>₹{shippingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-4 mb-6">
                <span>Total</span>
                <span className="text-primary">₹{total.toLocaleString()}</span>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleContinue}
                  className="w-full bg-brass-gradient text-white shadow-brass hover:shadow-brass-lg"
                >
                  {step === "confirmation" ? "Continue Shopping" : "Continue"}
                </Button>
                {step !== "cart" && (
                  <Button
                    onClick={() => {
                      if (step === "shipping") setStep("cart")
                      else if (step === "payment") setStep("shipping")
                      else if (step === "confirmation") setStep("cart")
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Back
                  </Button>
                )}
              </div>

              <div className="mt-6 pt-6 border-t space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Truck className="h-4 w-4" />
                  <span>Free returns within 30 days</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  <span>Secure checkout</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
