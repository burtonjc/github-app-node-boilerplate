# github-app-node-boilerplate
Boilerplate for a GitHub App. This repo is intended to be copy/pasted to start a new GitHub App.

## Technology Stack
1. NodeJS
1. TypeScript
1. PostgreSQL (using TypeORM)

## Environment Variables
All of these are required except where otherwise stated.
1. **EVENT_HANDLING_DELAY (optional)**: Miliseconds to delay before handling an event. Depending on your app, you might need to delay handling to make sure GitHub's eventually consistent data is caught up.
1. **GITHUB_APP_ID**: GitHub Application ID.
1. **GITHUB_APP_NAME**: Name of GitHub app. Used to ignore events caused by this app.
1. **GITHUB_APP_PRIVATE_KEY**: Private key that was generated
1. **GITHUB_WEBHOOK_SECRET**: GitHub webhook secret. Used to verify webhooks came from GitHub.
