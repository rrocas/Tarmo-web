"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Resource } from "@/features/resources/api/resources-api"
import { Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ResourceSheet } from "./resource-sheet"
import DeleteResourceButton from "./delete-resource-button"
import { formatQuantity } from "@/lib/format/quantity"
import { ButtonGroup } from "@/components/ui/button-group"

export const columns: ColumnDef<Resource>[] = [
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            const resource = row.original
            const price = (resource.price || 0) / 100

            return <div className="font-medium">${price} / {formatQuantity(resource.base_quantity!, resource.base_unit!)}</div>
        },
        size: 10,
    },
    {
        accessorKey: "name",
        header: "Name",
        size: 17,
    },
    {
        accessorKey: "description",
        header: "Description",
        size: 63,
    },
    {
        id: "actions",
        size: 10,
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
                    </ButtonGroup>
                </div>
            )
        },
    },
]