import { Chip } from '@heroui/react'
import { ArrowDown, ArrowUp } from 'lucide-react'

const dataConversionRates = [
  {
    id: '5',
    name: 'Ganancias totales',
    value: 15000,
    percentage: 30,
    change: 5000,
    status: 'positive',
    isMoney: true,
  },
  {
    id: '1',
    name: 'Clientes generados',
    value: 405,
    percentage: 20,
    change: 29,
    status: 'positive',
  },
  {
    id: '2',
    name: 'Ventas perdidas',
    value: 120,
    percentage: 10,
    change: 15,
    status: 'negative',
  },
  {
    id: '3',
    name: 'Ventas cerradas',
    value: 30,
    percentage: 50,
    change: 10,
    status: 'positive',
  },
]
export default function FunnelConversionRates() {
  return (
    <div className="flex flex-col mt-5">
      <div className="mb-3">
        <h1 className="text-xl font-semibold "></h1>
      </div>
      <div
        className="grid gap-5"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px,  max-content))',
        }}
      >
        {dataConversionRates.map((item) => (
          <div className="flex flex-col" key={item.id}>
            <div className=" flex flex-col gap-2 max-w-52">
              <p className="text-sm font-medium">{item.name}</p>
              <p className=" text-3xl font-semibold">
                {item.isMoney
                  ? item.value.toLocaleString('es-HN', {
                      style: 'currency',
                      currency: 'HNL',
                    })
                  : item.value}
              </p>
              <div
                className={`flex self-start ${item.status === 'positive' ? 'dark:text-green-500 text-green-600 bg-green-200 dark:bg-green-950 ' : 'dark:text-red-500 text-red-600 bg-red-200 dark:bg-red-950 '}  items-center gap-2 mt-2 p-1 rounded-md`}
              >
                {item.status === 'positive' ? (
                  <ArrowUp size={15} />
                ) : (
                  <ArrowDown size={15} />
                )}
                <p className="text-xs font-semibold">
                  {item.percentage}% ({' '}
                  {item.isMoney
                    ? item.change.toLocaleString('es-HN', {
                        style: 'currency',
                        currency: 'HNL',
                      })
                    : item.change}
                  )
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
