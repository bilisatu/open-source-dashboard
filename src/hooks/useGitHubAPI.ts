import { useState, useEffect } from 'react'
import { githubService } from '../services/githubService'
import { GitHubUser, GitHubRepo, GitHubIssue, GitHubCommit } from '../types/github'

export const useGitHubUser = (username: string) => {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const userData = await githubService.getUser(username)
        setUser(userData)
        setError(null)
      } catch (err) {
        setError('Failed to fetch user data')
        console.error('Error fetching user:', err)
      } finally {
        setLoading(false)
      }
    }

    if (username) {
      fetchUser()
    }
  }, [username])

  return { user, loading, error }
}

export const useUserRepos = (username: string, page: number = 1) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true)
        const reposData = await githubService.getUserRepos(username, page)
        setRepos(prev => page === 1 ? reposData : [...prev, ...reposData] as GitHubRepo[])
        setHasMore(reposData.length === 100)
        setError(null)
      } catch (err) {
        setError('Failed to fetch repositories')
        console.error('Error fetching repos:', err)
      } finally {
        setLoading(false)
      }
    }

    if (username) {
      fetchRepos()
    }
  }, [username, page])

  return { repos, loading, error, hasMore }
}

export const useUserCommits = (username: string, repo: string, since?: string) => {
  const [commits, setCommits] = useState<GitHubCommit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        setLoading(true)
        const commitsData = await githubService.getUserCommits(username, repo, since)
        setCommits(commitsData)
        setError(null)
      } catch (err) {
        setError('Failed to fetch commits')
        console.error('Error fetching commits:', err)
      } finally {
        setLoading(false)
      }
    }

    if (username && repo) {
      fetchCommits()
    }
  }, [username, repo, since])

  return { commits, loading, error }
}

export const useSearchIssues = (filters: any) => {
  const [issues, setIssues] = useState<GitHubIssue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const searchIssues = async () => {
      try {
        setLoading(true)
        const issuesData = await githubService.searchIssues(filters)
        setIssues(issuesData)
        setError(null)
      } catch (err) {
        setError('Failed to search issues')
        console.error('Error searching issues:', err)
      } finally {
        setLoading(false)
      }
    }

    if (filters.query) {
      searchIssues()
    }
  }, [filters])

  return { issues, loading, error }
}

export const useCurrentUser = () => {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoading(true)
        const userData = await githubService.getCurrentUser()
        setUser(userData)
        setError(null)
      } catch (err) {
        setError('Failed to fetch current user data')
        console.error('Error fetching current user:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrentUser()
  }, [])

  return { user, loading, error }
}