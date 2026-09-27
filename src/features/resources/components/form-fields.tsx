import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Field, FieldLabel } from "@/components/ui/field"
import { Resource } from "../api/resources-api"

interface ResourceFormFieldsProps {
    resource?: Resource
}

export function ResourceFormFields({ resource }: ResourceFormFieldsProps) {
    return (
        <>
            <Field className="grid gap-2">
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                    id="name"
                    name="name"
                    defaultValue={resource?.name}
                    required
                />
            </Field>
            <Field className="grid gap-2">
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Input
                    id="description"
                    name="description"
                    defaultValue={resource?.description}
                />
            </Field>
            <Field className="grid gap-2">
                <FieldLabel htmlFor="price">Price (in cents)</FieldLabel>
                <Input
                    id="price"
                    name="price"
                    type="number"
                    defaultValue={resource?.price}
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
                    defaultValue={resource?.base_quantity || 1}
                    required
                />
            </Field>
            <Field className="grid gap-2">
                <FieldLabel htmlFor="unit">Base Unit</FieldLabel>
                <Select name="unit" defaultValue={resource?.base_unit}>
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
        </>
    )
}