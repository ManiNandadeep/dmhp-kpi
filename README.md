# DmhpKpi - Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# DmhpKpi - Backend 

## Steps to run this project:

- Populate the database from the SQL dump. Also, populate the tables' stored procedures
- Change the environment variables in `.env`
- To install all dependencies, run `npm install` in the main directory
- `cd Backend ; nodemon app`
- Make API calls as per the files in ```sample-json-calls``` subdirectory

# Spring Boot Backend

## Steps to run this project:

- Install all maven dependencies 
- Configure `application.properties`
- Populate the tables and stored procedures
- Build, and run the project on IntelliJ for Java EE Developers


## MySQL Setup  

In your MySQL console, create a new user `root` with all privileges, as follows:

- `CREATE USER 'root'@'localhost' IDENTIFIED BY 'insert-password-here';`
- `GRANT ALL PRIVILEGES ON * . * TO 'newuser'@'localhost';`
- `FLUSH PRIVILEGES`;

Then, populate the database from the SQL dump, and change the corresponding environment variables in code.