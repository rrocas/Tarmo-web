import * as React from "react";
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
import { cn } from "@/lib/utils";

const UNITS = [
  { value: "kg", label: "Kilograms", family: "Weight" },
  { value: "g", label: "Grams", family: "Weight" },
  { value: "mg", label: "Milligrams", family: "Weight" },
  { value: "l", label: "Liters", family: "Volume" },
  { value: "ml", label: "Milliliters", family: "Volume" },
  { value: "pcs", label: "Pieces", family: "Count" },
] as const;

const familyOf = (unit?: string) => UNITS.find((u) => u.value === unit)?.family;

interface QuantityInputProps {
  id?: string;
  quantityName?: string; // default "quantity"
  unitName?: string; // default "unit"
  defaultQuantity?: number;
  /** If set, unit choices are limited to this unit's family */
  defaultUnit?: string;
  required?: boolean;
  className?: string;
}

export function QuantityInput({
  id,
  quantityName = "quantity",
  unitName = "unit",
  defaultQuantity = 1,
  defaultUnit,
  required,
  className,
}: QuantityInputProps) {
  const [qty, setQty] = React.useState(String(defaultQuantity));

  const lockedFamily = familyOf(defaultUnit);
  const options = lockedFamily
    ? UNITS.filter((u) => u.family === lockedFamily)
    : UNITS;
  const families = [...new Set(options.map((u) => u.family))];

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value.replace(",", ".");
    if (/^\d*\.?\d{0,3}$/.test(v)) setQty(v); // digits, one dot, max 3 decimals
  }

  function handleBlur() {
    const n = parseFloat(qty);
    setQty(Number.isFinite(n) && n > 0 ? String(n) : ""); // trims "1." / "007"
  }

  return (
    <div className={cn("grid gap-1.5", className)}>
      <div className="flex">
        <Input
          id={id}
          name={quantityName}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder="0"
          required={required}
          value={qty}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={(e) => e.target.select()}
          className="relative rounded-r-none tabular-nums focus-visible:z-10"
        />
        <Select name={unitName} defaultValue={defaultUnit} required={required}>
          <SelectTrigger className="-ml-px w-32 shrink-0 rounded-l-none focus-visible:z-10">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            {families.map((family) => (
              <SelectGroup key={family}>
                {/* group labels only matter when nothing is locked */}
                {!lockedFamily && <SelectLabel>{family}</SelectLabel>}
                {options
                  .filter((u) => u.family === family)
                  .map((u) => (
                    <SelectItem key={u.value} value={u.value}>
                      {u.label}
                    </SelectItem>
                  ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>
      {lockedFamily && (
        <p className="text-xs text-muted-foreground">
          Limited to {lockedFamily.toLowerCase()} units for this resource.
        </p>
      )}
    </div>
  );
}