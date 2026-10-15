export function formatDate(value: string | undefined): string {
    return new Intl.DateTimeFormat("es-ES", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(value || "Undefined"));
}