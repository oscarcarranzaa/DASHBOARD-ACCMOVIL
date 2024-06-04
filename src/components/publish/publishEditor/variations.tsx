import { Tab, Tabs } from '@nextui-org/react'
import { Key, useState } from 'react'

export default function Variations() {
  const [selected, setSelected] = useState<Key>('single')

  return (
    <>
      <div className="bg-zinc-50 dark:bg-zinc-950 p-1 py-5 rounded-lg">
        <div className="w-full flex justify-center">
          <div>
            <Tabs
              variant="bordered"
              size="md"
              aria-label="Options"
              selectedKey={selected.toString()}
              onSelectionChange={setSelected}
            >
              <Tab key="single" title="Simple">
                <p>Aca el producto simple</p>
              </Tab>
              <Tab key="variation" title="Variable">
                <p>Y aca el producto variable</p>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}
