import OrdersPage from '@/components/order'
import { getAllOrders } from '@/lib/api/order'

const page = async () => {
  const res:any = await getAllOrders()
  console.log(res, "orders res")
  const ordersData = res.data?.data

  if (!res.ok) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">Failed to load orders</h2>
      </div>
    )
  }

  return <OrdersPage ordersData={ordersData?.orders} />
}

export default page