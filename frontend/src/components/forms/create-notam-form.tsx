"use client"

import { zodResolver } from "@hookform/resolvers/zod"
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
import { notamApi } from "@/lib/api/notam"
import { Progress } from "@/components/ui/progress"
import { useNotamStore } from "@/store/notam-store"


const CreateNotamFormSchema = z.object({
  file: z.instanceof(File),
})

export function CreateNotamForm() {
  const { fetchNotams } = useNotamStore()
  const [isLoading, setIsLoading] = useState(false) 
  const [progress, setProgress] = useState(0)
  const form = useForm({
    resolver: zodResolver(CreateNotamFormSchema),
    defaultValues: {
      file: undefined,
    },
  })

  async function onSubmit(values: any) {
    try {
      setIsLoading(true)
      setProgress(0)
      const formData = new FormData()
      formData.append("file", values.file)

      await notamApi.createNotam(formData, {
        onUploadProgress: (event: ProgressEvent) => {
          if (event.total) {
            setProgress(Math.round((event.loaded * 100) / event.total))
          }
        },
      })

      form.reset()
      toast.success("NOTAM успешно создан.")
      await fetchNotams()
      
    } catch (error: any) {
      console.error("Ошибка отправки:", error)
      const msg = error.response?.data?.detail || error.message
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
          name="file" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Загрузить NOTAM</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (file) {
                      field.onChange(file)
                    } else {
                      field.onChange(null)
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         {isLoading && progress > 0 && (
          <div className="mb-2">
            <Progress value={progress} max={100} />
            <div className="text-xs text-muted-foreground mt-1">{progress}%</div>
          </div>
        )}
        <Button disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Подтвердить"}
        </Button>
      </form>
    </Form>
  )
}