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
import { issuesApi } from '@/lib/api/issues'
import { useIssuesStore } from '@/store/issues-store'

interface DeleteIssueButtonProps {
  issueId: number; 
}

const DeleteIssueButton = ({ issueId }: DeleteIssueButtonProps) => {
  const { fetchIssues } = useIssuesStore()
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await issuesApi.deleteIssue(issueId);
      toast.success("EAIP успешно удален");
      setIsOpen(false);
      await fetchIssues()
    } catch (error) {
      console.log(error);
      toast.error("Ошибка при удалении EAIP");
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
              <DialogTitle>Удалить EAIP</DialogTitle>
              <DialogDescription>
                  Это действие нельзя отменить. Это приведет к постоянному удалению EAIP
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

export default DeleteIssueButton
