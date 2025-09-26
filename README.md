# SMART FLEET MANAGEMENT

This monorepo

## 🚀 Quickstart

The project is using turborepo and it is organized in different parts :

- 2 apps :

  1. Frontend using [Angular](https://angular.dev/)
  2. Backend using [NestJS](https://nestjs.com/)

- 4 common packages :

  1. @smart-fleet-management/common package : typescript package shared between frontend and bff. It contains types, validation, enums ...
  2. @smart-fleet-management/eslint-config : common eslint configuration
  3. @smart-fleet-management/prettier-config : common prettier configuration
  4. @smart-fleet-management/ts-config : common typescript configuration

  You can run the application in local environment by following these steps :

**0️⃣ Pre-requisites**

To run the project, you need to install :

- pnpm >=9.1.0
- node >=20.11.1
- install turbo globally :

```shell
pnpm add turbo --global
```

**1️⃣ Create a .env.local files :**

In the `apps/backend/` directory

```shell
DB_URL=

JWT_SECRET=
JWT_REFRESH_SECRET=

JWT_ACCESS_TOKEN_EXPIRE=
JWT_REFRESH_TOKEN_EXPIRE=

THROTTLE_TTL=
THROTTLE_LIMIT=
```

**2️⃣ Run in local**
To run the entire application (frontend and bff), run at the root directory :

```shell
pnpm dev
```

_This starts your frontend app and also starts your bff NestJS app_

Frontend url : http://localhost:4200

Backend url : http://localhost:3001

To run only the frontend, run at the root directory :

```shell
pnpm dev:frontend
```

To run only the backend, run at the root directory :

```shell
pnpm dev:backend
```

## Git Branch Naming Convention

- A git branch should start with a category : feature, bugfix, hotfix, docs or test.

- feature is for adding, refactoring or removing a feature

- bugfix is for fixing a bug

- hotfix is for changing code with a temporary solution and/or without following the usual process (usually because of an emergency)

- test is for experimenting outside of an issue/ticket

- test is for add or update documentation

Examples :

```shell
hotfix/no-ref-registration-form-not-working
```

```shell
feature/sfm-create-load-component
```

## Imena app-a ideje:

- Smart fleet management
- FleetXpert management
- FleetXpert

## Slogani ideje:

- Organize it smart for better success
- Smart solutions
- Smart solutions for you business
