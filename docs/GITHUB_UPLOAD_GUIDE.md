# How to Upload Project to GitHub

## Step 1: Add and Commit Your Files

Run these commands in your terminal (PowerShell) from the project root:

```powershell
# Add all files to git
git add .

# Make your first commit
git commit -m "Initial commit: SmartBucket project"
```

## Step 2: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `Project_SmartBucket` (or any name you prefer)
   - **Description**: (optional) e.g., "SmartBucket - Smart shopping and recipe management application"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (since you already have these)
5. Click **"Create repository"**

## Step 3: Connect Your Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these commands (replace `YOUR_USERNAME` with your GitHub username):

```powershell
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/Project_SmartBucket.git

# Rename the default branch to main (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

## Alternative: Using SSH (if you have SSH keys set up)

If you prefer SSH instead of HTTPS:

```powershell
git remote add origin git@github.com:YOUR_USERNAME/Project_SmartBucket.git
git branch -M main
git push -u origin main
```

## Step 4: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files uploaded
3. Your project is now on GitHub! 🎉

## Troubleshooting

### If you get authentication errors:
- For HTTPS: GitHub may prompt for username and password. Use a **Personal Access Token** instead of your password
- To create a token: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token
- For SSH: Make sure you have SSH keys set up in your GitHub account

### If you need to update your code later:
```powershell
git add .
git commit -m "Your commit message"
git push
```

### If you want to check your current status:
```powershell
git status
```

## Important Notes

- The `.gitignore` file has been created to exclude:
  - `node_modules/` folders
  - `.env` files (sensitive environment variables)
  - Build outputs and temporary files
  - IDE configuration files

- **Never commit**:
  - `.env` files with real credentials
  - `node_modules/` folders
  - Personal API keys or secrets

- The `env.example.txt` files are safe to commit as they don't contain real credentials.

