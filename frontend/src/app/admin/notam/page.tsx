'use client'

import React, { useState } from 'react'
import NotamTable from '@/components/notam-table'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreateNotamForm } from '@/components/forms/create-notam-form'

const NotamPage = () => {
  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto p-4 md:p-24">
        <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">NOTAM</h1>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        Добавить NOTAM <Plus className="size-4"/>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Добавить NOTAM</DialogTitle>
                        <DialogDescription>
                            Пожалуйста, введите информацию о новом NOTAM.
                        </DialogDescription>
                        <CreateNotamForm />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
        <NotamTable />
    </div>
  )
}

export default NotamPage