import React from 'react'
import { GitHubIssue } from '../types/github'

interface IssueListProps {
  username: string
}

const IssueList: React.FC<IssueListProps> = ({ username }) => {
  // TODO: Implement issue fetching logic
  const issues: GitHubIssue[] = []

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Issues</h3>
        <span className="text-sm text-gray-500">{issues.length} issues</span>
      </div>

      {issues.length === 0 ? (
        <div className="bg-white rounded-lg border p-8 text-center">
          <div className="text-gray-500 mb-2">No issues found</div>
          <p className="text-sm text-gray-400">
            Start contributing by finding beginner-friendly issues in the "Find Issues" tab
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      )}
    </div>
  )
}

interface IssueCardProps {
  issue: GitHubIssue
}

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  return (
    <div className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              {issue.state}
            </span>
            {issue.labels.map((label) => (
              <span
                key={label.id}
                className="px-2 py-1 text-xs font-medium rounded-full"
                style={{
                  backgroundColor: `#${label.color}20`,
                  color: `#${label.color}`,
                  border: `1px solid #${label.color}40`
                }}
              >
                {label.name}
              </span>
            ))}
          </div>
          <h4 className="text-md font-semibold text-gray-900 mb-2">
            <a
              href={issue.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600"
            >
              {issue.title}
            </a>
          </h4>
          {issue.body && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {issue.body.substring(0, 200)}...
            </p>
          )}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>#{issue.number}</span>
            <span>👤 {issue.user.login}</span>
            <span>💬 {issue.comments}</span>
            <span>📅 {new Date(issue.created_at).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="ml-4">
          <a
            href={issue.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
          >
            View Issue
          </a>
        </div>
      </div>
    </div>
  )
}

export default IssueList