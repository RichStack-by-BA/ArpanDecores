import React from 'react'

const CartSkeleton = () => {
    return (
        <div className='container-custom mt-10'>
            <div className='grid grid-cols-3 gap-8' >
                <div className='md:col-span-2 space-y-6 '>
                    {Array.from({ length: 4 }).map((_, index) => ( 
                        <div key={index} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 animate-pulse">
                            <div className="relative h-24 w-24 rounded-md bg-gray-200 flex-shrink-0" />

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between mb-2">
                                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-5 bg-gray-200 rounded w-16"></div>
                                </div>

                                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>

                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-2 border rounded-full px-2 py-1">
                                        <div className="h-8 w-8 bg-gray-200 rounded-full" />
                                        <div className="h-5 w-6 bg-gray-200 rounded" />
                                        <div className="h-8 w-8 bg-gray-200 rounded-full" />
                                    </div>

                                    <div className="h-5 w-20 bg-gray-200 rounded" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>

                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                            <div className="h-4 bg-gray-200 rounded w-12"></div>
                        </div>
                        <div className="flex justify-between text-sm">
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-12"></div>
                        </div>
                        <hr className="my-3 border-gray-200" />
                        <div className="flex justify-between font-semibold text-base">
                            <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-5 bg-gray-200 rounded w-16"></div>
                        </div>
                    </div>

                    <div className="space-y-2 mb-6">
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        <div className="flex gap-2">
                            <div className="flex-1 h-10 bg-gray-200 rounded"></div>
                            <div className="h-10 w-20 bg-gray-200 rounded"></div>
                        </div>
                    </div>

                    <div className="h-12 bg-gray-200 rounded w-full"></div>
                </div>
            </div>

        </div>
    )
}

export default CartSkeleton