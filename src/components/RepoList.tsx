import React from 'react'
import { useUserRepos } from '../hooks/useGitHubAPI'
import { GitHubRepo } from '../types/github'

interface RepoListProps {
  username: string
}

const RepoList: React.FC<RepoListProps> = ({ username }) => {
  const { repos, loading, error, hasMore } = useUserRepos(username)

  if (loading && repos.length === 0) {
    return (
      <div className="animate-pulse">
        <div className="bg-gray-200 h-4 w-1/4 rounded mb-4"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border p-4 mb-4">
            <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
            <div className="bg-gray-200 h-3 w-full rounded mb-2"></div>
            <div className="bg-gray-200 h-3 w-1/2 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Repositories</h3>
        <span className="text-sm text-gray-500">{repos.length} repositories</span>
      </div>

      <div className="space-y-4">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-4 text-center">
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            Load more repositories...
          </button>
        </div>
      )}
    </div>
  )
}

interface RepoCardProps {
  repo: GitHubRepo
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  return (
    <div className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="text-md font-semibold text-gray-900 mb-1">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600"
            >
              {repo.name}
            </a>
          </h4>
          {repo.description && (
            <p className="text-gray-600 text-sm mb-3">{repo.description}</p>
          )}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            {repo.language && (
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>{repo.language}</span>
              </span>
            )}
            <span>⭐ {repo.stargazers_count}</span>
            <span>🍴 {repo.forks_count}</span>
            <span>👀 {repo.watchers_count}</span>
          </div>
        </div>
        <div className="ml-4">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
          >
            View Repository
          </a>
        </div>
      </div>
    </div>
  )
}

export default RepoList