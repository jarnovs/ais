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
import { usersApi } from "@/lib/api/users"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const CreateUserFormSchema = z.object({
  name: z.string().min(6, {
    message: "Имя должно быть не менее 6 символов.",
  }),
  password: z.string().min(6, {
    message: "Пароль должен быть не менее 6 символов.",
  }),
})

export function CreateUserForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false) 
  const form = useForm<z.infer<typeof CreateUserFormSchema>>({
    resolver: zodResolver(CreateUserFormSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof CreateUserFormSchema>) {
    try{
        setIsLoading(true)
        await usersApi.createUser(values)
        form.reset()
        toast.success("Пользователь успешно создан.")
        router.refresh()
        setIsLoading(false)
    } catch (error: any) {
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input placeholder="Иван" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
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