import { UserButton } from "@clerk/nextjs";


export default function Dashboard() {
  return (
    <div className="">
     <p className="text-xl text-red-500">Hello</p>
     <UserButton afterSignOutUrl="/" />
    </div>
  )
}
