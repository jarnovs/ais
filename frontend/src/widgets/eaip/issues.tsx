'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { memo } from "react"
import { Issue } from '@/lib/api/issues'
import { useIssues } from './use-issues'

const IssueTable = memo(({ issues }: { issues: Issue[] }) => {
  return (
    <Table>
        <TableHeader>
          <TableRow> 
            <TableHead className="text-center bg-[#F0F0F0] text-[#555555] font-bold border-1 border-[#999999] text-xs md:text-sm px-1 md:px-3 py-2">Effective Date</TableHead>
            <TableHead className="text-center bg-[#F0F0F0] text-[#555555] font-bold border-1 border-[#999999] text-xs md:text-sm px-1 md:px-3 py-2">Publication Date</TableHead>
            <TableHead className="text-center bg-[#F0F0F0] text-[#555555] font-bold border-1 border-[#999999] text-xs md:text-sm px-1 md:px-3 py-2">Reason for Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-center">
          {issues.map((issue: any) => (
            <TableRow
              key={issue.id}
              className="bg-white"
            >
              <TableCell className="border border-[#999999] text-[#006588] font-bold underline text-xs md:text-sm px-1 md:px-3 py-1 md:py-2">
                <a href={`/eaip/${issue.folder}/html`}>{issue.effective_date}</a>
              </TableCell>
              <TableCell className="border border-[#999999] text-xs md:text-sm px-1 md:px-3 py-1 md:py-2">{issue.publication_date}</TableCell>
              <TableCell className="border border-[#999999] text-xs md:text-sm px-1 md:px-3 py-1 md:py-2">{issue.reason_for_change}</TableCell>
            </TableRow>
          ))}
        </TableBody>
    </Table>
  );
});

const IssuesCards = () => {
  const { data: effective_issues, loading: loadingEffective, error: errorEffective } = useIssues("status=active");
  const { data: archived_issues, loading: loadingArchived, error: errorArchived } = useIssues("status=archived");
  const { data: future_issues, loading: loadingFuture, error: errorFuture } = useIssues("status=future");

  return (
    <div className="flex flex-col gap-2 max-w-4xl p-2 md:p-4 mx-auto">
      <h2 className="text-lg md:text-xl font-bold">Currently Effective Issue</h2>
      <IssueTable issues={effective_issues} />
      <h2 className="text-lg md:text-xl font-bold mt-4 md:mt-8">Future Issues</h2>
      <IssueTable issues={future_issues} />
      <h2 className="text-lg md:text-xl font-bold mt-4 md:mt-8">Archived Issues</h2>
      <IssueTable issues={archived_issues} />
    </div>
  )
}

export default IssuesCards