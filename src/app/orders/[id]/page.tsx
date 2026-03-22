import Link from "next/link";
import { getOrderByOrderID } from "@/lib/api/order";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Separator } from "@/components/ui/Separator";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { MapPin, Download, MessageSquare } from "lucide-react";
import order from "@/components/order";
import Image from "next/image";

interface OrderDetailItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderDetail {
  id: string;
  orderRazorpayId: string;
  createdAt: string;
  totalAmount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  orderStatus: "CREATED" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "RETURNED"
  items: OrderDetailItem[];
  shippingAddress: any;
  billingAddress: any;
  trackingNumber?: string;
  estimatedDelivery?: string;
  paymentMethod: string;
  paymentStatus: "pending" | "completed";
}
  

const statusColors = {
  CREATED: "bg-blue-100 text-blue-800",
  SHIPPED: "bg-amber-100 text-amber-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  RETURNED: "bg-purple-100 text-purple-800",
};

const statusLabels = {
CREATED: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
  RETURNED: "RETURNED",
};

export default async function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = (await params).id;
  const data = await getOrderByOrderID(id);

  if (!data.ok) {
    return <div className="p-10 text-center">Order not found</div>;
  }
  const order: OrderDetail = data?.data;

  console.log("Order details:", order);

  return (
    <div className="container-custom py-8 md:py-12">
      <Breadcrumbs />

      {/* Header */}
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">{order.orderRazorpayId}</h1>
          <p className="text-muted-foreground">Placed on {order.createdAt}</p>
        </div>
        <Badge className={statusColors[order?.orderStatus]}>
          {statusLabels[order?.orderStatus]}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 mb-4">
                  <div className="relative w-20 h-20">
                    <Image
                      src={item.image}
                      alt="Product Image"
                      layout="fill"
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <Link href={`/product/${item.id}`}>
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

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? "Free" : `₹${order.shipping}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{order.tax}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{order.totalAmount}</span>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          {/* <Card>
            <CardHeader>
              <CardTitle>
                <MapPin className="inline mr-2" /> Shipping
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>{order.shippingAddress.name}</div>
              <div>{order.shippingAddress.address}</div>
            </CardContent>
          </Card> */}

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