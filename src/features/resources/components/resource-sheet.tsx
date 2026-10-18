"use client"

import { Button } from "@/components/ui/button"
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
import { createResourceAction, updateResourceAction } from "../api/resource-actions"
import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { ResourceFormFields } from "./form-fields"
import { mutate } from "swr"

type ResourceSheetProps =
    | { mode: "edit"; resource: Resource; trigger?: React.ReactNode }
    | { mode: "create"; resource?: undefined; trigger?: React.ReactNode }

const COPY = {
    create: {
        title: "New Resource",
        description: "Add a new resource. Click save when you're done.",
        success: "Resource created successfully.",
    },
    edit: {
        title: "Edit Resource",
        description: "Make changes to your resource here. Click save when you're done.",
        success: "Resource updated successfully.",
    },
} as const

export function ResourceSheet({ mode, resource, trigger }: ResourceSheetProps) {
    const [open, setOpen] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)
    const copy = COPY[mode]

    const validate = useCallback(() => {
        setIsValid(formRef.current?.checkValidity() ?? false)
    }, [])

    // Al abrir (sobre todo en modo edit) el form ya puede ser válido
    // aunque el usuario no haya tocado nada.
    useEffect(() => {
        if (!open) {
            setIsValid(false)
            return
        }
        const id = requestAnimationFrame(validate)
        return () => cancelAnimationFrame(id)
    }, [open, resource, validate])

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {trigger}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{copy.title}</SheetTitle>
                    <SheetDescription>{copy.description}</SheetDescription>
                </SheetHeader>
                <div className="p-4">
                    <form
                        ref={formRef}
                        autoComplete="off"
                        onSubmit={async (event) => {
                            event.preventDefault()

                            const formData = new FormData(event.currentTarget)

                            try {
                                if (mode === "edit") {
                                    await updateResourceAction(resource.id!, formData)
                                } else {
                                    await createResourceAction(formData)
                                }

                                await mutate("resources")

                                setOpen(false)
                                toast.success(copy.success)
                            } catch (error) {
                                if (error instanceof Error) {
                                    toast.error(error.message)
                                } else {
                                    toast.error("Something went wrong.")
                                }
                            }
                        }}
                        className="grid gap-4"
                        onInput={validate}
                        onChange={validate}
                    >
                        <ResourceFormFields
                            key={resource?.id ?? "new"}
                            resource={resource}
                            onValueChange={validate}
                        />
                        <SheetFooter className="mt-4">
                            <Button type="submit" disabled={!isValid}>Save changes</Button>
                        </SheetFooter>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    )
}