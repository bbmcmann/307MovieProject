# The Bananalyst 🍌🎬

A banana themed movie review site. View popular movies, suggested movies, and reviews for any movie written by fellow Bananlysts. View the live site [here](https://white-glacier-0bbe79d1e-65.westus2.2.azurestaticapps.net/)

## Table of Contents

- [Overview](#overview)
  - [Summary](#summary)
  - [Team](#team)
- [Getting Started](#getting-started)
  - [Setup](#setup)
  - [Project Structure](#project-structure)
- [Contributing](#contributing)
  - [Making Changes](#making-changes)
  - [Committing Changes](#commiting-changes)
  - [Making Pull Requests](#making-pull-requests)
- [Documents and Artifacts](#documents-and-artifacts)

## Overview

### Summary

This project was developed as part of CSC 307 Intro to Software Engineering instructed by Professor Bruno da Silva. Technologies used in this project are React on the frontend, Node.js and Express on the backend, and MongoDB for the database. Development took place over three sprints (two weeks each). We went through the entire software development lifecycle from planning and design to implementation and deployment. We also implemented CI/CD with Github Actions and Azure.

### Team

The Bananalyst team consists of 4 Cal Poly students. The team members are listed below:

- [David Hernandez](https://www.linkedin.com/in/hernandez-david/)
- [Jonathan Laksana](https://www.linkedin.com/in/jlaksana/)
- [Ben McMann](https://www.linkedin.com/in/benjamin-mcmann-33b2421b8/)
- [Rhys Pulling](https://www.linkedin.com/in/rhys-pulling-25470a22b/)

_Why are bananas never lonely? Because they hand around in bunches._

## Getting Started

Here is all you need to know to setup this repo on your local machine to start developing!

### Setup

1. Clone this repository `git clone https://github.com/bbmcmann/307MovieProject.git`
2. Change directories into the `/frontend` subfolder
3. Run `npm i` in the frontend subfolder of the repository
4. Change directories to `/backend` subfolder
5. Run `npm i` in the backend subfolder of the repository
6. Install IDE Extensions
   - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
7. Enable format on save in your IDE
   1. Click the settings button in the bottom left
   2. Search "formatter" and set your default formatter to Prettier
   3. Search "format on save" and click the checkbox
8. Reach out to an existing developer for environment variables
9. Verify by running `npm start` in the frontend folder and `npm run dev` in the backend folder

### Project Structure

- [.github](./github/) Github Actions CI/CD
- [backend](./backend/) Root folder for backend API - `index.js` Top level file
  - [models](./backend/models/) Schema definitions for data
  - [routes](./backend/routes/) Express endpoint definitions and controllers
  - [tests](./backend/tests/) All test cases for functions
- [frontend](./frontend/) Root folder for React app
  - [public](./frontend/public/) Assets for frontend
  - [src](./frontend/src/) Frontend code - `App.js` Top level React component
    - [components](./frontend/src/components/) All React components
    - [static](./frontend/src/static/) Assets for frontend
    - [styles](./frontend/src/styles/) All CSS

## Contributing

Here are all of the steps you should follow whenever contributing to this repo!

### Making Changes

1. Before you start making changes, always make sure you're on the main branch, then `git pull` and `npm i` on both frontend and backend to make sure your code is up to date
2. Create a branch `git checkout -b <name-of-branch>`
3. Make changes to the code
4. `npm run test` in the backend and frontend subfolder to ensure code standards. (running `npx prettier --write .` will fix most of the styling errors)

### Commiting Changes

When interacting with Git/GitHub, feel free to use the command line, VSCode extension, or Github desktop. These steps assume you have already made a branch using `git checkout -b <branch-name>` and you have made all neccessary code changes for the provided task.

1. View diffs of each file you changed using the VSCode Github extension (3rd icon on far left bar of VSCode) or GitHub Desktop
2. `git add .` (to stage all files) or `git add <file-name>` (to stage specific file)
3. `git commit -m " <description>"` or
   `git commit` to get a message prompt
4. `git push -u origin <name-of-branch>`
5. Check the [Github Actions](https://github.com/bbmcmann/307MovieProject/actions) page to ensure all workflows are successful

### Making Pull Requests

1. Go to the Pull Requests tab on [github.com](https://github.com/bbmcmann/307MovieProject/pulls)
2. Find your PR, and provide a description of your change, steps to test it, and any other notes.
3. Link your PR to the corresponding **Issue**
4. Request a reviewer to check your code
5. Once approved, your code is ready to be merged in 🎉

## Documents and Artifacts

- [UI Prototype on Figma](https://www.figma.com/file/L8jBZsx1cAFQSjShkGWd6i/Movie-Project?node-id=0%3A1)
- [Class Diagram](https://drive.google.com/file/d/15jEi9DxDtci87fFSzrfHVOTYW8_m95v5/view?usp=sharing)
- [Sequence Diagram](https://drive.google.com/file/d/1P3RCt0tJhiephHuyNuNjHkO5_wGm8W78/view?usp=sharing)

_Why did the banana go out with a prune? Because he couldn’t find a date._
