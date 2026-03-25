import React from 'react'

interface ContributionCalendarProps {
  username: string
}

const ContributionCalendar: React.FC<ContributionCalendarProps> = ({ username }) => {
  // Mock data for contribution calendar
  const weeks = Array.from({ length: 52 }, (_, weekIndex) => 
    Array.from({ length: 7 }, (_, dayIndex) => ({
      date: new Date(2024, 0, weekIndex * 7 + dayIndex),
      count: Math.floor(Math.random() * 5),
      level: Math.floor(Math.random() * 5)
    }))
  )

  const getLevelColor = (level: number) => {
    const colors = [
      'bg-gray-100',
      'bg-green-100',
      'bg-green-300',
      'bg-green-500',
      'bg-green-700'
    ]
    return colors[level] || colors[0]
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Less
        </div>
        <div className="flex space-x-1">
          {[0, 1, 2, 3, 4].map(level => (
            <div
              key={level}
              className={`w-3 h-3 rounded ${getLevelColor(level)}`}
              title={`${level} contributions`}
            />
          ))}
        </div>
        <div className="text-sm text-gray-500">
          More
        </div>
      </div>

      <div className="space-y-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex space-x-1">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-3 h-3 rounded ${getLevelColor(day.level)}`}
                title={`${day.date.toDateString()}: ${day.count} contributions`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Mon</span>
        <span>Sun</span>
      </div>
    </div>
  )
}

export default ContributionCalendar