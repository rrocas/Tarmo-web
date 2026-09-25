"use server"

import { revalidatePath } from "next/cache"
import { createResource, updateResource } from "./resources-api"
import { resourceSchema, priceSchema } from "../schemas/resource-schemas"

export async function addResourceAction(formData: FormData) {
    // Get Form Data
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const priceStr = formData.get("price") as string
    const quantityStr = formData.get("quantity") as string
    const unitStr = formData.get("unit") as string

    // Parse to numbers
    const priceResult = priceSchema.safeParse(priceStr)
    if (!priceResult.success) {
        console.error("Invalid price:", priceResult.error.issues)
        throw new Error("Price is too large")
    }
    const price = priceResult.data

    
    const quantityValue = parseFloat(quantityStr) || 1

    // Create DTO
    const resourceInput = {
        id: 0,
        name,
        description: description || null,
        price,
        quantity: {
            value: quantityValue,
            unit: { name: unitStr }
        }
    }

    // Safe parse DTO
    const parsed = resourceSchema.safeParse(resourceInput)

    if (!parsed.success) {
        console.error("Invalid resource data:", parsed.error.issues)
        throw new Error("Invalid resource data")
    }

    await createResource({
        name,
        description,
        price,
        quantity: quantityValue,
        unit: unitStr,
    })
    
    revalidatePath("/resources")
}

export async function updateResourceAction(id: number, formData: FormData) {
    // Get Form Data
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const priceStr = formData.get("price") as string
    const quantityStr = formData.get("quantity") as string
    const unitStr = formData.get("unit") as string

    // Parse to numbers
    const priceResult = priceSchema.safeParse(priceStr)
    if (!priceResult.success) {
        console.error("Invalid price:", priceResult.error.issues)
        throw new Error("Price is too large")
    }
    const price = priceResult.data
    const quantityValue = parseFloat(quantityStr) || 1

    // Create DTO
    const resourceInput = {
        id: 0,
        name,
        description: description || null,
        price,
        quantity: {
            value: quantityValue,
            unit: { name: unitStr }
        }
    }

    // Safe parse DTO
    const parsed = resourceSchema.safeParse(resourceInput)

    if (!parsed.success) {
        console.error("Invalid resource data:", parsed.error.issues)
        throw new Error("Invalid resource data")
    }

    await updateResource(id, {
        name,
        description,
        price,
        quantity: quantityValue,
        unit: unitStr,
    })

    revalidatePath("/resources")
}
