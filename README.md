# RpsGameSkin

This project is a Rock-Paper-Scissors game application built with Angular version 17.3.3. It uses Server-Side Rendering (SSR) and can connect to a server via a REST API. The application is also prepared to use JWT (JSON Web Tokens) for authentication.

## Project Structure

The project is structured as follows:

- `.angular/`: Contains Angular's cache files.
- `.editorconfig`: Defines coding styles for different editors and IDEs.
- `.gitignore`: Specifies the files to be ignored by Git.
- `.prettierignore`: Specifies the files to be ignored by Prettier.
- `.prettierrc`: Contains configuration for Prettier.
- `.vscode/`: Contains settings for Visual Studio Code.
- `angular.json`: Contains Angular CLI configuration.
- `package.json`: Lists the project dependencies and scripts.
- `README.md`: Provides an overview of the project.
- `server.ts`: The entry point for the server-side rendering (SSR).
- `src/`: Contains the source code of the application.
  - `app/`: Contains the main application logic.
    - `app.component.*`: The main application component.
    - `app.config.*.ts`: Contains the application configuration.
    - `app.routes.ts`: Defines the application routes.
    - `auth/`: Contains authentication-related code.
    - `core/`: Contains core functionality.
    - `game/`: Contains game-related code.
  - `assets/`: Contains static assets like images.
  - `environments/`: Contains environment-specific configuration.
  - `index.html`: The main HTML page.
  - `main.*.ts`: The entry points for the application.
  - `styles.scss`: Contains global styles.
- `tsconfig.*.json`: Contains TypeScript configuration.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).