'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import AddressForm, { AddressFormValues } from './AddressForm'
import { Button } from '@/components/ui/Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addAddress } from '@/lib/api/address'

interface AddressModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddressModal({ isOpen, onClose }: AddressModalProps) {
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()

  const form = useForm<AddressFormValues>({
    defaultValues: {
      addressType: 'HOME',
      isDefault: false,
    },
  })

  const addAddressMutation = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
      onClose()
    },
  })

  const onSubmit = async (data: AddressFormValues) => {
    setLoading(true)
    try {
      await addAddressMutation.mutateAsync(data)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-hidden"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Add Address</h2>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AddressForm form={form} />

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Address'}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}