import { ContributionStats, GitHubCommit, GitHubIssue, GitHubRepo } from '../types/github'

export class AnalyticsService {
  static calculateContributionStats(
    commits: GitHubCommit[],
    issues: GitHubIssue[],
    repos: GitHubRepo[]
  ): ContributionStats {
    const totalCommits = commits.length
    const totalIssues = issues.length
    const totalPRs = issues.filter(issue => issue.pull_request).length
    const totalReviews = 0 // Would need additional API calls to get review data
    
    const repoSet = new Set<string>()
    commits.forEach(commit => {
      const repoName = this.extractRepoNameFromUrl(commit.html_url)
      if (repoName) repoSet.add(repoName)
    })
    
    const repositoriesContributed = repoSet.size
    
    const firstContributionDate = commits.length > 0 
      ? commits[commits.length - 1].commit.author.date 
      : ''
    
    const lastContributionDate = commits.length > 0 
      ? commits[0].commit.author.date 
      : ''

    const contributionsByMonth = this.groupContributionsByMonth(commits)

    return {
      totalCommits,
      totalPRs,
      totalIssues,
      totalReviews,
      repositoriesContributed,
      firstContributionDate,
      lastContributionDate,
      contributionsByMonth
    }
  }

  private static extractRepoNameFromUrl(url: string): string | null {
    const match = url.match(/\/repos\/([^\/]+\/[^\/]+)/)
    return match ? match[1] : null
  }

  private static groupContributionsByMonth(commits: GitHubCommit[]): Array<{
    month: string
    year: number
    count: number
  }> {
    const monthMap = new Map<string, number>()
    
    commits.forEach(commit => {
      const date = new Date(commit.commit.author.date)
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`
      monthMap.set(monthKey, (monthMap.get(monthKey) || 0) + 1)
    })

    return Array.from(monthMap.entries()).map(([key, count]) => {
      const [year, month] = key.split('-').map(Number)
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]
      return {
        month: monthNames[month - 1],
        year,
        count
      }
    }).sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year
      return a.month.localeCompare(b.month)
    })
  }

  static getLanguageBreakdown(repos: GitHubRepo[]): Record<string, number> {
    const languageMap = new Map<string, number>()
    
    repos.forEach(repo => {
      if (repo.language) {
        languageMap.set(repo.language, (languageMap.get(repo.language) || 0) + 1)
      }
    })

    return Object.fromEntries(languageMap)
  }

  static getRepoStats(repos: GitHubRepo[]): {
    totalStars: number
    totalForks: number
    totalSize: number
    avgStarsPerRepo: number
  } {
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0)
    const totalSize = repos.reduce((sum, repo) => sum + repo.size, 0)
    const avgStarsPerRepo = repos.length > 0 ? totalStars / repos.length : 0

    return {
      totalStars,
      totalForks,
      totalSize,
      avgStarsPerRepo
    }
  }

  static getContributionTimeline(commits: GitHubCommit[]): Array<{
    date: string
    count: number
  }> {
    const dateMap = new Map<string, number>()
    
    commits.forEach(commit => {
      const date = new Date(commit.commit.author.date)
      const dateKey = date.toISOString().split('T')[0] // YYYY-MM-DD format
      dateMap.set(dateKey, (dateMap.get(dateKey) || 0) + 1)
    })

    return Array.from(dateMap.entries()).map(([date, count]) => ({
      date,
      count
    })).sort((a, b) => a.date.localeCompare(b.date))
  }
}