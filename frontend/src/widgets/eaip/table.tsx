import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Issue } from '@/lib/api/issues'


const IssueTable = ({ issues }: { issues: Issue[] }) => {
  return (
    <Table>
        <TableHeader>
          <TableRow> 
            <TableHead className="text-center bg-[#F0F0F0] text-[#555555] font-bold border-1 border-[#999999]">Effective Date</TableHead>
            <TableHead className="text-center bg-[#F0F0F0] text-[#555555] font-bold border-1 border-[#999999]">Publication Date</TableHead>
            <TableHead className="text-center bg-[#F0F0F0] text-[#555555] font-bold border-1 border-[#999999]">Reason for Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-center">
          {issues.map((issue: any, index: number) => (
            <TableRow
              key={issue.id}
              className={index % 2 === 0 ? "bg-white" : "bg-[#F0F0F0]"}
            >
              <TableCell className="border border-[#999999] text-[#006588] font-bold underline">
                <a href={`/eaip/${issue.folder}/html`}>{issue.effective_date}</a>
              </TableCell>
              <TableCell className="border border-[#999999]">{issue.publication_date}</TableCell>
              <TableCell className="border border-[#999999]">{issue.reason_for_change}</TableCell>
            </TableRow>
          ))}
        </TableBody>
    </Table>
  )
}

export default IssueTable