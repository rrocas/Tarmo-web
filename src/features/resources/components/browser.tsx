"use client"

import { useDeferredValue, useEffect, useMemo, useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { columns } from "@/src/features/resources/components/columns"
import { DataTable } from "@/src/features/resources/components/data-table"
import { DataList } from "@/src/features/resources/components/data-list"
import { ResourceSheet } from "@/src/features/resources/components/resource-sheet"
import type { getResources } from "@/src/features/resources/api"

type Resource = Awaited<ReturnType<typeof getResources>>[number]

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean | null>(null)

  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [query])

  return matches
}

export function ResourcesBrowser({
  data,
  error,
}: {
  data: Resource[]
  error: boolean
}) {
  const [query, setQuery] = useState("")
  const deferredQuery = useDeferredValue(query)
  const isDesktop = useMediaQuery("(min-width: 1024px)") // breakpoint lg

  // Se calcula una sola vez cuando cambian los datos
  const indexed = useMemo(
    () =>
      data.map((r) => ({
        resource: r,
        name: (r.name ?? "").toLowerCase(),
      })),
    [data]
  )

  const filtered = useMemo(() => {
    const term = deferredQuery.trim().toLowerCase()
    if (!term) return data

    return indexed
      .filter((item) => item.name.includes(term))
      .map((item) => item.resource)
  }, [data, indexed, deferredQuery])

  // Si `filtered` no cambia, React reutiliza el elemento y no re-renderiza
  const table = useMemo(
    () => <DataTable columns={columns} data={filtered} />,
    [filtered]
  )
  const list = useMemo(() => <DataList data={filtered} />, [filtered])

  return (
    <>
      <div className="w-full pl-2 pr-3 pb-3 sticky top-16 z-30 flex space-x-2 bg-background">
        <ButtonGroup>
          <ResourceSheet
            mode="create"
            trigger={
              <Button className="cursor-pointer">
                <Plus />
              </Button>
            }
          />
        </ButtonGroup>
        <InputGroup className="md:w-2/3 lg:w-1/3">
          <InputGroupInput
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
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
          <div className="flex-1 min-h-0">
            {isDesktop === null ? null : isDesktop ? table : list}
          </div>
        )}
      </main>
    </>
  )
}