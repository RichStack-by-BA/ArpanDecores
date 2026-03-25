import AddressesPage from '@/components/address'
import { getAllAddresses } from '@/lib/api/address'

const page = async() => {
    const res:any =  await getAllAddresses()
    const allAddress:any = res?.data?.data?.addresses;
    console.log(allAddress)
  return (
    <AddressesPage allAddress={allAddress||[]}/>
  )
}

export default page