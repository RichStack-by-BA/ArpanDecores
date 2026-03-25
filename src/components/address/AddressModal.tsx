'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  AddressFormValues,
  addressSchema,
} from '@/lib/schemas'

import { Button } from '@/components/ui/Button'
import { addAddress, updateAddress } from '@/lib/api/address'
import AddressForm from './AddressForm'

interface AddressModalProps {
  isOpen: boolean
  onClose: () => void
  initialData?: AddressFormValues & { _id?: string }
  onSuccess?: (data: any, isEdit: boolean) => void
}

export function AddressModal({
  isOpen,
  onClose,
  initialData,
  onSuccess,
}: AddressModalProps) {
  const [loading, setLoading] = useState(false)

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      addressType: 'HOME',
      isDefault: false,
    },
  })

  useEffect(() => {
    if (initialData) {
      form.reset(initialData)
    } else {
      form.reset({
        addressType: 'HOME',
        isDefault: false,
      })
    }
  }, [initialData, form, isOpen])

  const onSubmit = async (data: AddressFormValues) => {
    setLoading(true)

    try {
      if (initialData?._id) {
        const res = await updateAddress(initialData._id, data)

        if (res.ok) {
          const { address } = res.data
          onSuccess?.(address, true)
        } else {
          console.error(res.error)
        }
      } else {
        const res = await addAddress(data)

        if (res.ok) {
          const { address } = res.data

          onSuccess?.(address, false)
        } else {
          console.error(res.error)
        }
      }

      handleClose()
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={handleClose}
        className="absolute inset-0 bg-black/50"
      />

      <motion.div className="relative bg-white rounded-xl shadow-lg w-full max-w-2xl p-6">
        <button onClick={handleClose} className="absolute top-4 right-4">
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-lg font-semibold mb-4">
          {initialData ? 'Edit Address' : 'Add Address'}
        </h2>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <AddressForm form={form} />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? 'Saving...'
              : initialData
                ? 'Update Address'
                : 'Save Address'}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}