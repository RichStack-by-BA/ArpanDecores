'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AddressModal } from '@/components/address/AddressModal'
import { AddressCard } from '@/components/address/AddressCard'
import { deleteAddress, updateAddress } from '@/lib/api/address'

interface Address {
    _id: string
    addressType: 'HOME' | 'WORK' | 'OTHER'
    name: string
    phone: string
    addressLine1: string
    city: string
    state: string
    postalCode: string
    isDefault: boolean
}

export default function AddressesPage({ allAddress }: any) {
    const [addresses, setAddresses] = useState<Address[]>(allAddress || [])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingAddress, setEditingAddress] = useState<Address | undefined>()

    const handleEditClick = (address: Address) => {
        setEditingAddress(address)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setEditingAddress(undefined)
    }

    // ✅ FINAL WORKING STATE UPDATE
    const handleAddressSuccess = (addr: any, isEdit: boolean) => {

        const newAddress: Address = {
            ...addr,
            _id: addr._id || addr.id, // normalize
        }

        setAddresses((prev) => {
            let updated = isEdit
                ? prev.map((a) =>
                    a._id === newAddress._id ? newAddress : a
                )
                : [newAddress, ...prev]

            // ✅ ensure only one default
            if (newAddress.isDefault) {
                updated = updated.map((a) => ({
                    ...a,
                    isDefault: a._id === newAddress._id,
                }))
            }

            return updated
        })
    }

    const handleDeleteAddress = async (id: string) => {
        try {
            const res = await deleteAddress(id)

            if (res.ok) {
                setAddresses((prev) => prev.filter((a) => a._id !== id))
            } else {
                console.error(res.error.message)
            }
        } catch (err) {
            console.error("Delete failed:", err)
        }
    }

    const handleSetDefault = async (id: string) => {
        try {
            const res = await updateAddress(id, { isDefault: true })

            if (res.ok) {
                setAddresses((prev) =>
                    prev.map((addr) => ({
                        ...addr,
                        isDefault: addr._id === id,
                    }))
                )
            } else {
                console.error(res.error.message)
            }
        } catch (err) {
            console.error("Set default failed:", err)
        }
    }

    return (
        <div className="p-6">
            <Button
                onClick={() => {
                    setEditingAddress(undefined)
                    setIsModalOpen(true)
                }}
                className="mb-4 flex items-center gap-2"
            >
                <Plus className="h-4 w-4" />
                Add Address
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                    <AddressCard
                        key={address._id}
                        address={address}
                        onDelete={handleDeleteAddress}
                        onEdit={() => handleEditClick(address)}
                        onSetDefault={handleSetDefault}
                    />
                ))}
            </div>

            <AddressModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                initialData={editingAddress}
                onSuccess={handleAddressSuccess}
            />
        </div>
    )
}