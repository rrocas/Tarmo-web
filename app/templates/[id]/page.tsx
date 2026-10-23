import { getTemplate } from "@/features/templates/api";
import { TemplateDetailView } from "@/features/templates/components/template-detail-view";
import { notFound } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Info, PencilLine } from "lucide-react";
import DeleteTemplateButton from "@/features/templates/components/delete-template-button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatDate } from "@/lib/format/date";
import { ButtonGroup } from "@/components/ui/button-group";
import { te } from "date-fns/locale";

export default async function TemplatePage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;

  const template = await getTemplate(id);

  if (!template) {
    notFound();
  }

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <header className="bg-background sticky top-0 z-30 flex h-16 w-full shrink-0 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/templates">Templates</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{template.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="min-h-0 w-full flex-1 px-4">
        <TemplateDetailView template={template} />
      </div>

      <footer className="flex justify-between p-4">
        <Button asChild variant="ghost">
          <Link href="/templates/">
            <ArrowLeft />
            Back
          </Link>
        </Button>

        <ButtonGroup>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant="ghost">
                <Link href={`/templates/${id}/edit`}>
                  <PencilLine />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <Info />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2">
                <p>Created: {formatDate(template.created_at)}</p>
                <p>Last updated: {formatDate(template.updated_at)}</p>
              </div>
            </PopoverContent>
          </Popover>
        </ButtonGroup>

        <DeleteTemplateButton id={id} showButton={true} />
      </footer>
    </div>
  );
}
