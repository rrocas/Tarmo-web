import Link from "next/link";
import { Plus, BookDashed, FilePlus } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";

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
];

export default function Page() {
  return (
    <div className="flex h-full flex-col">
      <header className="bg-background sticky top-0 z-30 flex h-16 w-full shrink-0 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
      </header>

      <div className="flex flex-1 flex-col items-center justify-center gap-10 p-8">
        <h1 className="text-5xl font-semibold">Welcome Back!</h1>

        <div className="grid w-full max-w-3xl gap-4 md:grid-cols-3">
          {actions.map(({ title, description, href, icon: Icon }) => (
            <Link key={title} href={href}>
              <Card className="hover:border-accent items-center gap-2 border border-transparent py-8 text-center transition-colors">
                <Icon className="size-10 stroke-1" />
                <span className="font-medium">{title}</span>
                <span className="text-muted-foreground text-sm opacity-70">{description}</span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
