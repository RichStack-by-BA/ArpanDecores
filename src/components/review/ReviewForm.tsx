"use client"

import { useState } from "react"
import { Star, X, Upload, Check } from "lucide-react"
import { Button } from "../ui/Button"

interface ReviewFormProps {
  productId: string
  onReviewSubmitted: () => void
}

export default function ReviewForm({ productId, onReviewSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const MAX_IMAGES = 2

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newImages: string[] = []
    
    files.forEach(file => {
      if (images.length + newImages.length < MAX_IMAGES) {
        const url = URL.createObjectURL(file)
        newImages.push(url)
      }
    })
    
    setImages(prev => [...prev, ...newImages])
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (!comment || rating === 0) return

    setIsSubmitting(true)
    setTimeout(() => {
      setShowSuccess(true)
      setTimeout(() => {
        setRating(0)
        setComment("")
        setImages([])
        setShowSuccess(false)
        onReviewSubmitted()
      }, 1500)
    }, 800)
  }

  const isValid = comment.trim().length >= 10 && rating > 0

  if (showSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-full mb-3">
          <Check className="h-6 w-6 text-white" />
        </div>
        <p className="text-green-800 font-medium">Review submitted successfully!</p>
      </div>
    )
  }


  return (
    <div className="border border-slate-200 rounded-lg p-6 space-y-5">
      <h3 className="font-semibold text-lg text-slate-900">Write a Review</h3>

      {/* Rating */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Your Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`h-7 w-7 transition-colors ${
                  star <= (hoveredRating || rating) 
                    ? "fill-yellow-400 text-yellow-400" 
                    : "fill-slate-200 text-slate-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Your Review</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this product..."
          className="w-full h-24 p-3 border border-slate-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          disabled={isSubmitting}
        />
        <div className="flex justify-end">
          <span className={`text-xs ${comment.length >= 10 ? 'text-green-600' : 'text-slate-400'}`}>
            {comment.length}/10 minimum
          </span>
        </div>
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Photos ({images.length}/{MAX_IMAGES})
        </label>
        
        <div className="flex gap-2 flex-wrap">
          {images.map((url, index) => (
            <div key={index} className="relative w-20 h-20 group">
              <img
                src={url}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover rounded-lg border border-slate-200"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}

          {images.length < MAX_IMAGES && (
            <label className="w-20 h-20 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer flex items-center justify-center">
              <Upload className="h-5 w-5 text-slate-400" />
              <input 
                type="file" 
                accept="image/*" 
                multiple
                className="hidden" 
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>
      </div>

      {/* Submit */}
      <Button
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting || !isValid}
        className={`w-full py-2.5 rounded-lg font-medium btn-primary text-white  text-sm transition-all ${
          isValid && !isSubmitting
            ? ""
            : ""
        }`}
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </div>
  )
}