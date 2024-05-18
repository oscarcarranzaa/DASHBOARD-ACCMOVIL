type TProps = {
  number: number
  type: 'seconds' | 'minutes' | 'hours' | 'days'
  label: string
}
export default function CountDownNumber({ number, type, label }: TProps) {
  const formatDigit = number < 10 ? `0${number}` : number.toString()
  const digits = Array.from(formatDigit)
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  return (
    <div className=" text-center">
      <div className="flex overflow-hidden h-[45px] w-[60px] justify-center bg-rose-600 rounded-lg px-1 text-white">
        {digits.map((n, i) => {
          const numberDigit = Number(n)
          const transform = n !== '0' ? numberDigit * 45 : numberDigit

          return (
            <div key={i} className="relative">
              <div
                className={` font-extrabold ${n === '0' ? 'opacity-0 invisible' : 'transition-transform'}`}
                style={{
                  transform: `translateY(${n === '0' ? '-600' : '-' + transform}px)`,
                  fontSize: '30px',
                }}
              >
                {numbers.map((num, index) => {
                  return (
                    <div
                      key={index}
                      className={num === 0 ? 'opacity-0' : ' opacity-100'}
                    >
                      <span>{num}</span>
                    </div>
                  )
                })}
              </div>
              <div
                className={`font-bold absolute -top-10 transition-transform ${n !== '0' && '9' ? 'opacity-0' : ''}`}
                style={{
                  fontSize: '30px',
                  transform: `translateY(${n === '0' ? '40px' : n === '9' ? '110px' : '10px'})`,
                }}
              >
                <span>0</span>
              </div>
            </div>
          )
        })}
      </div>
      <p className="text-xs mt-1">{label}</p>
    </div>
  )
}
