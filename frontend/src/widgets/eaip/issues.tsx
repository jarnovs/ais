import React from 'react'
import IssueTable from './table'
import { issuesApi } from '@/lib/api/issues'

const Issues = async () => {
  const effective_issues = await issuesApi.getIssues("status=active")
  const future_issues = await issuesApi.getIssues("status=future")
  const archived_issues = await issuesApi.getIssues("status=archived")
  
  return (
    <div className="flex flex-col gap-2 max-w-4xl p-4 md:p-4 mx-auto">
      <h2 className="text-xl font-bold">Currently Effective Issue</h2>
      <IssueTable issues={effective_issues} />
      <h2 className="text-xl font-bold mt-8">Future Issues</h2>
      <IssueTable issues={future_issues} />
      <h2 className="text-xl font-bold mt-8">Archived Issues</h2>
      <IssueTable issues={archived_issues} />
    </div>
  )
}

export default Issues
