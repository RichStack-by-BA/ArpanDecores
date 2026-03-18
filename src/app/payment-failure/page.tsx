'use client'

import Link from 'next/link'
import { AlertCircle, ArrowLeft, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import DynamicBreadcrumbs from '@/components/ui/Breadcrumbs'

export default function PaymentFailurePage() {
  const handleRetry = () => {
    // Navigate back to checkout
    window.location.href = '/checkout'
  }

  return (
    <div className="container-custom py-12 md:py-20">
      {/* Breadcrumbs */}
      <DynamicBreadcrumbs />

      <div className="max-w-2xl mx-auto">
        {/* Error Animation */}
        <div className="text-center mb-12">
          <div className="inline-flex mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse"></div>
              <AlertCircle className="h-24 w-24 text-red-600 relative" strokeWidth={1.5} />
            </div>
          </div>

          <h1 className="heading-lg mb-4 text-red-600">Payment Failed</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Unfortunately, we couldn't process your payment. Your order has not been created.
          </p>
        </div>

        {/* Error Details Card */}
        <Card className="bg-card rounded-lg shadow-elegant p-8 mb-8">
          <div className="space-y-6">
            {/* Error Message */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="font-medium text-red-900 mb-2">Payment Error</p>
              <p className="text-sm text-red-700">
                The payment could not be processed. This could be due to insufficient funds, 
                incorrect card details, or a temporary issue with your payment provider.
              </p>
            </div>

            {/* Reasons & Solutions */}
            <div className="border-t border-b py-6">
              <h3 className="font-semibold mb-4">Possible Reasons:</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                  <span>Insufficient funds in your account</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                  <span>Incorrect card number, CVV, or expiration date</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                  <span>Card blocked or declined by your bank</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                  <span>Temporary network or server issue</span>
                </li>
              </ul>
            </div>

            {/* What To Do */}
            <div>
              <h3 className="font-semibold mb-4">What You Can Do:</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                  <span>Verify your card details and try again</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                  <span>Use a different payment method or card</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                  <span>Contact your bank to ensure your card is active</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                  <span>Try again after a few minutes if it's a temporary issue</span>
                </li>
              </ul>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <span className="font-medium">Good news:</span> Your items remain in your cart, 
                so you can retry whenever you're ready.
              </p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Link href="/cart">
            <Button variant="outline" className="w-full bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Button>
          </Link>
          <Button className="w-full btn-primary" onClick={handleRetry}>
            Retry Payment
          </Button>
        </div>

        {/* Help Section */}
        <div className="text-center pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4">
            Still having trouble? Our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button variant="ghost" className="w-full sm:w-auto">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </Link>
            <Link href="/faq">
              <Button variant="ghost" className="w-full sm:w-auto">
                View FAQs
              </Button>
            </Link>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg text-center">
          <p className="text-xs text-muted-foreground">
            🔒 Your payment information is secure and encrypted. 
            We never store your complete card details.
          </p>
        </div>
      </div>
    </div>
  )
}
