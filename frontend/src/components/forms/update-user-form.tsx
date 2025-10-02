"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { set, z } from "zod"
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
import { AdminUser, usersApi } from "@/lib/api/users"
import { useUsersStore } from "@/store/users-store"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"


const UpdateUserFormSchema = z.object({
  name: z.string().optional(),
  password: z.string().optional(),
})

export function UpdateUserForm(user: AdminUser) {
  const { fetchUsers } = useUsersStore()
  const [isLoading, setIsLoading] = useState(false) 
  const form = useForm<z.infer<typeof UpdateUserFormSchema>>({
    resolver: zodResolver(UpdateUserFormSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  }
)

  async function onSubmit(values: z.infer<typeof UpdateUserFormSchema>) {
    try{
        setIsLoading(true)
        const payload = Object.fromEntries(
          Object.entries(values).filter(([_, v]) => v && v.trim() !== "")
        )
        await usersApi.updateUser(user.id, payload)
        form.reset()
        toast.success("Пользователь успешно обновлён")
        await fetchUsers()
        
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