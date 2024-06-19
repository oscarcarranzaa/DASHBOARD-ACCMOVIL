import { Tab, Tabs } from '@nextui-org/react'
import { Key, useState } from 'react'
import SearchProductLabel from './searchProductLabel'
import ManagerAttributes from './managerAttributes'

export default function Variations() {
  const [selected, setSelected] = useState<Key>('single')

  return (
    <>
      <div className=" p-2 py-5 rounded-lg border border-zinc-500">
        <div className="w-full ">
          <div className="flex w-full flex-col">
            <Tabs
              variant="bordered"
              size="md"
              aria-label="Options"
              selectedKey={selected.toString()}
              onSelectionChange={setSelected}
            >
              <Tab key="single" title="Simple">
                <div className="w-full ">
                  <SearchProductLabel />
                </div>
              </Tab>
              <Tab key="variation" title="Variable">
                <div className="w-full">
                  <ManagerAttributes />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}
