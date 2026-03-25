import axios from 'axios'
import { 
  GitHubUser, 
  GitHubRepo, 
  GitHubIssue, 
  GitHubCommit, 
  GitHubLabel,
  IssueSearchFilters 
} from '../types/github'

const API_BASE_URL = 'https://api.github.com'

class GitHubService {
  private token: string | null = null

  setToken(token: string) {
    this.token = token
    localStorage.setItem('github_token', token)
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('github_token')
    }
    return this.token
  }

  private getHeaders() {
    const token = this.getToken()
    return {
      headers: {
        'Authorization': token ? `token ${token}` : undefined,
        'Accept': 'application/vnd.github.v3+json'
      }
    }
  }

  async getCurrentUser(): Promise<GitHubUser> {
    const response = await axios.get(`${API_BASE_URL}/user`, this.getHeaders())
    return response.data
  }

  async getUser(username: string): Promise<GitHubUser> {
    const response = await axios.get(`${API_BASE_URL}/users/${username}`, this.getHeaders())
    return response.data
  }

  async getUserRepos(username: string, page: number = 1): Promise<GitHubRepo[]> {
    const response = await axios.get(
      `${API_BASE_URL}/users/${username}/repos`,
      {
        ...this.getHeaders(),
        params: {
          page,
          per_page: 100,
          sort: 'updated',
          direction: 'desc'
        }
      }
    )
    return response.data
  }

  async getUserCommits(username: string, repo: string, since?: string): Promise<GitHubCommit[]> {
    const params: any = { per_page: 100 }
    if (since) {
      params.since = since
    }

    const response = await axios.get(
      `${API_BASE_URL}/repos/${username}/${repo}/commits`,
      {
        ...this.getHeaders(),
        params
      }
    )
    return response.data
  }

  async searchIssues(filters: IssueSearchFilters & { query: string }): Promise<GitHubIssue[]> {
    const params: any = {
      q: filters.query,
      per_page: filters.per_page || 30,
      page: filters.page || 1
    }

    if (filters.sort) {
      params.sort = filters.sort
    }
    if (filters.order) {
      params.order = filters.order
    }

    const response = await axios.get(
      `${API_BASE_URL}/search/issues`,
      {
        ...this.getHeaders(),
        params
      }
    )
    return response.data.items
  }

  async getRepoIssues(owner: string, repo: string, state: 'open' | 'closed' = 'open'): Promise<GitHubIssue[]> {
    const response = await axios.get(
      `${API_BASE_URL}/repos/${owner}/${repo}/issues`,
      {
        ...this.getHeaders(),
        params: {
          state,
          per_page: 100
        }
      }
    )
    return response.data
  }

  async getRepoLabels(owner: string, repo: string): Promise<GitHubLabel[]> {
    const response = await axios.get(
      `${API_BASE_URL}/repos/${owner}/${repo}/labels`,
      this.getHeaders()
    )
    return response.data
  }

  async getContributorsStats(owner: string, repo: string): Promise<any[]> {
    const response = await axios.get(
      `${API_BASE_URL}/repos/${owner}/${repo}/stats/contributors`,
      this.getHeaders()
    )
    return response.data
  }

  async getRepository(owner: string, repo: string): Promise<GitHubRepo> {
    const response = await axios.get(
      `${API_BASE_URL}/repos/${owner}/${repo}`,
      this.getHeaders()
    )
    return response.data
  }

  async getLanguages(owner: string, repo: string): Promise<Record<string, number>> {
    const response = await axios.get(
      `${API_BASE_URL}/repos/${owner}/${repo}/languages`,
      this.getHeaders()
    )
    return response.data
  }

  // Helper methods for common searches
  async findGoodFirstIssues(language?: string): Promise<GitHubIssue[]> {
    let query = 'label:"good first issue" state:open'
    if (language) {
      query += ` language:${language}`
    }
    
    return this.searchIssues({
      query,
      sort: 'created',
      order: 'desc',
      per_page: 50
    })
  }

  async findBeginnerIssues(language?: string): Promise<GitHubIssue[]> {
    let query = 'label:"beginner" state:open'
    if (language) {
      query += ` language:${language}`
    }
    
    return this.searchIssues({
      query,
      sort: 'created',
      order: 'desc',
      per_page: 50
    })
  }

  async findHelpWantedIssues(language?: string): Promise<GitHubIssue[]> {
    let query = 'label:"help wanted" state:open'
    if (language) {
      query += ` language:${language}`
    }
    
    return this.searchIssues({
      query,
      sort: 'created',
      order: 'desc',
      per_page: 50
    })
  }
}

export const githubService = new GitHubService()