"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { eaipContentAPI } from "@/lib/api/edit_issues"


const UpdateEaipContentFormSchema = z.object({
  reason_for_change: z.string().optional(),
})

export function UpdateEaipContentForm({ issueId }: { issueId: number }) {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm({
    defaultValues: {
      reason_for_change: ""
    },
  }
)

  async function onSubmit(values: z.infer<typeof UpdateEaipContentFormSchema>) {
    try{
        setIsLoading(true)
        const payload = Object.fromEntries(
          Object.entries(values).filter(([_, v]) => v && v.trim() !== "")
        )
        await eaipContentAPI.updateEaipContent(issueId, payload)
        form.reset()
        toast.success("Содержимое EAIP успешно обновлёно")
        setIsLoading(false)
    } catch (error: any) {
        console.log(error)
        const msg = error.response?.data?.detail?.[0]?.msg || error.message
        toast.error(msg)
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="reason_for_change"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Номер поправки</FormLabel>
              <FormControl>
                <Input placeholder="AIRAC AMDT 001/2077." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
            {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Подтвердить"}
        </Button>
      </form>
    </Form>
  )
}