"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Loader2, Trash2 } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { usersApi } from '@/lib/api/users'
import { set } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface DeleteUserButtonProps {
  userId: number; 
}

const DeleteUserButton = ({ userId }: DeleteUserButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await usersApi.deleteUser(userId);
      toast.success("Пользователь успешно удален");
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Ошибка при удалении пользователя");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            <Button variant="ghost">
                <Trash2 className="size-4"/>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
              <DialogTitle>Удалить пользователя</DialogTitle>
              <DialogDescription>
                  Это действие нельзя отменить. Это приведет к постоянному удалению вашей учетной записи
                  и удалению ваших данных с наших серверов.
              </DialogDescription>
              <Button disabled={isLoading} variant="destructive" onClick={handleDelete}>
                {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Удалить"}
              </Button>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default DeleteUserButton
