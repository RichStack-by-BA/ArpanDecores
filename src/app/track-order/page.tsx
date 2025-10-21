"use client"

import { useState } from "react"
import { Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Badge } from "@/components/misc/Badge"

interface OrderStatus {
  id: string
  orderNumber: string
  status: "processing" | "shipped" | "in-transit" | "delivered"
  orderDate: string
  estimatedDelivery: string
  items: number
  total: number
  trackingNumber: string
  timeline: Array<{
    status: string
    date: string
    time: string
    location: string
    completed: boolean
  }>
}

export default function TrackOrderPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<OrderStatus | null>(null)

  // Mock orders
  const orders: OrderStatus[] = [
    {
      id: "1",
      orderNumber: "ORD-2024-001234",
      status: "in-transit",
      orderDate: "2024-10-10",
      estimatedDelivery: "2024-10-17",
      items: 3,
      total: 8699,
      trackingNumber: "TRK-2024-001234",
      timeline: [
        {
          status: "Order Confirmed",
          date: "Oct 10",
          time: "2:30 PM",
          location: "Mumbai, India",
          completed: true,
        },
        {
          status: "Processing",
          date: "Oct 11",
          time: "10:00 AM",
          location: "Warehouse, Mumbai",
          completed: true,
        },
        {
          status: "Shipped",
          date: "Oct 12",
          time: "4:15 PM",
          location: "Distribution Center",
          completed: true,
        },
        {
          status: "In Transit",
          date: "Oct 15",
          time: "9:30 AM",
          location: "Regional Hub",
          completed: true,
        },
        {
          status: "Out for Delivery",
          date: "Oct 17",
          time: "Expected",
          location: "Your Area",
          completed: false,
        },
        {
          status: "Delivered",
          date: "Oct 17",
          time: "Expected",
          location: "Your Address",
          completed: false,
        },
      ],
    },
    {
      id: "2",
      orderNumber: "ORD-2024-001233",
      status: "delivered",
      orderDate: "2024-10-05",
      estimatedDelivery: "2024-10-12",
      items: 1,
      total: 2499,
      trackingNumber: "TRK-2024-001233",
      timeline: [
        {
          status: "Order Confirmed",
          date: "Oct 5",
          time: "11:00 AM",
          location: "Mumbai, India",
          completed: true,
        },
        {
          status: "Processing",
          date: "Oct 6",
          time: "9:00 AM",
          location: "Warehouse, Mumbai",
          completed: true,
        },
        {
          status: "Shipped",
          date: "Oct 7",
          time: "3:00 PM",
          location: "Distribution Center",
          completed: true,
        },
        {
          status: "In Transit",
          date: "Oct 9",
          time: "8:00 AM",
          location: "Regional Hub",
          completed: true,
        },
        {
          status: "Out for Delivery",
          date: "Oct 12",
          time: "10:00 AM",
          location: "Your Area",
          completed: true,
        },
        {
          status: "Delivered",
          date: "Oct 12",
          time: "2:30 PM",
          location: "Your Address",
          completed: true,
        },
      ],
    },
  ]

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "in-transit":
        return "bg-orange-100 text-orange-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="h-5 w-5" />
      case "shipped":
        return <Package className="h-5 w-5" />
      case "in-transit":
        return <Truck className="h-5 w-5" />
      case "delivered":
        return <CheckCircle className="h-5 w-5" />
      default:
        return <Package className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-secondary/5 border-b border-border">
        <div className="container-custom py-8">
          <h1 className="heading-lg mb-2">Track Your Order</h1>
          <p className="text-muted-foreground">Enter your order number or tracking number to track your shipment</p>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Search Section */}
        <Card className="p-6 mb-8">
          <Label htmlFor="search" className="text-base font-semibold mb-3 block">
            Search Your Order
          </Label>
          <div className="flex gap-2">
            <Input
              id="search"
              placeholder="Enter order number (e.g., ORD-2024-001234) or tracking number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button className="bg-brass-gradient text-white shadow-brass hover:shadow-brass-lg">Search</Button>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-1">
            <h2 className="heading-md mb-4">Your Orders</h2>
            <div className="space-y-3">
              {filteredOrders.length === 0 ? (
                <Card className="p-6 text-center">
                  <p className="text-muted-foreground">No orders found</p>
                </Card>
              ) : (
                filteredOrders.map((order) => (
                  <Card
                    key={order.id}
                    className={`p-4 cursor-pointer transition-all ${
                      selectedOrder?.id === order.id ? "ring-2 ring-primary" : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-sm">{order.orderNumber}</p>
                        <p className="text-xs text-muted-foreground">{order.orderDate}</p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace("-", " ")}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">₹{order.total.toLocaleString()}</p>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-2">
            {selectedOrder ? (
              <div className="space-y-6">
                {/* Order Header */}
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="heading-md mb-2">{selectedOrder.orderNumber}</h2>
                      <p className="text-muted-foreground text-sm">Tracking: {selectedOrder.trackingNumber}</p>
                    </div>
                    <Badge className={`${getStatusColor(selectedOrder.status)} flex items-center gap-2`}>
                      {getStatusIcon(selectedOrder.status)}
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1).replace("-", " ")}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Order Date</p>
                      <p className="font-semibold">{selectedOrder.orderDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Estimated Delivery</p>
                      <p className="font-semibold">{selectedOrder.estimatedDelivery}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Items</p>
                      <p className="font-semibold">{selectedOrder.items}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Total</p>
                      <p className="font-semibold">₹{selectedOrder.total.toLocaleString()}</p>
                    </div>
                  </div>
                </Card>

                {/* Timeline */}
                <Card className="p-6">
                  <h3 className="font-semibold text-lg mb-6">Delivery Timeline</h3>
                  <div className="space-y-6">
                    {selectedOrder.timeline.map((event, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center ${
                              event.completed
                                ? "bg-primary text-white"
                                : "bg-muted text-muted-foreground border-2 border-muted"
                            }`}
                          >
                            {event.completed ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                          </div>
                          {idx < selectedOrder.timeline.length - 1 && (
                            <div className={`w-1 h-12 mt-2 ${event.completed ? "bg-primary" : "bg-muted"}`} />
                          )}
                        </div>
                        <div className="pt-1 pb-6">
                          <p
                            className={`font-semibold ${event.completed ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {event.status}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {event.date} at {event.time}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Support */}
                <Card className="p-6 bg-secondary/5">
                  <h3 className="font-semibold text-lg mb-4">Need Help?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Call us</p>
                        <p className="font-semibold">+91 98765 43210</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email us</p>
                        <p className="font-semibold">support@arpandecores.com</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Helpful Links */}
                <div className="mt-12 pt-8 border-t">{/* Links can be added here */}</div>
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select an order to view tracking details</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
