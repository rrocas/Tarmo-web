import Link from "next/link"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { getResources } from "@/src/features/resources/api"
import { columns } from "@/src/features/resources/components/columns"
import { DataTable } from "@/src/features/resources/components/data-table"
import { ButtonGroup } from "@/components/ui/button-group"
import { Plus, Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { ResourceSheet } from "@/src/features/resources/components/resource-sheet"
import { DataList } from "@/src/features/resources/components/data-list"

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

      <div className="w-full pl-2 pr-3 pb-3 sticky top-16 z-30 flex space-x-2 bg-background">
        <ButtonGroup>
          <ResourceSheet
            mode="create"
            trigger={
              <Button>
                <Plus />
              </Button>
            }
          />
        </ButtonGroup>
        <InputGroup className="md:w-2/3 lg:w-1/3">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <main className="pt-0 p-2 sm:p-8 flex-1 min-h-0 flex flex-col">
        {error ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <p className="text-muted-foreground">
              We couldn't connect to the server. Please try again.
            </p>
          </div>
        ) : (
          <>
            <div className="hidden lg:block flex-1 min-h-0">
              <DataTable columns={columns} data={initialResources} />
            </div>
            <div className="lg:hidden flex-1 min-h-0">
              <DataList data={initialResources} />
            </div>
          </>
        )}
      </main>
    </div>
  )
} 