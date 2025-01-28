import { useCallback, useEffect, useRef, useState } from 'react'
import './timer.css'

interface TimerInterface {
  targetDate: string
  targetTime: string
}

const Timer = ({ targetDate, targetTime }: TimerInterface) => {
  const [remaining, setRemaining] = useState({
      Days: 0,
      Hours: 0,
      Minutes: 0,
      Seconds: 0,
    }),
    [isExpired, setIsExpired] = useState(false),
    timer = useRef<any>(null)

  const setDate = useCallback(() => {
    const now = new Date().getTime()
    const TimerDate = new Date(targetDate + ' ' + targetTime).getTime()
    const distance = TimerDate - now

    if (distance < 0) {
      clearInterval(timer.current)
      setIsExpired(true)
    } else {
      setRemaining({
        Days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        Hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        Minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        Seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
      setIsExpired(false)
    }
  }, [targetDate, targetTime])

  useEffect(() => {
    setDate()
    timer.current = setInterval(() => {
      setDate()
    }, 1000)

    return () => clearInterval(timer.current)
  }, [setDate])

  return (
    <>
      <div >
        <div className="flex flex-row gap-[100px] items-center ">
          <p className="font-semibold text-[48px]">Flash Sales</p>
          {!isExpired && targetDate && targetTime ? (
            <div className="counter">
              <div className="time-display">
                <div className="flex flex-row">
                  <div className="flex flex-col">
                    <p className='pr-10 font-semibold text-[12px]' >Days</p>
                    <div className='time-value' >
                      {`${remaining.Days} `}
                      <span className="text-[#FF0000] px-4 ">:</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div>
                      <p className='pr-10 font-semibold text-[12px]' >Hour</p>
                      <div  className='time-value'>
                        {`${remaining.Hours}`}
                        <span className="text-[#FF0000] px-4">:</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className='pr-10 font-semibold text-[12px]' >Minutes</p>
                    <div  className='time-value'>
                      {`${remaining.Minutes}`}
                      <span className="text-[#FF0000] px-4">:</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <p className='font-semibold text-[12px]' >Seconds</p>
                    <div  className='time-value' >
                    {`${remaining.Seconds}`}
                      </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="alert-danger">Expired</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Timer
