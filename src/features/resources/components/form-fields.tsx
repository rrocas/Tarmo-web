import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";
import { Resource } from "../api/resources-api";
import { PriceInput } from "@/components/form/price-input";
import { QuantityInput } from "@/components/form/qty-input";

interface ResourceFormFieldsProps {
  resource?: Resource;
  onValueChange?: () => void;
}

export function ResourceFormFields({ resource, onValueChange }: ResourceFormFieldsProps) {
  return (
    <>
      <Field className="grid gap-2">
        <FieldLabel htmlFor="name">* Name</FieldLabel>
        <Input id="name" name="name" defaultValue={resource?.name} required />
      </Field>
      <Field className="grid gap-2">
        <FieldLabel htmlFor="description">Description</FieldLabel>
        <Input id="description" name="description" defaultValue={resource?.description} />
      </Field>
      <Field className="grid gap-2">
        <FieldLabel htmlFor="price">* Price</FieldLabel>
        <PriceInput id="price" name="price" defaultValue={resource?.price} required />
      </Field>
      <Field className="grid gap-2">
        <FieldLabel htmlFor="quantity">* Quantity</FieldLabel>
        <QuantityInput
          id="quantity"
          defaultQuantity={resource?.base_quantity ?? 1}
          defaultUnit={resource?.base_unit}
          required
        />
      </Field>
    </>
  );
}
