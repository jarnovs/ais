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

import React, { useEffect } from 'react'
import { Issue } from "@/lib/api/issues"
import DeleteIssueButton from "./delete-issue-button"
import EditUserButton from "./edit-issue-button"
import { useIssuesStore } from "@/store/issues-store"
import EditEaipContentButton from "./edit-eaip-content-button"

const IssuesTable = () => {
  const { issues, loading, error, fetchIssues } = useIssuesStore()

  useEffect(() => {
    fetchIssues()
  }, [])

  if (loading) {
    return <div>Загрузка EAIP...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <Table>
        <TableCaption>Таблица управления EAIP.</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Effective Date</TableHead>
                <TableHead>Publication Date</TableHead>
                <TableHead>Reason for Change</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Название папки</TableHead>
                <TableHead className="text-right">Действия</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {issues.map((issue: Issue) => (
              <TableRow key={issue.id}>
                <TableCell className="font-medium">{issue.id}</TableCell>
                <TableCell>{issue.effective_date}</TableCell>
                <TableCell>{issue.publication_date}</TableCell>
                <TableCell>{issue.reason_for_change}</TableCell>
                <TableCell>{issue.status}</TableCell>
                <TableCell>{issue.folder}</TableCell>
                <TableCell className="text-right">
                  <EditUserButton {...issue} />
                  <EditEaipContentButton issueId={issue.id} />
                  <DeleteIssueButton issueId={issue.id} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}

export default IssuesTable
