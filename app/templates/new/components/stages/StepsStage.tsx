"use client";
import { useTemplateFormStore } from "@/features/templates/store/template-form-store";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import StepForm from "@/features/templates/components/step-form";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { ButtonGroup } from "@/components/ui/button-group";

export function StepsStage() {
  const { formData, addStep, moveStepDown, moveStepUp } = useTemplateFormStore();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="grid h-full w-full grid-cols-1 gap-4 sm:max-w-4xl sm:grid-cols-2">
      {/* LEFT PANEL*/}
      <div className="flex flex-col gap-2 overflow-hidden py-4">
        <h3 className="mb-2 shrink-0 text-2xl font-semibold">Steps ({formData.steps?.length || 0})</h3>

        {/* STEP LIST */}
        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto">
          {formData.steps?.map((step, index) => (
            <Item
              key={index}
              onClick={() => {
                setEditingIndex(index);
                if (isMobile) setIsSheetOpen(true);
              }}
              variant={editingIndex === index ? "muted" : "outline"}
              className="cursor-pointer"
              size="default"
            >
              <ItemContent>
                <ItemTitle className="text-xl">
                  {index + 1}. {step.name || "(Unnamed)"}
                </ItemTitle>
                {step.instructions && (
                  <ItemDescription className="overflow-x-hidden text-lg">{step.instructions}</ItemDescription>
                )}
              </ItemContent>
              <ItemActions>
                <ButtonGroup>
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveStepUp(index);
                    }}
                    disabled={index === 0}
                  >
                    <ChevronUp />
                  </Button>
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveStepDown(index);
                    }}
                    disabled={index === formData.steps!.length - 1}
                  >
                    <ChevronDown />
                  </Button>
                </ButtonGroup>
              </ItemActions>
            </Item>
          ))}
        </div>

        {/* ADD STEP BUTTON */}
        <Button variant="ghost" onClick={addStep}>
          <Plus />
          Add Step
        </Button>
      </div>

      {/* RIGHT PANEL - FORM */}
      {/* LARGE SCREENS */}
      <div className="hidden flex-col justify-between gap-4 overflow-y-auto p-4 sm:flex">
        <h3 className="font-semibold">{editingIndex !== null ? `Edit Step ${editingIndex + 1}` : "New Step"}</h3>

        {/* NEW STEP FORM */}
        {editingIndex !== null ? (
          <StepForm editingIndex={editingIndex} setEditingIndex={setEditingIndex} setIsSheetOpen={setIsSheetOpen} />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground text-center">Select a step from the list or add a new one</p>
          </div>
        )}
      </div>

      {/* SHEET (mobile) */}
      <div className="sm:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent side="right" className="p-4">
            <SheetHeader>
              <SheetTitle>{editingIndex !== null ? `Edit Step ${editingIndex + 1}` : "New Step"}</SheetTitle>
            </SheetHeader>
            {editingIndex !== null && (
              <StepForm editingIndex={editingIndex} setEditingIndex={setEditingIndex} setIsSheetOpen={setIsSheetOpen} />
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
