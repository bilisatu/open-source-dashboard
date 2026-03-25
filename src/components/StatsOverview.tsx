import React from 'react'
import { useCurrentUser } from '../hooks/useGitHubAPI'
import { useUserRepos } from '../hooks/useGitHubAPI'
import { AnalyticsService } from '../services/analyticsService'

const StatsOverview: React.FC = () => {
  const { user, loading: userLoading } = useCurrentUser()
  const { repos, loading: reposLoading } = useUserRepos(user?.login || '', 1)

  if (userLoading || reposLoading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6">
              <div className="bg-gray-200 h-4 w-1/2 rounded mb-2"></div>
              <div className="bg-gray-200 h-8 w-3/4 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Unable to load user data</p>
      </div>
    )
  }

  const repoStats = AnalyticsService.getRepoStats(repos)
  const languageBreakdown = AnalyticsService.getLanguageBreakdown(repos)

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Stars"
          value={repoStats.totalStars.toLocaleString()}
          icon="⭐"
          color="text-yellow-600"
        />
        <StatCard
          title="Total Forks"
          value={repoStats.totalForks.toLocaleString()}
          icon="🍴"
          color="text-blue-600"
        />
        <StatCard
          title="Repositories"
          value={user.public_repos.toString()}
          icon="📁"
          color="text-green-600"
        />
        <StatCard
          title="Avg Stars/Repo"
          value={repoStats.avgStarsPerRepo.toFixed(1)}
          icon="📊"
          color="text-purple-600"
        />
      </div>

      {/* Language Breakdown */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Language Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(languageBreakdown).map(([language, count]) => (
            <div key={language} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-medium text-gray-900">{language}</span>
              </div>
              <span className="text-gray-600">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Username</span>
              <span className="font-medium">{user.login}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Followers</span>
              <span className="font-medium">{user.followers.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Following</span>
              <span className="font-medium">{user.following.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Public Gists</span>
              <span className="font-medium">{user.public_gists.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Account Created</span>
              <span className="font-medium">{new Date(user.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Repository Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Stars</span>
              <span className="font-medium">{repoStats.totalStars.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Forks</span>
              <span className="font-medium">{repoStats.totalForks.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Size</span>
              <span className="font-medium">{(repoStats.totalSize / 1024).toFixed(2)} MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg Stars/Repo</span>
              <span className="font-medium">{repoStats.avgStarsPerRepo.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Languages Used</span>
              <span className="font-medium">{Object.keys(languageBreakdown).length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  icon: string
  color: string
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${color} mt-1`}>
            {icon} {value}
          </p>
        </div>
      </div>
    </div>
  )
}

export default StatsOverview