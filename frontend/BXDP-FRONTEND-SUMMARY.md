# BXDP Frontend Summary

This document provides a high-level overview of the BXDP frontend codebase.

## Project Overview

The BXDP frontend is a React application built with Vite. It uses Redux for state management and Tailwind CSS for styling. The project is containerized using Docker.

## Project Structure

```
/mnt/c/Users/rainy/Documents/dev/tkh-stuff/bxdp/frontend/
├───.dockerignore
├───.DS_Store
├───.env
├───.env.example
├───.gitignore
├───docker-compose.yaml
├───Dockerfile
├───index.html
├───package-lock.json
├───package.json
├───postcss.config.cjs
├───README.md
├───tailwind.config.cjs
├───vite.config.js
├───yarn.lock
├───.git/...
├───.github/
│   └───workflows/
│       └───workflow.yml
├───ngnix/
│   └───nginx.conf
├───public/
│   └───vite.svg
└───src/
    ├───.DS_Store
    ├───App.css
    ├───App.jsx
    ├───index.css
    ├───main.jsx
    ├───assets/
    ├───components/
    ├───redux/
    ├───routings/
    ├───screens/
    ├───services/
    └───utilities/
```

### Top-Level Directory

-   **`.dockerignore`**: Specifies files to ignore when building the Docker image.
-   **`.env`**: Environment variables for local development.
-   **`.env.example`**: Example environment variables.
-   **`.gitignore`**: Specifies files to ignore for version control.
-   **`docker-compose.yaml`**: Defines the services, networks, and volumes for the Docker application.
-   **`Dockerfile`**: Contains instructions to build the Docker image for the frontend.
-   **`index.html`**: The entry point for the application.
-   **`package.json`**: Defines the project's dependencies and scripts.
-   **`postcss.config.cjs`**: Configuration for PostCSS.
-   **`README.md`**: Project documentation.
-   **`tailwind.config.cjs`**: Configuration for Tailwind CSS.
-   **`vite.config.js`**: Configuration for Vite.
-   **`.github/`**: Contains GitHub Actions workflows.
-   **`ngnix/`**: Contains the Nginx configuration for the production server.
-   **`public/`**: Contains static assets that are not processed by Vite.
-   **`src/`**: The main source code for the application.

### `src` Directory

-   **`App.jsx`**: The main application component.
-   **`main.jsx`**: The entry point for the React application.
-   **`assets/`**: Contains static assets like images and svgs.
-   **`components/`**: Contains reusable UI components.
-   **`redux/`**: Contains the Redux store, slices, and actions.
-   **`routings/`**: Contains the application's routing configuration.
-   **`screens/`**: Contains the application's pages or screens.
-   **`services/`**: Contains the application's API services.
-   **`utilities/`**: Contains utility functions.

### `src/components` Directory

-   **`orgComponents/`**: Components specific to the organization view.
-   **`sharedComponents/`**: Components that are shared across the application.
-   **`staffComponents/`**: Components specific to the staff view.
-   **`utls/`**: Utility components.

### `src/redux` Directory

-   **`store.jsx`**: The Redux store configuration.
-   **`bxdp/`**: Redux slice for BXDP related state.
-   **`categories/`**: Redux slice for categories.
-   **`eventDays/`**: Redux slice for event days.
-   **`events/`**: Redux slice for events.
-   **`image/`**: Redux slice for images.
-   **`org/`**: Redux slice for organizations.
-   **`programs/`**: Redux slice for programs.
-   **`requirements/`**: Redux slice for requirements.
-   **`resources/`**: Redux slice for resources.
-   **`skills/`**: Redux slice for skills.
-   **`user/`**: Redux slice for user authentication and data.
-   **`videos/`**: Redux slice for videos.

### `src/routings` Directory

-   **`DefaultRoute.jsx`**: The default route for the application.
-   **`EventRoute.jsx`**: Routes related to events.
-   **`OrgRoute.jsx`**: Routes related to organizations.
-   **`PartnerRoute.jsx`**: Routes related to partners.
-   **`ProgramRoute.jsx`**: Routes related to programs.
-   **`ResetPassRoute.jsx`**: Route for resetting password.
-   **`ResetRoute.jsx`**: Route for password reset.
-   **`StaffRoute.jsx`**: Routes for staff members.
-   **`UserRoute.jsx`**: Routes for users.

### `src/screens` Directory

-   **`orgScreens/`**: Screens for the organization view.
-   **`sharedScreens/`**: Screens that are shared across the application.
-   **`staffScreens/`**: Screens for the staff view.

### `src/services` Directory

-   **`bxdp/`**: API services for BXDP.
-   **`categories/`**: API services for categories.
-   **`eventDays/`**: API services for event days.
-   **`events/`**: API services for events.
-   **`image/`**: API services for images.
-   **`org/`**: API services for organizations.
-   **`programs/`**: API services for programs.
-   **`requirements/`**: API services for requirements.
-   **`resources/`**: API services for resources.
-   **`skills/`**: API services for skills.
-   **`user/`**: API services for user authentication.
-   **`video/`**: API services for videos.

### `src/utilities` Directory

-   **`apiErrorHandler.jsx`**: Handles API errors.
-   **`data.json`**: Contains static data.
-   **`data.jsx`**: Contains static data.
-   **`setAuthToken.jsx`**: Sets the authorization token for API requests.
