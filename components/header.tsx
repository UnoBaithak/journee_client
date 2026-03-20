import { Globe2Icon } from "lucide-react"

export const Header = () => {
    return <div className="flex items-center pt-5 pl-5">
        <div>
            <Globe2Icon className="size-8 text-teal-600" />
        </div>
        <h2 className="text-xl font-bold text-teal-700 tracking-tight">
            Journee
        </h2>
    </div>
}