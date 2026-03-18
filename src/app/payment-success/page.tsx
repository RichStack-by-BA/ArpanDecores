
import Link from 'next/link'
import { CheckCircle, Package, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import DynamicBreadcrumbs from '@/components/ui/Breadcrumbs'

export default async function PaymentSuccessPage({ searchParams }: { searchParams: { orderId?: string } }) {
  const orderNumber = (await searchParams).orderId 
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="container-custom py-12 md:py-20">
      <DynamicBreadcrumbs />

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse"></div>
              <CheckCircle className="h-24 w-24 text-green-600 relative" strokeWidth={1.5} />
            </div>
          </div>

          <h1 className="heading-lg mb-4 text-green-600">Payment Successful!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for your order. We're delighted to serve you with our handcrafted creations.
          </p>
        </div>

        <Card className="bg-card rounded-lg shadow-elegant p-8 mb-8">
          <div className="space-y-6">
            <div className="border-b pb-6">
              <p className="text-sm text-muted-foreground mb-2">Order Number</p>
              <p className="heading-md font-mono">{orderNumber}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-4">Order Status</p>
              <div className="space-y-3">
                {[
                  { label: 'Payment Confirmed', completed: true },
                  { label: 'Order Processing', completed: true },
                  { label: 'Preparing for Shipment', completed: false },
                  { label: 'Shipped', completed: false },
                  { label: 'Delivered', completed: false, date: estimatedDelivery },
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          step.completed ? 'bg-green-600' : 'bg-muted'
                        }`}
                      />
                      {index < 4 && (
                        <div
                          className={`w-0.5 h-8 mt-1 ${
                            step.completed ? 'bg-green-600' : 'bg-muted'
                          }`}
                        />
                      )}
                    </div>
                    <div className="pt-1">
                      <p
                        className={`font-medium ${
                          step.completed ? 'text-green-700' : 'text-muted-foreground'
                        }`}
                      >
                        {step.label}
                      </p>
                      {step.date && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Estimated: {step.date}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900">Expected Delivery</p>
                  <p className="text-sm text-green-700 mt-1">
                    Your order will be carefully prepared and shipped within 2-3 business days.
                    You'll receive tracking information via email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <div className="bg-muted/50 rounded-lg p-6 mb-8">
          <h2 className="font-semibold mb-4">What's Next?</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
              <span>A confirmation email with order details has been sent to your registered email address</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
              <span>Track your shipment in real-time from the Orders section of your account</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
              <span>Leave a review once you receive your order to help other customers</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Link href="/orders">
            <Button variant="outline" className="w-full bg-transparent">
              View My Orders
            </Button>
          </Link>
          <Link href="/shop">
            <Button className="w-full btn-primary">
              Continue Shopping
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Help Section */}
        <div className="text-center pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4">
            Need help? Our artisan team is here to assist you.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contact">
              <Button variant="ghost">Contact Support</Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost">About Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
