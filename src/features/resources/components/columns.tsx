"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Resource } from "@/features/resources/api/resources-api"
import { Info, Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ResourceSheet } from "./resource-sheet"
import DeleteResourceButton from "./delete-resource-button"
import { formatQuantity } from "@/lib/format/quantity"
import { ButtonGroup } from "@/components/ui/button-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { formatDate } from "@/lib/format/date"

export const columns: ColumnDef<Resource>[] = [
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            const resource = row.original
            const price = (resource.price || 0) / 100

            return <div className="font-medium">${price} / {formatQuantity(resource.base_quantity!, resource.base_unit!)}</div>
        },
        size: 20,
    },
    {
        accessorKey: "name",
        header: "Name",
        size: 20,
    },
    {
        accessorKey: "description",
        header: "Description",
        size: 46,
    },
    {
        id: "actions",
        size: 14,
        cell: ({ row }) => {
            const resource = row.original

            return (
                <div className="flex items-center justify-end">
                    <ButtonGroup>
                        <ResourceSheet mode="edit"
                            resource={resource}
                            trigger={
                                <Button variant={"ghost"} size={"icon"} onSelect={(e) => e.preventDefault()}>
                                    <Pencil />
                                </Button>
                            }
                        />
                        <DeleteResourceButton
                            id={resource.id!}
                            trigger={
                                <Button variant="ghost" size={"icon"} onSelect={(e) => e.preventDefault()}>
                                    <Trash />
                                </Button>
                            }
                        />
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant={"ghost"} size={"icon"}><Info /></Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="space-y-2">
                                    <p>Created: {formatDate(resource.created_at)}</p>
                                    <p>Last updated: {formatDate(resource.updated_at)}</p>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </ButtonGroup>
                </div>
            )
        },
    },
]