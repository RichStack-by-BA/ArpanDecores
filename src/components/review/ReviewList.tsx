"use client"

import { useState } from "react"
import { Star, ThumbsUp, Flag } from "lucide-react"
import { Button } from "@/components/ui/Button"
import ReviewForm from "@/components/review/ReviewForm"

interface Review {
  id: string
  rating: number
  name: string
  title: string
  comment: string
  date: string
  helpful: number
}

interface ReviewsListProps {
  productId: string
}

export default function ReviewsList({ productId }: ReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      rating: 5,
      name: "Satisfied Customer",
      title: "Absolutely beautiful craftsmanship!",
      comment:
        "The quality exceeded my expectations and it looks perfect in my home. Highly recommend this product to anyone looking for something special.",
      date: "2 weeks ago",
      helpful: 24,
    },
    {
      id: "2",
      rating: 5,
      name: "Happy Shopper",
      title: "Perfect gift for my friend",
      comment:
        "I ordered this as a gift and my friend absolutely loved it! The packaging was elegant and the product arrived in perfect condition.",
      date: "3 weeks ago",
      helpful: 18,
    },
    {
      id: "3",
      rating: 4,
      name: "John Doe",
      title: "Great quality, fast delivery",
      comment:
        "Very satisfied with the product quality. It arrived faster than expected. Minor issue with packaging but nothing damaged.",
      date: "1 month ago",
      helpful: 12,
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [sortBy, setSortBy] = useState<"recent" | "helpful" | "rating">("recent")

  const averageRating =
    reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "helpful") return b.helpful - a.helpful
    if (sortBy === "rating") return b.rating - a.rating
    return 0 // Keep original order for "recent"
  })

  const handleReviewSubmitted = () => {
    setShowForm(false)
  }

  return (
    <div className="space-y-8">
      {/* Reviews Header */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h3 className="font-playfair font-semibold text-lg mb-2">Customer Reviews</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(Number(averageRating)) ? "fill-primary text-primary" : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-lg">{averageRating}</span>
                <span className="text-sm text-muted-foreground">({reviews.length} reviews)</span>
              </div>
            </div>
          </div>

          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              Write a Review
            </Button>
          )}
        </div>

        {/* Sort Options */}
        <div className="flex gap-2 flex-wrap">
          {(["recent", "helpful", "rating"] as const).map((option) => (
            <button
              key={option}
              onClick={() => setSortBy(option)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                sortBy === option
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Sort by {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Review Form */}
      {showForm && (
        <div>
          <ReviewForm productId={productId} onReviewSubmitted={handleReviewSubmitted} />
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No reviews yet. Be the first to review this product!</p>
        ) : (
          sortedReviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium text-sm">{review.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{review.name}</span>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3">{review.comment}</p>

              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <ThumbsUp className="h-4 w-4" />
                  Helpful ({review.helpful})
                </button>
                <button className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors">
                  <Flag className="h-4 w-4" />
                  Report
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
