export const dynamic = 'force-dynamic';

import React from 'react'
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
import IssuesTable from '@/components/issues-table'
import { CreateIssueForm } from '@/components/forms/create-issue-form'

const IssuePage = () => {
  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto p-4 md:p-24">
        <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">EAIP Issues</h1>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        Добавить EAIP<Plus className="size-4"/>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Добавить EAIP</DialogTitle>
                        <DialogDescription>
                            Пожалуйста, введите информацию о новом EAIP.
                        </DialogDescription>
                        <CreateIssueForm/>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
        <IssuesTable />
    </div>
  )
}

export default IssuePage