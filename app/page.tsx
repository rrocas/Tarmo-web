import Link from "next/link"
import { Plus, BookDashed, FilePlus } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card } from "@/components/ui/card"

const actions = [
  {
    title: "Create resource",
    description: "Add a new resource",
    href: "/resources",
    icon: Plus,
  },
  {
    title: "Create template",
    description: "Design a new template",
    href: "/templates/new",
    icon: FilePlus,
  },
  {
    title: "View templates",
    description: "Browse your templates",
    href: "/templates",
    icon: BookDashed,
  },
]

export default function Page() {
  return (
    <div className="h-full flex flex-col">
      <header className="bg-background flex sticky top-0 z-30 h-16 shrink-0 items-center gap-2 px-4 w-full">
        <SidebarTrigger className="-ml-1" />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-10 p-8">
        <h1 className="text-5xl font-semibold">Welcome Back!</h1>

        <div className="grid w-full max-w-3xl gap-4 md:grid-cols-3">
          {actions.map(({ title, description, href, icon: Icon }) => (
            <Link key={title} href={href}>
              <Card className="items-center gap-2 py-8 text-center transition-colors hover:bg-accent">
                <Icon className="size-10 stroke-1" />
                <span className="font-medium">{title}</span>
                <span className="text-sm text-muted-foreground opacity-70">
                  {description}
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}