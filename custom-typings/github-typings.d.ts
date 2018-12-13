declare module 'GitHub' {
  export interface Deployment {
    url: string;
    id: number;
    sha: string;
    ref: string;
    task: string;
    payload: {
      task: string;
    };
    environment: string;
    description: string;
    creator: User;
    created_at: string;
    updated_at: string;
    statuses_url: string;
    repository_url: string;
  }

  export interface DeploymentStatus {
    url: string;
    id: number;
    state: string;
    creator: User;
    description: string;
    target_url?: string;
    log_url?: string;
    created_at: string;
    updated_at: string;
    deployment_url: string;
    repository_url: string;
  }

  export interface Label {
    url: string;
    name: string;
    color: string;
  }

  export interface Issue {
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    id: number;
    number: number;
    title: string;
    user: User;
    labels: Label[];
    state: string;
    locked: boolean;
    assignee: User;
    assignees: User[];
    milestone: Milestone;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at: string;
    body: string;
    closed_by: User;
  }

  export interface Milestone {
    url: string;
    html_url: string;
    labels_url: string;
    id: number;
    number: number;
    title: string;
    description: string;
    creator: User;
    open_issues: number;
    closed_issues: number;
    state: string;
    created_at: string;
    updated_at: string;
    due_on: string;
    closed_at: string;
  }

  export interface Repository {
    id: number;
    name: string;
    full_name: string;
    owner: User;
    private: boolean;
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: string;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    forks_count: number;
    mirror_url: string;
    open_issues_count: number;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
  }

  interface _link {
    href: string;
  }

  export interface PullRequest {
    id: number;
    repoPath: string;
    provider_url: string;
    full_name: string;
    number: number;
    url: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    issue_url: string;
    commits_url: string;
    review_comments_url: string;
    review_comment_url: string;
    comments_url: string;
    statuses_url: string;
    state: string;
    title: string;
    body: string;
    assignee: User;
    assignees: User[];
    milestone: Milestone;
    locked: boolean;
    created_at: string;
    updated_at: string;
    closed_at: string;
    merged_at: string;
    head: {
      label: string;
      ref: string;
      sha: string;
      user: User;
      repo: Repository;
    }
    base: {
      label: string;
      ref: string;
      sha: string;
      user: User
      repo: Repository;
    }
    _links: {
      self: {
        href: string;
      },
      html: {
        href: string;
      },
      issue: {
        href: string;
      },
      comments: {
        href: string;
      },
      review_comments: {
        href: string;
      },
      review_comment: {
        href: string;
      },
      commits: {
        href: string;
      },
      statuses: {
        href: string;
      }
    }
    user: User;
    merge_commit_sha: string;
    merged: boolean;
    mergeable: boolean;
    merged_by: User;
    comments: number;
    commits: number;
    additions: number;
    deletions: number;
    changed_files: number;
  }

  export interface User {
    avatar_url: string;
    events_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    html_url: string;
    id: number;
    login: string;
    organizations_url: string;
    received_events_url: string;
    repos_url: string;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    type: string;
    url: string;
  }

  export interface Organization extends User {}

  export interface Card {
    column_url: string;
    content_url?: string;
    created_at: string;
    id: number;
    note: string;
    updated_at: string;
  }

  export interface Column {
    created_at: string;
    id: number;
    name: string;
    project_url: string;
    updated_at: string;
  }

  export interface Project {
    body: string;
    created_at: string;
    creator: User;
    id: number;
    name: string;
    number: number;
    owner_url: string;
    updated_at: string;
    url: string;
  }
}
