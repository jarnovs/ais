"use client"

import React from 'react'
import { Button } from './ui/button'
import { Pencil } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { UpdateUserForm } from './forms/update-user-form'
import { AdminUser } from '@/lib/api/users'

const EditUserButton = (user : AdminUser) => {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="ghost">
                <Pencil className="size-4"/>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
              <DialogTitle>Редактировать пользователя</DialogTitle>
              <DialogDescription>Вы можете изменить информацию о пользователе в форме ниже.</DialogDescription>
              <UpdateUserForm {...user} /> 
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default EditUserButton
