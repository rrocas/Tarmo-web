import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PriceInputProps {
  id?: string;
  name: string;
  /** Initial value in minor units (e.g. cents) */
  defaultValue?: number;
  currency?: string; // ISO 4217 code, e.g. "USD"
  locale?: string; // BCP 47 tag, e.g. "en-US"
  required?: boolean;
  className?: string;
  onValueChange?: (minorUnits: number) => void;
}

export function PriceInput({
  id,
  name,
  defaultValue,
  currency = "USD",
  locale = "en-US",
  required,
  className,
  onValueChange,
}: PriceInputProps) {
  const [cents, setCents] = React.useState<number>(defaultValue ?? 0);

  const fmt = React.useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency }),
    [locale, currency]
  );
  const digits = fmt.resolvedOptions().maximumFractionDigits ?? 2; // 2 for USD, 0 for JPY
  const factor = 10 ** digits;

  // Formatted without the symbol, since the symbol is rendered separately
  const display = (cents / factor).toLocaleString(locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

  const symbol = fmt.formatToParts(0).find((p) => p.type === "currency")?.value;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 12); // digits only, capped length
    const next = raw ? parseInt(raw, 10) : 0;
    setCents(next);
    onValueChange?.(next);

    // Keep the caret at the end (formatting changes the string length)
    const el = e.target;
    requestAnimationFrame(() =>
      el.setSelectionRange(el.value.length, el.value.length)
    );
  }

  return (
    <div className={cn("relative", className)}>
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
        {symbol}
      </span>
      <Input
        id={id}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        className="pl-8 pr-14 text-right tabular-nums"
        value={display}
        onChange={handleChange}
        onFocus={(e) => e.target.select()}
        aria-label="Price"
      />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
        {currency}
      </span>
      {/* Submitted value, in minor units (cents). Empty when 0 so `required` works. */}
      <input type="hidden" name={name} value={required && cents === 0 ? "" : cents} />
    </div>
  );
}