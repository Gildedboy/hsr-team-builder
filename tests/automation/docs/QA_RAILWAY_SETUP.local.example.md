# Local QA Railway Values

Create `QA_RAILWAY_SETUP.local.md` beside this file for each clone. The local file is ignored by Git.
Populate it through authenticated Railway access or another approved private source.

## Required Values

```text
RAILWAY_PROJECT_ID=<project-id>
QA_ENVIRONMENT=<qa-environment-name>
QA_BRANCH=<qa-branch-name>
QA_BACKEND_SERVICE=<backend-service-name>
QA_FRONTEND_SERVICE=<frontend-service-name>
POSTGRES_SERVICE=<postgres-service-name>
REDIS_SERVICE=<redis-service-name>
QA_FRONTEND_URL=<qa-frontend-url>
QA_BACKEND_URL=<qa-backend-url>
QA_BACKEND_PORT=<backend-target-port>
QA_FRONTEND_PORT=<frontend-target-port>
```

## Local Safety Notes

- Do not store Railway tokens, passwords, JWT secrets, or database/Redis connection strings here.
- Retrieve connection strings only when needed through authenticated Railway commands.
- Confirm every destructive database or Redis command targets QA before executing it.
- Never commit the populated local file or paste its contents into public logs or pull requests.

## Optional Exact Commands

Authorized maintainers may record ready-to-run QA verification and refresh commands in the local file.
Use variable references where possible and include an explicit target check before destructive steps.
