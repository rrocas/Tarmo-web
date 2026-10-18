"use server";

import { revalidatePath } from "next/cache";
import { createResource, deleteResource, getResources, updateResource } from "./resources-api";
import type { CreateResourceRequest, UpdateResourceRequest } from "./resources-api";
import { priceSchema } from "../schemas/resource-schemas";

function getResourceFormData(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const priceStr = String(formData.get("price") ?? "");
  const quantityStr = String(formData.get("quantity") ?? "");
  const unit = String(formData.get("unit") ?? "").trim();

  const priceResult = priceSchema.safeParse(priceStr);

  if (!priceResult.success) {
    throw new Error("Invalid price");
  }

  const quantity = Number(quantityStr);

  if (!Number.isFinite(quantity) || quantity <= 0) {
    throw new Error("Invalid quantity");
  }

  if (!name || !unit) {
    throw new Error("Name and unit are required");
  }

  return {
    name,
    description,
    price: priceResult.data,
    quantity,
    unit,
  };
}

export async function getResourcesAction() {
  return getResources();
}

export async function createResourceAction(formData: FormData) {
  const input: CreateResourceRequest = getResourceFormData(formData);

  await createResource(input);
  revalidatePath("/resources");
}

export async function updateResourceAction(id: number, formData: FormData) {
  const input: UpdateResourceRequest = {
    ...getResourceFormData(formData),
    id,
  };

  await updateResource(id, input);
  revalidatePath("/resources");
}

export async function deleteResourceAction(id: number) {
  await deleteResource(id);
  revalidatePath("/resources");
}
