import { Tab, Tabs } from '@nextui-org/react'
import { Key, useState } from 'react'
import SearchProductLabel from './searchProductLabel'
import ManagerAttributes from './managerAttributes'
import { usePublishStore } from '@/store/publish'

export default function Variations() {
  const postData = usePublishStore((state) => state.postData)
  const setType = usePublishStore((state) => state.setType)


  return (
    <>
      <section className=" p-2 py-5 rounded-lg border border-zinc-500 bg-white dark:bg-black">
        <div className="w-full ">
          <div className="flex w-full flex-col">
            <Tabs
              variant="solid"
              size="md"
              aria-label="Options"
              selectedKey={postData.type}
              onSelectionChange={(e) => {
                const typeSimple = e === 'simple'
                if (typeSimple) {
                  setType('simple')
                } else {
                  setType('variable')
                }
              }}
            >
              <Tab key="simple" title="Simple">
                <div className="w-full ">
                  <SearchProductLabel />
                </div>
              </Tab>
              <Tab key="variable" title="Variable">
                <div className="w-full">
                  <ManagerAttributes />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  )
}
