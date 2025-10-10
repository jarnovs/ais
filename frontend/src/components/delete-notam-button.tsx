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
import { toast } from 'sonner'
import { notamApi } from '@/lib/api/notam'
import { useNotamStore } from '@/store/notam-store'

interface DeleteNotamButtonProps {
  notamName: string;
}

const DeleteNotamButton = ({ notamName }: DeleteNotamButtonProps) => {
  const { fetchNotams } = useNotamStore()
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await notamApi.deleteNotam(notamName);
      toast.success("NOTAM успешно удалено");
      setIsOpen(false);
      await fetchNotams()
    } catch (error) {
      console.log(error);
      toast.error("Ошибка при удалении NOTAM");
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
              <DialogTitle>Удалить NOTAM</DialogTitle>
              <DialogDescription>
                  Это действие нельзя отменить. Это приведет к удалению NOTAM с наших серверов.
              </DialogDescription>
              <Button disabled={isLoading} variant="destructive" onClick={handleDelete}>
                {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Удалить"}
              </Button>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default DeleteNotamButton