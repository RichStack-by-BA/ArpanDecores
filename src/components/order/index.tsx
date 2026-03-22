"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {  Package } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { OrderSearch } from "@/components/order-search"
// import { OrderStats } from "@/components/order-stats"
import { OrderCardEnhanced } from "./order-details"
import DynamicBreadcrumbs from "@/components/ui/Breadcrumbs"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  _id: string
  razorpayOrderId: string
  createdAt: string
  totalAmount: number
  orderStatus: "CREATED" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "RETURNED"
  items: OrderItem[]
  // shippingAddress: {
  //   name: string
  //   address: string
  //   city: string
  //   state: string
  //   pincode: string
  // }
  trackingNumber?: string
  estimatedDelivery?: string
}


const statusColors = {
  CREATED: "bg-blue-100 text-blue-800",
  CONFIRMED: "bg-amber-100 text-amber-800",
  SHIPPED: "bg-green-100 text-green-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  RETURNED: "bg-red-100 text-red-800",
}


export default function OrdersPage({ordersData}:any) {
  const [orders] = useState<Order[]>(ordersData )
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  console.log("Orders data in OrdersPage:", orders)
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = filterStatus === "all" || order.orderStatus === filterStatus
      const matchesSearch = searchQuery === "" || 
        order.razorpayOrderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (order.trackingNumber && order.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesStatus && matchesSearch
    })
  }, [orders, filterStatus, searchQuery])

  return (
    <div className="container-custom py-8 md:py-12">
      {/* Dynamic Breadcrumbs */}
      <div className="mb-8">
        <DynamicBreadcrumbs />
      </div>

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="heading-lg mb-2">My Orders</h1>
        <p className="text-muted-foreground">Track and manage all your orders in one place</p>
      </div>

      {/* Order Stats */}
      {/* <div className="mb-8">
        <OrderStats 
          total={orders.length}
          processing={orders.filter((o) => o.status === "processing").length}
          shipped={orders.filter((o) => o.status === "shipped").length}
          delivered={orders.filter((o) => o.status === "delivered").length}
        />
      </div> */}

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* <OrderSearch onSearch={setSearchQuery} /> */}
        
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'} found
            </p>
          </div>
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
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-bounce" />
            <h3 className="heading-sm mb-2">No orders found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? "No orders match your search." : "You don't have any orders with this status yet."}
            </p>
            <Link href="/shop">
              <Button className="btn-primary">Continue Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4 animate-in fade-in duration-500">
          {filteredOrders.map((order) => (
            <OrderCardEnhanced
              key={order._id}
              id={order._id}
              orderNumber={order.razorpayOrderId}
              date={order.createdAt}
              totalAmount={order.totalAmount}
              orderStatus={order.orderStatus}
              items={order.items}
              trackingNumber={order.trackingNumber}
              estimatedDelivery={order.estimatedDelivery}
              // shippingAddress={order.shippingAddress}
            />
          ))}
        </div>
      )}
    </div>
  )
}
