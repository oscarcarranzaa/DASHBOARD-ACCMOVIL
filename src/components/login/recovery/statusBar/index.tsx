type TPropsStatusBar = {
  step: number
}
export default function StatusBarRecovery({ step }: TPropsStatusBar) {
  const steps = [
    {
      id: 1,
      name: 'Correo',
      status: step === 1 ? 'current' : 'complete',
    },
    {
      id: 2,
      name: 'Código',
      status: step === 2 ? 'current' : 'complete',
    },
    {
      id: 3,
      name: 'Contraseña',
      status: step === 3 ? 'current' : 'complete',
    },
  ]
  return (
    <div className="w-10/12 m-auto mb-5 flex flex-col items-center ">
      <div className="w-full max-w-cardContent">
        <div className="w-full text-s">
          <div className="w-full grid grid-flow-col grid-cols-3 justify-stretch items-center mb-2 text-sm dark:text-gray-200 text-gray-800 font-medium">
            {steps.map((step) => (
              <p
                key={step.id}
                className={`transition-colors  ${
                  step.status === 'current'
                    ? 'text-primary'
                    : 'text-gray-800 dark:text-gray-200'
                } ${step.id === 1 ? 'text-start' : step.id === 3 ? 'text-end' : 'text-center'}`}
              >
                {step.name}
              </p>
            ))}
          </div>
          <div
            className="flex flex-row w-full p-1 rounded-full"
            style={{
              backgroundImage: 'linear-gradient(90deg, #3D8EFF, #72F7F7)',
            }}
          >
            <div
              className={` transition-all ${step === 1 ? 'grow-0' : 'grow'}`}
            ></div>

            <div
              className={` transition-all ${step === 2 ? 'grow-0' : step === 1 ? 'grow-0' : 'grow'}`}
            ></div>
            <div className="rounded-full w-3 h-3 bg-white"></div>
            <div
              className={`transition-all ${step === 3 ? 'grow-0' : 'grow'}`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
