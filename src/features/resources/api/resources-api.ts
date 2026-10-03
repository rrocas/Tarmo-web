import type {
    ResourcesCreateResourceRequestDto,
    ResourcesResourceJsonResponseDto,
    ResourcesUpdateResourceRequestDto,
} from "@/lib/api/types.gen"
import {
    deleteResourcesById,
    getResources as sdkGetResources,
    postResources,
    putResourcesById,
} from "@/lib/api/sdk.gen"
import { logger } from "@/lib/logger"

export type Resource = ResourcesResourceJsonResponseDto
export type CreateResourceRequest = ResourcesCreateResourceRequestDto
export type UpdateResourceRequest = ResourcesUpdateResourceRequestDto
async function run<T>(name: string, fn: () => Promise<T>): Promise<T> {
    logger.info(`${name}: start`)
    try {
        const result = await fn()
        logger.info(`${name}: success`)
        return result
    } catch (error) {
        logger.error(`${name}: failed`, error)
        throw error
    }
}

export function getResources(): Promise<Resource[]> {
    return run("getResources", async () => {
        const { data } = await sdkGetResources({ throwOnError: true })
        return data
    })
}

export function createResource(resource: CreateResourceRequest) {
    return run("createResource", async () => {
        await postResources({ body: resource, throwOnError: true })
    })
}

export function updateResource(id: number, resource: UpdateResourceRequest) {
    return run("updateResource", async () => {
        await putResourcesById({ path: { id }, body: { ...resource, id }, throwOnError: true })
    })
}

export function deleteResource(id: number) {
    return run("deleteResource", async () => {
        await deleteResourcesById({ path: { id }, throwOnError: true })
    })
}