# github-app-node-boilerplate
Boilerplate for a GitHub App.

### Technology Stack
1. NodeJS
1. TypeScript
1. PostgreSQL

### Environment Variables
**EVENT_HANDLING_DELAY**: Miliseconds to delay before handling an event. Depending on your app, you might need to delay handling to make sure GitHub's eventually consistent data is caught up.
**GITHUB_APP_NAME**: Name of GitHub app. Used to ignore events caused by this app.
**GITHUB_APP_ID**: GitHub Application ID.
**GITHUB_WEBHOOK_SECRET**: GitHub webhook secret. Used to verify webhooks came from GitHub.
