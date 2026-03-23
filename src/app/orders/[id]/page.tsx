import Link from "next/link";
import { getOrderByOrderID } from "@/lib/api/order";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Separator } from "@/components/ui/Separator";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Download, MessageSquare } from "lucide-react";
import Image from "next/image";

/* ================== TYPES ================== */

interface OrderItem {
  _id: string;
  name: string;
  productId: string;
  quantity: number;
  image: string;
  price: number;
}

interface Order {
  _id: string;
  createdAt: string;
  orderStatus: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";

  items: OrderItem[];

  pricing: {
    subTotal: number;
    tax: number;
    shipping: number;
    total: number;
  };

  payment: {
    provider: string;
    status: "PENDING" | "PAID" | "FAILED";
    razorpayOrderId?: string;
  };
}

/* ================== STATUS ================== */

const statusColors = {
  PENDING: "bg-blue-100 text-blue-800",
  CONFIRMED: "bg-amber-100 text-amber-800",
  SHIPPED: "bg-indigo-100 text-indigo-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const statusLabels = {
  PENDING: "PROCESSING",
  CONFIRMED: "CONFIRMED",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
};

/* ================== COMPONENT ================== */

export default async function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id =  (await params).id;

  const data = await getOrderByOrderID(id);

  if (!data.ok) {
    return <div className="p-10 text-center">Order not found</div>;
  }

  const order: Order = data.data;

  /* ================== DESTRUCTURE ================== */

  const {
    _id,
    createdAt,
    orderStatus,
    items,
    pricing,
    payment,
  } = order;

  return (
    <div className="container-custom py-8 md:py-12">
      <Breadcrumbs />

      {/* Header */}
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">
            {payment?.razorpayOrderId || _id}
          </h1>
          <p className="text-muted-foreground">
            Placed on {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>

        <Badge className={statusColors[orderStatus]}>
          {statusLabels[orderStatus]}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ================== ITEMS ================== */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              {items.map((item) => (
                <div key={item._id} className="flex gap-4 mb-4">
                  <div className="relative w-20 h-20">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                  <div className="flex-1">
                    <Link href={`/product/`}>
                      {item.name}
                    </Link>
                    <div className="text-sm">
                      Qty: {item.quantity}
                    </div>
                  </div>

                  <div>₹{item.price * item.quantity}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* ================== SIDEBAR ================== */}
        <div className="space-y-6">
          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{pricing.subTotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {pricing.shipping === 0
                    ? "Free"
                    : `₹${pricing.shipping}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{pricing.tax}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{pricing.total}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle>Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <span>Method</span>
                <span>{payment.provider}</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span>{payment.status}</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Button className="w-full" variant="outline">
            <Download className="mr-2" /> Invoice
          </Button>

          <Button className="w-full" variant="outline">
            <MessageSquare className="mr-2" /> Support
          </Button>

          <Link href="/orders">
            <Button className="w-full">Back</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}