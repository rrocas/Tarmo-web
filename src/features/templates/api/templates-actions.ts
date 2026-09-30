"use server"

import { revalidatePath } from "next/cache"
import {
    createTemplate,
    updateTemplate,
    deleteTemplate,
} from "./templates-api"
import {
    CreateTemplateSchema,
    type CreateTemplateRequest,
    type UpdateTemplateRequest,
} from "../schemas/template-schemas"

export async function createTemplateAction(template: CreateTemplateRequest) {
    const parsed = CreateTemplateSchema.safeParse(template)

    if (!parsed.success) {
        console.error("Invalid template data:", parsed.error.issues)
        throw new Error("Invalid template data")
    }

    await createTemplate(parsed.data as CreateTemplateRequest)
    revalidatePath("/templates")
}

export async function updateTemplateAction(id: number, template: UpdateTemplateRequest) {
    const parsed = CreateTemplateSchema.safeParse(template)

    if (!parsed.success) {
        console.error("Invalid template data:", parsed.error.issues)
        throw new Error("Invalid template data")
    }

    await updateTemplate(id, parsed.data as UpdateTemplateRequest)
    revalidatePath("/templates")
}

export async function deleteTemplateAction(id: number) {
    await deleteTemplate(id)
    revalidatePath("/templates")
}