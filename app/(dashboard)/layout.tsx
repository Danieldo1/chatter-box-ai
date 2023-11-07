import Nav from "@/components/Nav";
import Sidebar from "@/components/Sidebar";
import { getApiLimitCount } from "@/lib/api-limit";

const DashboardLayout = async ({
    children
}:{
    children: React.ReactNode
}) => {

    const apiLimitCount = await getApiLimitCount()

    return ( 
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0  bg-gray-900">
           <Sidebar apiLimitCount={apiLimitCount} />
            </div>
            <main className="md:pl-72">
                <Nav />
                {children}
            </main>
        </div>
     );
}
 
export default DashboardLayout;