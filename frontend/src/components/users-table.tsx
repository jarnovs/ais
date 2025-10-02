'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useUsersStore } from "@/store/users-store"
import { AdminUser } from "@/lib/api/users"

import React, { useEffect } from 'react'
import DeleteUserButton from "./delete-user-button"
import EditUserButton from "./edit-user-button"


const UsersTable = () => {
  const { users, loading, error, fetchUsers } = useUsersStore()

  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) {
    return <div>Загрузка пользователей...</div>
  }

  if (error) {
    return <div className="text-red-500">Ошибка: {error}</div>
  }

  return (
    <Table>
        <TableCaption>Таблица управления пользователями.</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Имя</TableHead>
                <TableHead className="text-right">Действия</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {users.map((user: AdminUser) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell className="text-right">
                  <EditUserButton {...user} />
                  <DeleteUserButton userId={user.id} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}

export default UsersTable