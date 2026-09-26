"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet"
import { Resource } from "../api/resources-api"
import { updateResourceAction } from "../api/resource-actions"
import { useRef, useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Field, FieldLabel } from "@/components/ui/field"
import { toast } from "sonner"

interface EditResourceSheetProps {
    resource: Resource
    trigger?: React.ReactNode
}

export function EditResourceSheet({ resource, trigger }: EditResourceSheetProps) {
    const [open, setOpen] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {trigger}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Resource</SheetTitle>
                    <SheetDescription>
                        Make changes to your resource here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="p-4">
                    <form
                    ref={formRef}
                    onSubmit={async (event) => {
                        event.preventDefault()

                        const formData = new FormData(event.currentTarget)

                        try {
                            await updateResourceAction(resource.id!, formData)

                            formRef.current?.reset()
                            setOpen(false)
                            setIsValid(false)
                            toast.success("Resource updated succesfully.")
                        } catch (error) {
                            if (error instanceof Error) {
                                toast.error(error.message)
                            } else {
                                toast.error("Something went wrong.")
                            }
                        }
                    }}
                    className="grid gap-4"
                    onInput={(e) => {
                        setIsValid(e.currentTarget.checkValidity())
                    }}>
                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input
                                id="name"
                                name="name"
                                defaultValue={resource.name}
                                required
                            />
                        </Field>
                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="description">Description</FieldLabel>
                            <Input
                                id="description"
                                name="description"
                                defaultValue={resource.description}
                            />
                        </Field>
                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="price">Price (in cents)</FieldLabel>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                defaultValue={resource.price}
                                required
                            />
                        </Field>
                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="quantity">Base Quantity</FieldLabel>
                            <Input
                                id="quantity"
                                name="quantity"
                                type="number"
                                step="0.01"
                                defaultValue={resource.base_quantity || 1}
                                required
                            />
                        </Field>
                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="unit">Base Unit</FieldLabel>
                            <Select name="unit" defaultValue={resource.base_unit}>
                                <SelectTrigger className="w-full">
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
                        </Field>
                        <SheetFooter className="mt-4">
                            <Button type="submit" disabled={!isValid} >Save changes</Button>
                        </SheetFooter>
                    </form>
                </div>
                
            </SheetContent>
        </Sheet>
    )
}
