import { z } from "zod";
import type { components } from "@/lib/api/types.gen";
import { ResourceRefSchema } from "./resource-ref-schemas";
import { StepSchema } from "./step-schemas";

// ============================================================================
// OpenAPI Generated Types (for compile-time type safety)
// ============================================================================
type Schema = components["schemas"];

// Response types from the API
export type TemplateResponse = Schema["templates.TemplateJSONResponseDTO"];
export type TemplateListItemResponse = Schema["templates.TemplateListJSONResponseDTO"];

// Request types for the API
export type CreateTemplateRequest = Schema["templates.CreateTemplateRequestDTO"];
export type UpdateTemplateRequest = Schema["templates.UpdateTemplateRequestDTO"];

// ============================================================================
// Zod Schemas (for runtime validation in forms)
// ============================================================================

// Validation for steps array
export const TemplateStepsSchema = z.array(StepSchema).min(1, "At least one step is required");

// Validation for resources array
export const TemplateResourcesSchema = z.array(ResourceRefSchema);

// Base template validation schema (for form data)
export const TemplateFormBaseSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  description: z.string().nullable().optional(),
  difficulty: z.number().min(0).max(5),
  quantity: z.number().positive("Quantity must be positive"),
  unit: z.string().min(1, "Unit is required"),
});

// Complete template validation schema (for create/update)
export const CreateTemplateSchema = TemplateFormBaseSchema.extend({
  steps: TemplateStepsSchema,
  resources: TemplateResourcesSchema.optional(),
});

export const UpdateTemplateSchema = TemplateFormBaseSchema.extend({
  steps: TemplateStepsSchema.optional(),
  resources: TemplateResourcesSchema.optional(),
});

// ============================================================================
// Inferred Types from Zod (for form state management)
// ============================================================================
export type TemplateFormData = z.infer<typeof CreateTemplateSchema>;
export type TemplateFormBase = z.infer<typeof TemplateFormBaseSchema>;
