import Heading from "@/components/Heading"
import SubscriptionButton from "@/components/SubscriptionButton"
import { checkSubscription } from "@/lib/subscription"
import { Settings2 } from "lucide-react"

const SettingsPage = async () => {
    const isPro = await checkSubscription()

  return (

    <div>
        <Heading 
        title="Settings"
        description="Manage your account settings"
        icon={Settings2}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
        />

        <div className="px-4 lg:px-8 space-y-4">
            <div className="text-muted-foreground text-sm">
                {isPro ? "Current plan: Pro" : "Current plan: Free"}
            </div>
            <SubscriptionButton isPro={isPro} />
        </div>
    </div>
  )
}

export default SettingsPage