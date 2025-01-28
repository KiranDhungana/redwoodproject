type LabelProps = {
  text: string
}

const Label = ({ text }: LabelProps) => {
  return (
      <div className="flex flex-row gap-4 items-center">
        <div  className="w-[12px] h-[24px] rounded-sm  bg-#db4444">

   </div>
   <p   className="text-[20px] font-semibold text-#db4444 ">
       {text}
   </p>
      </div>
 )
}

export default Label