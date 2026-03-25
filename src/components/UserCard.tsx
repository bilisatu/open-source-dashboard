import React from 'react'
import { GitHubUser } from '../types/github'

interface UserCardProps {
  user: GitHubUser
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center space-x-4">
        <img
          src={user.avatar_url}
          alt={user.name || user.login}
          className="w-16 h-16 rounded-full"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {user.name || user.login}
          </h3>
          <p className="text-gray-600 text-sm">@{user.login}</p>
          {user.company && (
            <p className="text-gray-500 text-sm mt-1">🏢 {user.company}</p>
          )}
          {user.location && (
            <p className="text-gray-500 text-sm mt-1">📍 {user.location}</p>
          )}
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-bold text-gray-900">{user.public_repos}</div>
          <div className="text-xs text-gray-500">Repositories</div>
        </div>
        <div>
          <div className="text-lg font-bold text-gray-900">{user.followers}</div>
          <div className="text-xs text-gray-500">Followers</div>
        </div>
        <div>
          <div className="text-lg font-bold text-gray-900">{user.following}</div>
          <div className="text-xs text-gray-500">Following</div>
        </div>
      </div>

      {user.bio && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">{user.bio}</p>
        </div>
      )}

      <div className="mt-4 flex space-x-2">
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
        >
          View Profile
        </a>
        {user.blog && (
          <a
            href={user.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
          >
            Website
          </a>
        )}
      </div>
    </div>
  )
}

export default UserCard