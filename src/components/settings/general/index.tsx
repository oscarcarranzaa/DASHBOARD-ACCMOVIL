'use client'

import { Alert } from '@heroui/react'
import CompanyDetails from './companyDetails'
import CompanyEdit from './companyEdit'
import CompanyLogo from './companyLogo'

export default function GeneralSettings() {
  return (
    <>
      <CompanyDetails />
      <div className="grid mt-5 grid-cols-1 xl:grid-cols-3 gap-10 mb-10">
        <div className="col-span-2">
          <CompanyEdit />
        </div>
        <div className="flex flex-col gap-4">
          <CompanyLogo />
          <div>
            <Alert
              variant="flat"
              color="primary"
              description="Es posible que los cambios no se vean de inmediato. La aplicación usa caché y puede tardar unos minutos en actualizarse."
            />
          </div>
        </div>
      </div>
    </>
  )
}
