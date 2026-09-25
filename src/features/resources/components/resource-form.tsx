"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addResourceAction } from "../api/resource-actions"
import { useRef } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export function ResourceForm() {
    const formRef = useRef<HTMLFormElement>(null)

    return (
        <form
            ref={formRef}
            onSubmit={async (event) => {
                event.preventDefault()

                const formData = new FormData(event.currentTarget)

                try {
                    await addResourceAction(formData)

                    formRef.current?.reset()
                    toast.success("Resource added to the list.")
                } catch (error) {
                    if (error instanceof Error) {
                        toast.error(error.message)
                    } else {
                        toast.error("Something went wrong.")
                    }
                }
            }}
            className="w-full pl-2 pr-3 pb-3 sticky top-16 z-30 flex space-x-2 bg-background"
        >
            <Input name="name" placeholder="Name *" required className="flex-1" />
            <Input name="description" placeholder="Description" className="flex-1" />
            <Input name="price" type="number" placeholder="Price * (¢)" required className="w-28" />
            <Input name="quantity" type="number" step="0.01" placeholder="Qty" required defaultValue="1" className="w-20" />
            <Select name="unit" required>
                <SelectTrigger className="w-32">
                    <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Units</SelectLabel>
                        <SelectItem value="kg">Kilograms</SelectItem>
                        <SelectItem value="g">Grams</SelectItem>
                        <SelectItem value="mg">Milligrams</SelectItem>
                        <SelectItem value="l">Liters</SelectItem>
                        <SelectItem value="ml">Milliliters</SelectItem>
                        <SelectItem value="pcs">Pieces</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Button type="submit">Add</Button>
        </form>
    )
}
