"use client"

import React from 'react'
import { Button } from './ui/button'
import { Pencil } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UpdateIssueForm } from './forms/update-issue-form'

const EditIssueButton = (issue: any) => {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="ghost">
                <Pencil className="size-4"/>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
              <DialogTitle>Редактировать EAIP</DialogTitle>
              <DialogDescription>Здесь вы можете внести изменения в EAIP.</DialogDescription>
              <UpdateIssueForm {...issue}></UpdateIssueForm>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default EditIssueButton