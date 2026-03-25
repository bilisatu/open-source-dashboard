export interface GitHubUser {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  name: string
  company: string | null
  blog: string
  location: string | null
  email: string | null
  hireable: boolean | null
  bio: string | null
  twitter_username: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export interface GitHubRepo {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: GitHubUser
  html_url: string
  description: string | null
  fork: boolean
  url: string
  created_at: string
  updated_at: string
  pushed_at: string
  homepage: string | null
  size: number
  stargazers_count: number
  watchers_count: number
  language: string | null
  forks_count: number
  open_issues_count: number
  master_branch: string
  default_branch: string
  score: number
}

export interface GitHubIssue {
  id: number
  node_id: string
  url: string
  repository_url: string
  labels_url: string
  comments_url: string
  events_url: string
  html_url: string
  number: number
  title: string
  user: GitHubUser
  labels: GitHubLabel[]
  state: 'open' | 'closed'
  locked: boolean
  assignee: GitHubUser | null
  assignees: GitHubUser[]
  milestone: any | null
  comments: number
  created_at: string
  updated_at: string
  closed_at: string | null
  author_association: string
  body: string | null
  reactions: any
  timeline_url: string
  performed_via_github_app: any | null
  state_reason: string | null
  pull_request?: {
    url: string
    html_url: string
    diff_url: string
    patch_url: string
  }
}

export interface GitHubLabel {
  id: number
  node_id: string
  url: string
  name: string
  color: string
  default: boolean
  description: string | null
}

export interface GitHubCommit {
  sha: string
  node_id: string
  commit: {
    author: {
      name: string
      email: string
      date: string
    }
    committer: {
      name: string
      email: string
      date: string
    }
    message: string
    tree: {
      sha: string
      url: string
    }
    url: string
    comment_count: number
    verification: {
      verified: boolean
      reason: string
      signature: string | null
      payload: string | null
    }
  }
  url: string
  html_url: string
  comments_url: string
  author: GitHubUser | null
  committer: GitHubUser | null
  parents: Array<{
    sha: string
    url: string
    html_url: string
  }>
}

export interface ContributionStats {
  totalCommits: number
  totalPRs: number
  totalIssues: number
  totalReviews: number
  repositoriesContributed: number
  firstContributionDate: string
  lastContributionDate: string
  contributionsByMonth: Array<{
    month: string
    year: number
    count: number
  }>
}

export interface IssueSearchFilters {
  language?: string
  labels?: string[]
  sort?: 'created' | 'updated' | 'comments'
  order?: 'asc' | 'desc'
  per_page?: number
  page?: number
}