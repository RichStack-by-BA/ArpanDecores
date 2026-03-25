'use client'

import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Edit2, Trash2, CheckCircle2, MapPin } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog'

interface Address {
  _id: string
  addressType: string
  name: string
  phone: string
  addressLine1: string
  city: string
  state: string
  postalCode: string
  isDefault: boolean
}

interface AddressCardProps {
  address: Address
  onEdit: () => void
  onDelete: (_id:string) => void
  onSetDefault: (_id:string) => void
}

export function AddressCard({ address, onEdit, onDelete, onSetDefault }: AddressCardProps) {
  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
      {/* Default Badge */}
      {address.isDefault && (
        <div className="absolute top-0 right-0 bg-green-100 text-green-800 px-3 py-1 text-xs font-medium flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" />
          Default
        </div>
      )}

      <CardContent className="p-6 pt-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              {address.addressType}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{address.name}</p>
          </div>
          {!address.isDefault && (
            <Button
              size="sm"
              variant="ghost"
              onClick={()=>onSetDefault(address._id)}
              className="text-xs"
            >
              Set Default
            </Button>
          )}
        </div>

        {/* Address Details */}
        <div className="space-y-2 mb-6 p-3 bg-muted/30 rounded-lg">
          <p className="text-sm">{address.addressLine1}</p>
          <p className="text-sm">
            {address.city}, {address.state} {address.postalCode}
          </p>
          <p className="text-sm text-muted-foreground">{address.phone}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="flex-1 bg-transparent"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent hover:bg-red-50 hover:text-red-600 hover:border-red-300"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Address</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this address? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex gap-3">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={()=>onDelete(address._id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  )
}
