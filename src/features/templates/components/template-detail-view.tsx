"use client";

import { Badge } from "@/components/ui/badge";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { Zap, CircleQuestionMark, Flame, Skull, Scale, Croissant, Box, List } from "lucide-react";
import type { Template } from "@/features/templates/api";
import { getResources } from "@/features/resources/api/resources-api";
import useSWR from "swr";
import { calculateCost, formatCurrency } from "@/features/shared/utils/unit-conversion";
import { formatQuantity } from "@/lib/format/quantity";
import { getResourcesAction } from "../../resources/api/resource-actions";

interface TemplateDetailViewProps {
  template: Template;
}

export function TemplateDetailView({ template }: TemplateDetailViewProps) {
  const { data: resources = [] } = useSWR("/resources", getResourcesAction);

  let totalCost = 0;
  const resourceCosts =
    template.resources?.map((ref) => {
      const resource = resources.find((r) => r.id === ref.resource_id);
      if (!resource) return { cost: null, resource, ref };

      // Calculate cost based on base unit and quantity
      const cost = calculateCost(
        resource.price || 0,
        resource.base_quantity || 1,
        resource.base_unit || "u",
        ref.quantity || 0,
        ref.unit || "u",
      );

      if (cost !== null) {
        totalCost += cost;
      }

      return { cost, resource, ref };
    }) || [];

  const getDifficultyIcon = (difficulty?: number) => {
    switch (difficulty) {
      case 0:
        return <CircleQuestionMark size={16} />;
      case 1:
        return <Croissant size={16} />;
      case 2:
        return <Zap size={16} />;
      case 3:
        return <Scale size={16} />;
      case 4:
        return <Flame size={16} />;
      case 5:
        return <Skull size={16} />;
      default:
        return <CircleQuestionMark size={16} />;
    }
  };

  const getDifficulty = (difficulty?: number) => {
    switch (difficulty) {
      case 0:
        return "Not Specified";
      case 1:
        return "Very Easy";
      case 2:
        return "Easy";
      case 3:
        return "Medium";
      case 4:
        return "Hard";
      case 5:
        return "Very Hard";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="grid h-full w-full grid-cols-1 gap-4 overflow-y-auto p-0 md:grid-cols-2 md:overflow-hidden lg:gap-8">
      <div className="flex min-h-0 flex-col gap-6 overflow-hidden p-2">
        <div className="shrink-0 space-y-3">
          <div className="flex items-start justify-between">
            <h2 className="text-4xl font-bold">{template.name}</h2>
            <Badge className="p-4 text-2xl font-semibold" variant="outline">
              {formatCurrency(totalCost)}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {template.quantity && template.unit && (
              <Badge className="text-base">{formatQuantity(template.quantity, template.unit)}</Badge>
            )}
            {template.difficulty !== undefined && template.difficulty !== null && (
              <Badge className="flex items-center gap-1 text-base">
                {getDifficultyIcon(template.difficulty)}
                {getDifficulty(template.difficulty)}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground text-base leading-relaxed">
            {template.description || "No description available"}
          </p>
        </div>

        {/* RELATED RESOURCES */}
        {template.resources && template.resources.length > 0 && (
          <div className="flex min-h-0 flex-1 flex-col gap-3">
            <h3 className="flex shrink-0 items-center gap-2 text-xl font-semibold">
              <Box className="h-5 w-5" />
              Resources
            </h3>
            <div className="flex-1 space-y-2 overflow-y-auto pr-2">
              {resourceCosts.map(({ cost, resource, ref }, index) => {
                if (!ref) return null;
                return (
                  <div key={index} className="bg-card flex shrink-0 items-center justify-between rounded-lg border p-3">
                    <div className="flex flex-col">
                      <span className="text-lg font-medium">{resource?.name || "Loading..."}</span>
                      <span className="text-muted-foreground text-sm">
                        {cost !== null ? formatCurrency(cost) : "N/A"}
                      </span>
                    </div>
                    <span className="text-muted-foreground text-lg">{formatQuantity(ref.quantity!, ref.unit!)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* STEPS */}
      <div className="max-h-full min-h-0 space-y-3 p-2 md:overflow-y-auto">
        <h3 className="flex items-center gap-2 text-xl font-semibold">
          <List className="h-5 w-5" />
          Steps
        </h3>
        {template.steps?.map((step, index) => (
          <Item key={index} size="default" className="h-auto">
            <ItemContent>
              <ItemTitle className="text-xl">
                {index + 1}. {step.name}
              </ItemTitle>
              {step.instructions && step.instructions.trim() && (
                <ItemDescription className="line-clamp-none text-base whitespace-pre-wrap">
                  {step.instructions}
                </ItemDescription>
              )}
            </ItemContent>
          </Item>
        ))}
      </div>
    </div>
  );
}
