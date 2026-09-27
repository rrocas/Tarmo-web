"use client"

import { MoreVertical, Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Resource } from "../api/resources-api"
import { ResourceSheet } from "./resource-sheet"
import DeleteResourceButton from "./delete-resource-button"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/item"
import { formatQuantity } from "@/lib/format/quantity"

interface ResourceListProps {
    data: Resource[]
}

export function DataList({ data }: ResourceListProps) {
    return (
        <ItemGroup className="h-full overflow-y-auto">
            {data.map((resource) => {
                const price = (resource.price || 0) / 100

                return (
                    <Item variant={"outline"} key={resource.id}>
                        <ItemContent>
                            <ItemTitle>{resource.name}</ItemTitle>
                            <ItemDescription>{resource.description}</ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            <div className="font-medium">
                                ${price} / {formatQuantity(resource.base_quantity!, resource.base_unit!)}
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <ResourceSheet
                                        mode="edit"
                                        resource={resource}
                                        trigger={
                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                <Pencil />
                                                Edit
                                            </DropdownMenuItem>
                                        }
                                    />
                                    <DeleteResourceButton
                                        id={resource.id!}
                                        trigger={
                                            <DropdownMenuItem
                                                variant="destructive"
                                                onSelect={(e) => e.preventDefault()}
                                            >
                                                <Trash />
                                                Delete
                                            </DropdownMenuItem>
                                        }
                                    />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </ItemActions>
                    </Item>
                )
            })}
        </ItemGroup>
    )
}