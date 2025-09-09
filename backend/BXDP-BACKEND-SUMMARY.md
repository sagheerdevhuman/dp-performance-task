
# BXDP Backend Summary

This document provides a high-level overview of the BXDP backend codebase.

## Project Hierarchy

```
/mnt/c/Users/rainy/Documents/dev/tkh-stuff/bxdp/backend/
├───.dockerignore
├───.gitignore
├───app.js
├───docker-compose.yaml
├───Dockerfile
├───package-lock.json
├───package.json
├───README.md
├───server.js
├───test-email.js
├───yarn.lock
├───.git/...
├───.github/
│   └───workflows/
│       └───workflow.yml
├───config/
│   ├───auth.js
│   ├───aws.js
│   ├───config.js
│   ├───corsHeader.js
│   ├───email.js
│   └───passwordGenerator.js
├───controllers/
│   ├───authentication.js
│   ├───category.js
│   ├───event_day.js
│   ├───event-profile.js
│   ├───event.js
│   ├───image.js
│   ├───invitation.js
│   ├───organization.js
│   ├───password.js
│   ├───profile.js
│   ├───program.js
│   ├───requirements.js
│   ├───resource.js
│   ├───skill.js
│   ├───tag.js
│   ├───user.js
│   ├───userPromotion.js
│   └───video.js
├───helpers/
│   └───validation.js
├───migrations/
│   ├───...
├───models/
│   ├───...
├───node_modules/...
├───routes/
│   ├───authentication.js
│   ├───category.js
│   ├───event_day.js
│   ├───event.js
│   ├───image.js
│   ├───invitation.js
│   ├───organization.js
│   ├───password.js
│   ├───profile.js
│   ├───program.js
│   ├───requirements.js
│   ├───resource.js
│   ├───skill.js
│   ├───tag.js
│   ├───user.js
│   ├───userPromotion.js
│   └───video.js
└───seeders/
    ├───...
```

## File and Directory Descriptions

### Root Directory

-   `.dockerignore`: Specifies files to ignore when building a Docker image.
-   `.gitignore`: Specifies files to ignore for version control.
-   `app.js`: The main application file. It sets up the Express server, middleware, and API routes.
-   `docker-compose.yaml`: Defines the services, networks, and volumes for a multi-container Docker application.
-   `Dockerfile`: Contains instructions for building a Docker image for the application.
-   `package.json`: Lists the project's dependencies and scripts.
-   `package-lock.json`: Records the exact versions of the project's dependencies.
-   `README.md`: Contains information about the project.
-   `server.js`: Starts the Express server and connects to the database.
-   `test-email.js`: A script for testing email functionality.
-   `yarn.lock`: Records the exact versions of the project's dependencies for Yarn.

### `config/`

-   `auth.js`: Contains authentication-related configuration.
-   `aws.js`: Contains AWS configuration.
-   `config.js`: Contains general configuration for the application.
-   `corsHeader.js`: Contains CORS header configuration.
-   `email.js`: Contains email configuration.
-   `passwordGenerator.js`: Contains a password generator function.

### `controllers/`

This directory contains the application's business logic. Each file corresponds to a specific resource and contains functions for handling requests related to that resource.

### `helpers/`

-   `validation.js`: Contains helper functions for validation.

### `migrations/`

This directory contains the database migration files. Each file represents a change to the database schema.

### `models/`

This directory contains the Sequelize models for the application. Each file defines a database table and its associations.

### `routes/`

This directory contains the application's routes. Each file defines the API endpoints for a specific resource and maps them to the corresponding controller functions.

### `seeders/`

This directory contains the database seeder files. Each file contains data to be inserted into the database for testing or initial setup.
