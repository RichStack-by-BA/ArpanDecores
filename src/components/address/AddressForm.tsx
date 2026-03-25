'use client'

import { UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Checkbox } from '@/components/ui/Checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup'
import {AddressFormValues} from '@/lib/schemas/index'


interface AddressFormProps {
  form: UseFormReturn<AddressFormValues>
}

export default function AddressForm({ form }: AddressFormProps) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form

  return (
    <>
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div>
          <Label>Full Name *</Label>
          <Input autoFocus {...register('name')} className="my-1" />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <Label>Phone *</Label>
        <Input {...register('phone')} className="my-1" />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>

      <div className="mb-6">
        <Label>Address *</Label>
        <Input {...register('addressLine1')} className="my-1" />
        {errors.addressLine1 && (
          <p className="text-red-500 text-sm">
            {errors.addressLine1.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <Label>City *</Label>
          <Input {...register('city')} className="my-1" />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>

        <div>
          <Label>State *</Label>
          <Input {...register('state')} className="my-1" />
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state.message}</p>
          )}
        </div>

        <div>
          <Label>Postal Code *</Label>
          <Input {...register('postalCode')} className="my-1" />
          {errors.postalCode && (
            <p className="text-red-500 text-sm">
              {errors.postalCode.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Checkbox
          checked={watch('isDefault') || false}
          onChange={(val) => setValue('isDefault', !!val)}
        />
        <Label className="cursor-pointer">Set as default</Label>
      </div>

      <div className="mb-6">
        <Label className="mb-2 block">Address Type *</Label>

        <RadioGroup
          value={watch('addressType')}
          onChange={(val) => setValue('addressType', val as any)}
          className="flex gap-4"
        >
          <RadioGroupItem value="HOME" label="Home" />
          <RadioGroupItem value="WORK" label="Work" />
          <RadioGroupItem value="OTHER" label="Other" />
        </RadioGroup>

        {errors.addressType && (
          <p className="text-red-500 text-sm mt-1">
            {errors.addressType.message}
          </p>
        )}
      </div>
    </>
  )
}