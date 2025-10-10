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
import { useNotamStore } from "@/store/notam-store"

import React, { useEffect } from 'react'
import DeleteUserButton from "./delete-user-button"
import EditUserButton from "./edit-user-button"
import { Button } from "./ui/button"
import DeleteNotamButton from "./delete-notam-button"

const NotamTable = () => {
  const { notams, loading, error, fetchNotams } = useNotamStore()

  useEffect(() => {
    fetchNotams()
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
            {notams.map((notam: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{notam.file}</TableCell>
                <TableCell className="text-right">
                  <Button><a href={`${process.env.NEXT_PUBLIC_SITE_URL}/notam/${notam.file}`} target="_blank" rel="noopener noreferrer">Перейти</a></Button>
                  <DeleteNotamButton notamName={notam.file}/>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}

export default NotamTable