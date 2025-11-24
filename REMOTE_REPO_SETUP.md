# Remote Repository Setup Guide

## Step 1: Initialize Git Repository (if not already done)
```bash
git init
```

## Step 2: Add All Files to Staging
```bash
git add .
```

## Step 3: Create Initial Commit
```bash
git commit -m "Initial commit: Trust Rent application"
```

## Step 4: Add Remote Repository

### Option A: If you have a new/existing remote repository URL
```bash
git remote add origin <YOUR_REPO_URL>
```

Replace `<YOUR_REPO_URL>` with your actual repository URL, for example:
- **GitHub**: `https://github.com/username/repo-name.git` or `git@github.com:username/repo-name.git`
- **GitLab**: `https://gitlab.com/username/repo-name.git` or `git@gitlab.com:username/repo-name.git`
- **Bitbucket**: `https://bitbucket.org/username/repo-name.git` or `git@bitbucket.org:username/repo-name.git`

### Option B: If remote already exists and you want to update it
```bash
git remote set-url origin <YOUR_REPO_URL>
```

## Step 5: Verify Remote Configuration
```bash
git remote -v
```

This should display your remote repository URL.

## Step 6: Push to Remote Repository

### For first push (if remote is empty):
```bash
git push -u origin main
```

Or if your default branch is `master`:
```bash
git push -u origin master
```

### For subsequent pushes:
```bash
git push
```

## Step 7: Check Current Branch Name
```bash
git branch
```

If you need to rename your branch to `main`:
```bash
git branch -M main
```

---

## Quick Setup Script (All-in-One)

If you want to do everything at once, here's a complete sequence:

```bash
# Initialize repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Trust Rent application"

# Add remote (replace with your actual URL)
git remote add origin <YOUR_REPO_URL>

# Rename branch to main (if needed)
git branch -M main

# Push to remote
git push -u origin main
```

---

## Troubleshooting

### If you get "remote origin already exists" error:
```bash
git remote remove origin
git remote add origin <YOUR_REPO_URL>
```

### If you need to change the remote URL later:
```bash
git remote set-url origin <NEW_REPO_URL>
```

### To view current remote configuration:
```bash
git remote -v
```

---

## Example with GitHub

```bash
# Initialize
git init

# Add files
git add .

# Commit
git commit -m "Initial commit: Trust Rent application"

# Add GitHub remote (replace username and repo-name)
git remote add origin https://github.com/username/repo-name.git

# Push
git push -u origin main
```

---

**Note**: Make sure you have:
- Git installed on your system
- Access credentials set up (SSH keys or personal access tokens)
- The remote repository created on your Git hosting platform (GitHub, GitLab, etc.)

