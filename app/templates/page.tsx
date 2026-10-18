import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { TemplatesBrowser } from "@/features/templates/components/browser";
import { getTemplatesAction } from "@/src/features/templates/api/templates-actions";

export default async function Page() {
  let initialTemplates: Awaited<ReturnType<typeof getTemplatesAction>> = [];
  let error = false;

  try {
    initialTemplates = await getTemplatesAction();
  } catch (e) {
    console.error("Failed to load templates:", e);
    error = true;
  }

  return (
    <div className="flex h-full flex-col">
      <header className="bg-background sticky top-0 z-30 flex h-16 w-full shrink-0 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Templates</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {error ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <p className="text-muted-foreground">We couldn't connect to the server. Please try again.</p>
        </div>
      ) : (
        <TemplatesBrowser data={initialTemplates} />
      )}
    </div>
  );
}
