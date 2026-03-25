"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Package } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { OrderCardEnhanced } from "./order-details"
import DynamicBreadcrumbs from "@/components/ui/Breadcrumbs"

/* ================== TYPES ================== */

export interface Order {
  _id: string
  userId: string

  pricing: Pricing
  offer?: Offer | null

  items: OrderItem[]

  shippingAddress: ShippingAddress
  shippingAddressId: string

  payment: Payment

  orderStatus: OrderStatus

  createdAt: string
  updatedAt: string
}

export interface Pricing {
  subTotal: number
  tax: number
  shipping: number
  discount: number
  total: number
}

export interface Offer {
  offerId: string
  code: string
  discountType: "FLAT" | "PERCENTAGE"
  discountValue: number
}

export interface ShippingAddress {
  name: string
  phone: string
  addressLine1: string
  city: string
  state: string
  postalCode: string
  addressType: "HOME" | "WORK" | "OTHER"
  country: string
}

export interface Payment {
  provider: "RAZORPAY" | "STRIPE" | "COD"
  razorpayOrderId?: string
  razorpayPaymentId?: string
  razorpaySignature?: string

  status: "PENDING" | "PAID" | "FAILED"
  paidAt?: string
}

export interface OrderItem {
  _id: string
  name: string
  productId: string
  variantId?: string
  quantity: number
  image: string
  price: number
}

export type OrderStatus = "CREATED" | "CONFIRMED" | "PACKED" | "SHIPPED" | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED" | "RETURNED";

/* ================== COMPONENT ================== */

export default function OrdersPage({ ordersData }: { ordersData: Order[] }) {
  const [orders] = useState<Order[]>(ordersData)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  /* ================== FILTER LOGIC ================== */

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus =
        filterStatus === "all" || order.orderStatus === filterStatus

      const razorpayId = order.payment?.razorpayOrderId || ""

      const matchesSearch =
        searchQuery === "" ||
        razorpayId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order._id.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesStatus && matchesSearch
    })
  }, [orders, filterStatus, searchQuery])

  /* ================== UI ================== */

  return (
    <div className="container-custom py-8 md:py-12">
      {/* Breadcrumbs */}
      <div className="mb-8">
        <DynamicBreadcrumbs />
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="heading-lg mb-2">My Orders</h1>
        <p className="text-muted-foreground">
          Track and manage all your orders in one place
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <p className="text-sm text-muted-foreground">
          {filteredOrders.length}{" "}
          {filteredOrders.length === 1 ? "order" : "orders"} found
        </p>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-bounce" />
            <h3 className="heading-sm mb-2">No orders found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery
                ? "No orders match your search."
                : "You don't have any orders yet."}
            </p>
            <Link href="/shop">
              <Button className="btn-primary">Continue Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4 animate-in fade-in duration-500">
          {filteredOrders.map((order) => {
            const {
              _id,
              createdAt,
              orderStatus,
              items,
              pricing,
              payment,
            } = order

            return (
              <OrderCardEnhanced
                key={_id}
                id={_id}
                orderNumber={payment?.razorpayOrderId || ""}
                date={createdAt}
                totalAmount={pricing.total}
                orderStatus={orderStatus}
                items={items}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}