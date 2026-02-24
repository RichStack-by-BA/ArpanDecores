"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Package, Calendar, MapPin, DollarSign, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/Collapsible"
import Breadcrumbs from "@/components/ui/Breadcrumbs"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  orderNumber: string
  date: string
  total: number
  status: "processing" | "shipped" | "delivered" | "cancelled"
  items: OrderItem[]
  shippingAddress: {
    name: string
    address: string
    city: string
    state: string
    pincode: string
  }
  trackingNumber?: string
  estimatedDelivery?: string
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    date: "Jan 15, 2024",
    total: 3899,
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
    },
    trackingNumber: "TRK123456789",
    estimatedDelivery: "Jan 20, 2024",
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    date: "Jan 18, 2024",
    total: 5299,
    status: "shipped",
    items: [
      {
        id: "3",
        name: "Wedding Gift Box Set",
        price: 3999,
        quantity: 1,
        image: "/images/products/wedding-gift-box.jpg",
      },
      {
        id: "4",
        name: "Personalized Metal Keychain",
        price: 599,
        quantity: 2,
        image: "/images/products/personalized-keychain.jpg",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      address: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    },
    trackingNumber: "TRK987654321",
    estimatedDelivery: "Jan 25, 2024",
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    date: "Jan 22, 2024",
    total: 2299,
    status: "processing",
    items: [
      {
        id: "5",
        name: "Wooden Wall Art",
        price: 2299,
        quantity: 1,
        image: "/images/products/wooden-wall-art.jpg",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      address: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    },
  },
]

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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredOrders = orders.filter((order) => filterStatus === "all" || order.status === filterStatus)

  return (
    <div className="container-custom py-8 md:py-12">
        <Breadcrumbs  />

      <div className="mb-8">
        <h1 className="heading-lg mb-2">My Orders</h1>
        <p className="text-muted-foreground">View and track all your orders</p>
      </div>

      {/* Filter and Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{orders.length}</div>
            <div className="text-sm text-muted-foreground">Total Orders</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {orders.filter((o) => o.status === "processing").length}
            </div>
            <div className="text-sm text-muted-foreground">Processing</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">
              {orders.filter((o) => o.status === "shipped").length}
            </div>
            <div className="text-sm text-muted-foreground">Shipped</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {orders.filter((o) => o.status === "delivered").length}
            </div>
            <div className="text-sm text-muted-foreground">Delivered</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Dropdown */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="heading-md">Order History</h2>
        {/* <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select> */}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="heading-sm mb-2">No orders found</h3>
            <p className="text-muted-foreground mb-6">You don't have any orders with this status yet.</p>
            <Link href="/shop">
              <Button className="btn-primary">Continue Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Collapsible key={order.id} open={expandedOrder === order.id} onOpenChange={(open) => setExpandedOrder(open ? order.id : null)}>
              <Card>
                <CollapsibleTrigger asChild>
                  <div className="p-6 cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Order Number</div>
                        <div className="font-semibold">{order.orderNumber}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Order Date</div>
                        <div className="font-semibold flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {order.date}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
                        <div className="font-semibold flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          ₹{order.total.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge className={`${statusColors[order.status]} font-medium`}>
                          {statusLabels[order.status]}
                        </Badge>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${expandedOrder === order.id ? "rotate-180" : ""}`}
                        />
                      </div>
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="px-6 pb-6 border-t pt-6 space-y-6">
                    {/* Order Items */}
                    <div>
                      <h4 className="font-semibold mb-4">Order Items</h4>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                            <div className="w-16 h-16 rounded-md bg-muted flex-shrink-0">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-full h-full object-cover rounded-md"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">₹{item.price.toLocaleString()}</div>
                              <div className="text-xs text-muted-foreground">
                                ₹{(item.price * item.quantity).toLocaleString()} total
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Shipping Address
                      </h4>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <div className="font-medium">{order.shippingAddress.name}</div>
                        <div className="text-sm text-muted-foreground">{order.shippingAddress.address}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
                        </div>
                      </div>
                    </div>

                    {/* Tracking Information */}
                    {(order.status === "shipped" || order.status === "delivered") && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          Tracking Information
                        </h4>
                        <div className="p-3 bg-muted/30 rounded-lg space-y-2">
                          {order.trackingNumber && (
                            <div>
                              <div className="text-sm text-muted-foreground">Tracking Number</div>
                              <div className="font-semibold">{order.trackingNumber}</div>
                            </div>
                          )}
                          {order.estimatedDelivery && (
                            <div>
                              <div className="text-sm text-muted-foreground">Estimated Delivery</div>
                              <div className="font-semibold">{order.estimatedDelivery}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Order Timeline */}
                    {order.status === "shipped" && (
                      <div>
                        <h4 className="font-semibold mb-3">Order Status Timeline</h4>
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
                                  className={`w-3 h-3 rounded-full ${
                                    step.completed ? "bg-green-500" : "bg-muted"
                                  }`}
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
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t">
                      <Link href={`/orders/${order.id}`} className="flex-1">
                        <Button variant="outline" className="w-full bg-transparent">
                          View Details
                        </Button>
                      </Link>
                      {order.status === "delivered" && (
                        <Link href={`/product/${order.items[0].id}`} className="flex-1">
                          <Button variant="outline" className="w-full bg-transparent">
                            Leave Review
                          </Button>
                        </Link>
                      )}
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Download Invoice
                      </Button>
                    </div>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      )}
    </div>
  )
}
