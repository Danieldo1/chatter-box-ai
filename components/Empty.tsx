import Image from "next/image";

interface EmptyProps {
    label: string;
}

const Empty = ({label}: EmptyProps = {label: 'No messages yet'}) => {
  return (
    <div className="h-full p-16 flex flex-col items-center justify-center">
       <div className="relative ">
        <Image 
        src="/empty.png"
        alt="empty"
        width={500}
        height={350}
        />

       </div >
       <p className="text-muted-foreground text-sm text-center" >{label}</p>
    </div>
  )
}

export default Empty