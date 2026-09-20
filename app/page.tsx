import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Page() {
    return (
        <div className="h-full flex flex-col">
            <header className="bg-background flex sticky top-0 z-30 h-16 shrink-0 items-center gap-2 px-4 w-full">
                <SidebarTrigger className="-ml-1" />
            </header>
            <div className="flex-1 flex items-center justify-center border border-amber-50">
                <h1 className="text-5xl col-span-6">Welcome Back!</h1>
                <div>
                    <Card>
                        
                    </Card>
                </div>
            </div>
        </div>
    )
}