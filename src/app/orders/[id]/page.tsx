"use client"

import Link from "next/link"
import { ChevronRight, Package, Calendar, MapPin, DollarSign, Download, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Separator } from "@/components/ui/Separator"
import Breadcrumbs from "@/components/ui/Breadcrumbs"

interface OrderDetailItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface OrderDetail {
  id: string
  orderNumber: string
  date: string
  total: number
  subtotal: number
  shipping: number
  tax: number
  status: "processing" | "shipped" | "delivered" | "cancelled"
  items: OrderDetailItem[]
  shippingAddress: {
    name: string
    address: string
    city: string
    state: string
    pincode: string
    phone: string
  }
  billingAddress: {
    name: string
    address: string
    city: string
    state: string
    pincode: string
  }
  trackingNumber?: string
  estimatedDelivery?: string
  paymentMethod: string
  paymentStatus: "pending" | "completed" | "failed"
}

// Mock order detail
const mockOrderDetail: OrderDetail = {
  id: "1",
  orderNumber: "ORD-2024-001",
  date: "Jan 15, 2024",
  total: 3899,
  subtotal: 3599,
  shipping: 0,
  tax: 300,
  status: "delivered",
  items: [
    {
      id: "1",
      name: "Personalized Wooden Name Plate",
      price: 1299,
      quantity: 2,
      image: "/images/products/wooden-nameplate.jpg",
    },
    {
      id: "2",
      name: "Brass Photo Frame",
      price: 1899,
      quantity: 1,
      image: "/images/products/brass-photo-frame.jpg",
    },
  ],
  shippingAddress: {
    name: "John Doe",
    address: "123 Main Street",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    phone: "+91 98765 43210",
  },
  billingAddress: {
    name: "John Doe",
    address: "123 Main Street",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
  },
  trackingNumber: "TRK123456789",
  estimatedDelivery: "Jan 20, 2024",
  paymentMethod: "Debit Card",
  paymentStatus: "completed",
}

const statusColors = {
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-amber-100 text-amber-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

const statusLabels = {
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = mockOrderDetail

  return (
    <div className="container-custom py-8 md:py-12">
          <Breadcrumbs  />

      {/* Order Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="heading-lg mb-2">{order.orderNumber}</h1>
          <p className="text-muted-foreground">Placed on {order.date}</p>
        </div>
        <Badge className={`${statusColors[order.status]} font-medium text-lg px-4 py-2`}>
          {statusLabels[order.status]}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item, index) => (
                <div key={item.id}>
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <Link href={`/product/${item.id}`}>
                        <h4 className="font-semibold hover:text-primary transition-colors">{item.name}</h4>
                      </Link>
                      <div className="text-sm text-muted-foreground mt-1">Quantity: {item.quantity}</div>
                      <div className="text-sm text-muted-foreground">Price: ₹{item.price.toLocaleString()}</div>
                      <Link href={`/product/${item.id}`}>
                        <Button variant="link" size="sm" className="mt-2 p-0 h-auto">
                          Leave Review
                        </Button>
                      </Link>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground mt-2">{item.quantity} item(s)</div>
                    </div>
                  </div>
                  {index < order.items.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Order Timeline */}
          {order.status === "shipped" && (
            <Card>
              <CardHeader>
                <CardTitle>Delivery Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { label: "Order Placed", completed: true, date: order.date },
                    { label: "Order Confirmed", completed: true, date: "Jan 15, 2024" },
                    { label: "Shipped", completed: true, date: "Jan 18, 2024" },
                    { label: "Out for Delivery", completed: false },
                    { label: "Delivered", completed: false, date: order.estimatedDelivery },
                  ].map((step, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${step.completed ? "bg-green-500" : "bg-muted"}`}
                        />
                        {index < 4 && <div className={`w-0.5 h-8 ${step.completed ? "bg-green-500" : "bg-muted"}`} />}
                      </div>
                      <div className="pb-4">
                        <div className={`font-medium ${step.completed ? "text-green-700" : "text-muted-foreground"}`}>
                          {step.label}
                        </div>
                        {step.date && <div className="text-xs text-muted-foreground">{step.date}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{order.shipping === 0 ? "Free" : `₹${order.shipping}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>₹{order.tax.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{order.total.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="font-medium">{order.shippingAddress.name}</div>
              <div className="text-sm text-muted-foreground">{order.shippingAddress.address}</div>
              <div className="text-sm text-muted-foreground">
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
              </div>
              <div className="text-sm text-muted-foreground">Phone: {order.shippingAddress.phone}</div>
            </CardContent>
          </Card>

          {/* Billing Address */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Billing Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="font-medium">{order.billingAddress.name}</div>
              <div className="text-sm text-muted-foreground">{order.billingAddress.address}</div>
              <div className="text-sm text-muted-foreground">
                {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.pincode}
              </div>
            </CardContent>
          </Card>

          {/* Payment & Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Payment & Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Payment Method</div>
                <div className="font-medium">{order.paymentMethod}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Payment Status</div>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  {order.paymentStatus === "completed" ? "Paid" : "Pending"}
                </Badge>
              </div>
              {order.trackingNumber && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Tracking Number</div>
                  <div className="font-mono text-sm bg-muted p-2 rounded">
                    {order.trackingNumber}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-2">
            <Button className="w-full" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
            <Button className="w-full" variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
            <Link href="/orders" className="block">
              <Button className="w-full bg-transparent" variant="outline">
                Back to Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}