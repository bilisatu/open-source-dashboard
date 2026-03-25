# Open Source Dashboard

A beautiful, modern dashboard for tracking and analyzing your open source contributions on GitHub.

## Features

- **Contribution Analytics**: Visualize your contribution trends over time
- **Repository Insights**: Track your repositories, stars, and forks
- **Issue Finder**: Discover beginner-friendly issues to contribute to
- **Contribution Calendar**: GitHub-style contribution calendar
- **User Statistics**: Comprehensive stats about your GitHub activity
- **Dark/Light Theme**: Beautiful responsive design

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with React integration
- **Build Tool**: Vite
- **API**: GitHub REST API v3

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- GitHub Personal Access Token

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd open-source-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### GitHub Authentication

To access your GitHub data, you'll need to provide a GitHub Personal Access Token:

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Click "Generate new token (classic)"
3. Give it a name and select the following scopes:
   - `repo` (for accessing repositories)
   - `user` (for accessing user profile)
4. Copy the generated token
5. Enter the token in the authentication form when prompted

## Features Overview

### Dashboard
- Welcome section with user information
- Quick overview of your repositories
- Contribution calendar visualization

### Contributions
- Interactive charts showing your contribution trends
- Line charts for commits, issues, and pull requests
- Monthly contribution breakdown

### Find Issues
- Search for beginner-friendly issues
- Filter by programming language
- Search types: Good First Issues, Beginner Issues, Help Wanted
- Custom query support

### Stats
- Comprehensive user statistics
- Repository metrics (stars, forks, size)
- Language breakdown
- Account information

## API Usage

The dashboard uses GitHub's REST API to fetch:
- User profile information
- Repository data
- Contribution statistics
- Issue search results

All API calls are authenticated using your Personal Access Token, which is stored locally in your browser.

## Deployment

### GitHub Pages

This project is configured to deploy to GitHub Pages:

1. Build the project:
```bash
npm run build
```

2. Push to GitHub:
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

3. Configure GitHub Pages in your repository settings to use the `gh-pages` branch or the `/docs` folder

### Vercel

Alternatively, you can deploy to Vercel:

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or suggestions, please open an issue in this repository.

## Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for providing access to GitHub data
- [React](https://reactjs.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Chart.js](https://www.chartjs.org/) for data visualization