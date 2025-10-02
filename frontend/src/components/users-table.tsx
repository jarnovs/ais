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
import { AdminUser } from "@/lib/api/users"
import { usersApi } from "@/lib/api/users"

import React, { useState, useEffect } from 'react'
import DeleteUserButton from "./delete-user-button"
import EditUserButton from "./edit-user-button"


const UsersTable = () => {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await usersApi.getUsers()
        setUsers(userData)
        console.log(userData)
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return <div>Загрузка пользователей...</div>
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