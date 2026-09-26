import Link from "next/link"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { getResources } from "@/src/features/resources/api"
import { columns } from "@/src/features/resources/components/columns"
import { DataTable } from "@/src/features/resources/components/data-table"
import { ResourceForm } from "@/src/features/resources/components/resource-form"

export default async function Page() {
  let initialResources: Awaited<ReturnType<typeof getResources>> = []
  let error = false

  try {
    initialResources = await getResources()
  } catch (e) {
    console.error("Failed to load resources:", e)
    error = true
  }

  return (
    <div className="h-full flex flex-col">
      <header className="bg-background flex sticky top-0 z-30 h-16 shrink-0 items-center gap-2 px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Resources</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="pt-0 p-8 flex-1 min-h-0">
        {error ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <p className="text-muted-foreground">
              We couldn't connect to the server. Please try again.
            </p>
          </div>
        ) : (
          <DataTable columns={columns} data={initialResources} />
        )}
      </main>

      <footer className="shrink-0">
        <ResourceForm />
      </footer>
    </div>
  )
} 