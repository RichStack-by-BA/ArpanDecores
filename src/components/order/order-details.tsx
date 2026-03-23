'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Package, Calendar, DollarSign, MapPin, Truck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible'

interface OrderItem {
  _id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface OrderCardEnhancedProps {
  id: string
  orderNumber: string
  date: string
  totalAmount: number
  orderStatus: 'CREATED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'RETURNED'
  items: OrderItem[]
  trackingNumber?: string
  estimatedDelivery?: string
  shippingAddress?: {
    name: string
    city: string
    state: string
  }
}

const orderStatusConfig = {
  CREATED : {
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: '⏳',
    label: 'Created'
  },
  SHIPPED: {
    color: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: '📦',
    label: 'Shipped'
  },
  DELIVERED: {
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: '✓',
    label: 'Delivered'
  },
  CANCELLED: {
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: '✕',
    label: 'Cancelled'
  },
    RETURNED: {
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: '↩️',
        label: 'Returned'
    }

}

export function OrderCardEnhanced({
  id,
  orderNumber,
  date,
  totalAmount,
  orderStatus,
  items,
  trackingNumber,
  estimatedDelivery,
  shippingAddress
}: OrderCardEnhancedProps) {
  const [isOpen, setIsOpen] = useState(false)
  const config = orderStatusConfig[orderStatus] 
  console.log(config,"++++++",orderStatus)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <CollapsibleTrigger asChild>
          <div className="cursor-pointer p-6 hover:bg-muted/30 transition-colors">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              {/* Order Number */}
              <div>
                <div className="text-xs font-medium text-muted-foreground uppercase">Order</div>
                <div className="font-semibold text-base mt-1">{orderNumber}</div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-xs font-medium text-muted-foreground uppercase">Date</div>
                  <div className="font-medium text-sm mt-1">{date}</div>
                </div>
              </div>

              {/* Amount */}
              <div className="flex items-center gap-2">
                <div>
                  <div className="text-xs font-medium text-muted-foreground uppercase">Amount</div>
                  <div className="font-semibold text-base mt-1">₹{totalAmount?.toLocaleString()}</div>
                </div>
              </div>

              {/* Items Count */}
              <div className="flex items-center gap-2">
                <Package className="h-4  text-muted-foreground" />
                <div>
                  <div className="text-xs font-medium text-muted-foreground uppercase">Items</div>
                  <div className="font-medium text-sm mt-1">{items?.length}</div>
                </div>
              </div>

              {/* Status and Expand */}
              <div className="flex items-center justify-between">
                <Badge className={`${config?.color} border font-medium`}>
                  {config?.label}
                </Badge>
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </div>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="border-t bg-muted/20 p-6 space-y-6">
            {/* Items Preview */}
            <div>
              <h4 className="font-semibold mb-3">Items Ordered</h4>
              <div className="grid gap-3">
                {items.slice(0, 3).map((item:any,index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                    <div className="w-14 h-14 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                      <img
                        src={item.image || '/placeholder.svg'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-muted-foreground">Qty: {item.quantity}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm">₹{item?.price?.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
                {items.length > 3 && (
                  <div className="text-sm text-muted-foreground text-center py-2">
                    +{items.length - 3} more items
                  </div>
                )}
              </div>
            </div>

            {/* Shipping Info */}
            {shippingAddress && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Shipping Address
                </h4>
                <div className="p-3 bg-background rounded-lg border text-sm">
                  <div className="font-medium">{shippingAddress.name}</div>
                  <div className="text-muted-foreground">{shippingAddress.city}, {shippingAddress.state}</div>
                </div>
              </div>
            )}

            {/* Tracking Info */}
            {(orderStatus === 'SHIPPED' || orderStatus === 'DELIVERED') && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Tracking
                </h4>
                <div className="p-3 bg-background rounded-lg border space-y-2">
                  {trackingNumber && (
                    <div>
                      <div className="text-xs text-muted-foreground">Tracking Number</div>
                      <div className="font-mono font-semibold text-sm">{trackingNumber}</div>
                    </div>
                  )}
                  {estimatedDelivery && (
                    <div>
                      <div className="text-xs text-muted-foreground">Est. Delivery</div>
                      <div className="font-medium text-sm">{estimatedDelivery}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Link href={`/orders/${id}`} className="flex-1">
                <Button variant="outline" className="w-full">View Details</Button>
              </Link>
              <Button variant="outline" className="flex-1">Download Invoice</Button>
              {orderStatus === 'DELIVERED' && (
                <Button className="flex-1 btn-primary">Leave Review</Button>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
