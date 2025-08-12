import { Tab, Tabs } from '@heroui/react'
import ShippingOrderForm from './shippingForm'
import { Store, Truck } from 'lucide-react'
import Shipment from './shipment'
import { useEffect, useState } from 'react'
import { createOrderState } from '@/store/order'

export default function ShippingOrder() {
  const [selected, setSelected] = useState('shipping')
  const { orderInfo, setOrderInfo } = createOrderState((state) => state)

  useEffect(() => {
    if (orderInfo?.deliveryMethod === 'pickup') {
      setSelected('pickup')
    }
  }, [orderInfo])

  return (
    <>
      <Tabs
        fullWidth
        className=""
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(key.toString())}
      >
        <Tab
          key="shipping"
          title={
            <div className="flex items-center space-x-2">
              <Truck />
              <span>A domicilio</span>
            </div>
          }
        >
          <ShippingOrderForm />
        </Tab>
        <Tab
          key="pickup"
          title={
            <div className="flex items-center space-x-2">
              <Store />
              <span>Retiro en tienda</span>
            </div>
          }
        >
          <Shipment onBackTab={(store) => setSelected(store)} />
        </Tab>
      </Tabs>
    </>
  )
}
