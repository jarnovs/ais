"use client"

import React from 'react'
import { Button } from './ui/button'
import { FileCode2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UpdateEaipContentForm } from './forms/update-eaip-content-form'

interface EditEaipContentButtonProps {
  issueId: number; 
}

const EditEaipContentButton = ({ issueId }: EditEaipContentButtonProps) => {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="ghost">
               <FileCode2 className="size-4"/>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
              <DialogTitle>Редактировать содержимое EAIP </DialogTitle>
              <DialogDescription>Вы можете изменить содержимое EAIP в форме ниже.</DialogDescription>
              <UpdateEaipContentForm issueId={issueId} />
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default EditEaipContentButton
