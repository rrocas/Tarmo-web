import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { getResources } from "@/src/features/resources/api"
import { ResourcesBrowser } from "@/src/features/resources/components/browser"

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

      <ResourcesBrowser data={initialResources} error={error} />
    </div>
  )
}