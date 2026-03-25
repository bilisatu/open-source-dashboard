import React, { useState } from 'react'
import { useSearchIssues } from '../hooks/useGitHubAPI'
import { GitHubIssue } from '../types/github'

const IssueFinder: React.FC = () => {
  const [language, setLanguage] = useState('')
  const [searchType, setSearchType] = useState('good-first-issues')
  const [query, setQuery] = useState('')

  const { issues, loading, error } = useSearchIssues({
    query: query || getDefaultQuery(searchType, language),
    per_page: 50
  })

  function getDefaultQuery(type: string, lang: string): string {
    switch (type) {
      case 'good-first-issues':
        return `label:"good first issue" state:open${lang ? ` language:${lang}` : ''}`
      case 'beginner-issues':
        return `label:"beginner" state:open${lang ? ` language:${lang}` : ''}`
      case 'help-wanted':
        return `label:"help wanted" state:open${lang ? ` language:${lang}` : ''}`
      case 'custom':
        return ''
      default:
        return ''
    }
  }

  const handleSearch = () => {
    setQuery(getDefaultQuery(searchType, language))
  }

  return (
    <div className="space-y-6">
      {/* Search Controls */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Beginner-Friendly Issues</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Type
            </label>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="good-first-issues">Good First Issues</option>
              <option value="beginner-issues">Beginner Issues</option>
              <option value="help-wanted">Help Wanted</option>
              <option value="custom">Custom Query</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language (Optional)
            </label>
            <input
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="e.g., JavaScript, Python, Rust"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {searchType === 'custom' && (
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Query
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., label:bug state:open language:javascript"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}
        </div>

        <button
          onClick={handleSearch}
          className="w-full md:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Search Issues
        </button>
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Search Results</h3>
          <span className="text-sm text-gray-500">{issues.length} issues found</span>
        </div>

        {loading && issues.length === 0 ? (
          <div className="animate-pulse">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg border p-4 mb-4">
                <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
                <div className="bg-gray-200 h-3 w-full rounded mb-2"></div>
                <div className="bg-gray-200 h-3 w-1/2 rounded"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        ) : issues.length === 0 ? (
          <div className="bg-white rounded-lg border p-8 text-center">
            <div className="text-gray-500 mb-2">No issues found</div>
            <p className="text-sm text-gray-400">
              Try adjusting your search criteria or language filter
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
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
              {issue.body.substring(0, 300)}...
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

export default IssueFinder