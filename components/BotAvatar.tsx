import { Avatar, AvatarImage } from "./ui/avatar"


export const BotAvatar = () => {
    return (
        <Avatar className="w-12 h-12">
            <AvatarImage
            className="p-1"
            src="/logo.png"
            />
        </Avatar>
    )
}