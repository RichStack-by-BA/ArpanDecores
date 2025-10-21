"use client";
import React from "react";
import { Tabs } from "@/components/ui/Tabs";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Specification {
  key: string;
  value: string;
}

interface Review {
  rating: number;
  name: string;
  time: string;
  comment: string;
}

interface Product {
  name: string;
  description: string;
  specifications: Specification[];
  reviews: Review[];
}

export default function ProductTabs({ product }: { product: Product }) {
  const tabs = [
    {
      value: "description",
      label: "Description",
      content: (
        <div className="prose prose-sm max-w-none">
          <h3 className="font-playfair font-semibold text-lg mb-4">
            Product Description
          </h3>
          <p>{product.description || "No description available."}</p>
        </div>
      ),
    },
    {
      value: "specifications",
      label: "Specifications",
      content: (
        <div className="space-y-4">
          <h3 className="font-playfair font-semibold text-lg mb-4">
            Specifications
          </h3>
          {product.specifications?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specifications.map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between py-2 border-b"
                >
                  <span className="font-medium">{spec.key}:</span>
                  <span>{spec.value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No specifications available.</p>
          )}
        </div>
      ),
    },
    {
      value: "reviews",
      label: "Reviews",
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-playfair font-semibold text-lg">
              Customer Reviews
            </h3>
            <Button variant="outline">Write a Review</Button>
          </div>

          {product.reviews?.length ? (
            <div className="space-y-4">
              {product.reviews.map((review, idx) => (
                <div key={idx} className="border-b pb-4">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-primary text-primary"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">{review.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {review.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No reviews yet.</p>
          )}
        </div>
      ),
    },
  ];

  return <Tabs tabs={tabs} defaultValue="description" className="mt-16" />;
}
