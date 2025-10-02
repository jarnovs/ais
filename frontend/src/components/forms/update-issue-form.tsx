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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { issuesApi } from "@/lib/api/issues"
import { Progress } from "@/components/ui/progress"
import { useIssuesStore } from "@/store/issues-store"

const CreateIssueFormSchema = z.object({
  effective_date: z.string().optional(),
  publication_date: z.string().optional(),
  reason_for_change: z.string().optional(),
  status: z.enum(["active", "future", "archived", "hidden"]).optional(),
  file: z.instanceof(File).optional(),
})

export function UpdateIssueForm(issue: any) {
  const { fetchIssues } = useIssuesStore()
  const [isLoading, setIsLoading] = useState(false) 
  const [progress, setProgress] = useState(0)
  const form = useForm({
    resolver: zodResolver(CreateIssueFormSchema),
    defaultValues: {
      effective_date: "",
      publication_date: "",
      reason_for_change: "",
      status: undefined,
      file: undefined,
    },
  })

  async function onSubmit(values: any) {
    try {
      setIsLoading(true)
      const formData = new FormData()
      Object.entries(values).forEach(([key, val]) => {
        if (val instanceof File) {
          if (val.size > 0) formData.append(key, val)
        } else if (typeof val === "string") {
          if (val.trim() !== "") formData.append(key, val)
        } else if (val !== undefined && val !== null) {
          formData.append(key, String(val))
        }
      })
      await issuesApi.updateIssue(issue.id, formData, {
        onUploadProgress: (event: ProgressEvent) => {
          if (event.total) {
            setProgress(Math.round((event.loaded * 100) / event.total))
          }
        },
      })
      form.reset()
      toast.success("EAIP успешно обновлен.")
      await fetchIssues()
      
    } catch (error: any) {
      console.error("Ошибка отправки:", error)
      const msg = error.response?.data?.detail || error.message
      toast.error(msg)
    } finally {
      setIsLoading(false)
      setProgress(0)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="effective_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Дата вступления в силу</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="publication_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Дата публикации</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="reason_for_change"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Причина изменения</FormLabel>
              <FormControl>
                <Input placeholder="Введите причину изменения" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Статус</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите статус" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Активный</SelectItem>
                  <SelectItem value="future">Будущий</SelectItem>
                  <SelectItem value="archived">Архивный</SelectItem>
                  <SelectItem value="hidden">Скрытый</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="file" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Загрузить zip-файл</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".zip"
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
