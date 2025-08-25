export const dynamic = 'force-dynamic';

import React from 'react'
import UsersTable from '@/components/users-table'
import { Button } from '@/components/ui/button'
import { User, UserPlus } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreateUserForm } from '@/components/forms/create-user-form'

const UserPage = () => {
  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto p-4 md:p-24">
        <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">Пользователи</h1>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        Добавить пользователя <UserPlus className="size-4"/>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Добавить пользователя</DialogTitle>
                        <DialogDescription>
                            Пожалуйста, введите информацию о новом пользователе.
                        </DialogDescription>
                        <CreateUserForm />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
        <UsersTable />
    </div>
  )
}

export default UserPage