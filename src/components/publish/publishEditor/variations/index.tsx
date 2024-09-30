import { Tab, Tabs } from '@nextui-org/react'
import SearchProductLabel from './searchProductLabel'
import ManagerAttributes from './managerAttributes'
import { usePublishStore } from '@/store/publish'

export default function Variations() {
  const { type, Product } = usePublishStore((state) => state.postData)
  const setType = usePublishStore((state) => state.setType)
  const setProduct = usePublishStore((state) => state.setProductId)

  return (
    <>
      <section className=" p-2 py-5 rounded-lg border border-zinc-500 bg-white dark:bg-black">
        <div className="w-full ">
          <div className="flex w-full flex-col">
            <Tabs
              variant="solid"
              size="md"
              aria-label="Options"
              selectedKey={type}
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
                  <SearchProductLabel
                    seleted={Product}
                    onSelect={(value) => setProduct(value)}
                  />
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
