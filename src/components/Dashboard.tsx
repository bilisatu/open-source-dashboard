import React, { useState } from 'react'
import { useCurrentUser } from '../hooks/useGitHubAPI'
import UserCard from './UserCard'
import RepoList from './RepoList'
import IssueList from './IssueList'
import ContributionCalendar from './ContributionCalendar'

const Dashboard: React.FC = () => {
  const { user, loading: userLoading, error: userError } = useCurrentUser()
  const [username, setUsername] = useState('')
  const [activeTab, setActiveTab] = useState('repos')

  if (userLoading) {
    return (
      <div className="animate-pulse">
        <div className="bg-gray-200 h-8 w-1/4 rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="bg-gray-200 h-6 w-1/2 rounded mb-4"></div>
            <div className="space-y-3">
              <div className="bg-gray-200 h-4 w-full rounded"></div>
              <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
              <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (userError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-medium">Error loading user data</h3>
        <p className="text-red-600 text-sm mt-1">{userError}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name || user?.login}!
            </h1>
            <p className="text-gray-600 mt-1">
              Here's your open source contribution overview
            </p>
          </div>
          <div className="hidden md:block">
            <UserCard user={user!} />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - User Info & Calendar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="md:hidden">
            <UserCard user={user!} />
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contribution Calendar</h3>
            <ContributionCalendar username={user!.login} />
          </div>
        </div>

        {/* Right Column - Content Tabs */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 px-6">
                {[
                  { id: 'repos', name: 'Repositories', count: user?.public_repos },
                  { id: 'issues', name: 'Issues', count: 0 },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.name}
                    {tab.count !== undefined && (
                      <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'repos' && (
                <RepoList username={user!.login} />
              )}
              {activeTab === 'issues' && (
                <IssueList username={user!.login} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard