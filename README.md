# My Notes App

> WebApp to organize text notes in a visual interface, similar to a notebook/whiteboard

## Index
    
1. [Introduction](#1-introduction)
2. [Objectives](#2-objectives)
3. [Installing](#3-installing)
4. [Deploy](#4-deploy)
5. [Usage](#5-using)

## 1. Introduction

This repository contains the code for the front end of a note taking app (Possibly the backend in the future too).

The app allows the user to create simple text notes, edit and delete them. Reorganizing notes should be a breeze.

### 1.1 Pre requirements
For you to run this repo, you need at least:
- The most recent version of `node.js` installed on your machine
- React 18.2.0 (or compatible versions)
- An react project already created

## 2. Objectives
⚠ = Essential
### Content
- [x] ⚠ Show All Notes
- [x] Show Rules
- [x] Show Title
### Note Editing
- [x] ⚠ Create Note
- [x] Edit Note
- [x] ⚠ Delete Note
### Interactivity
- [x] Button to Create Notes
- [x] Edit notes by clicking them
- [x] Button to Delete Notes
- [x] Reorganize note order with arrow button/areas
### Layout
- [x] Layout Elements (Vertical and Horizontal containers)
- [x] Note Elements (Header, Body and Container)
- [x] Rule List Elements (Text List)
- [x] Website Banner Elements (Title)
- [x] Interactivity Elements (Floating Circle container)
- [x] Note list to the left
- [x] Note Style (Like post it notes)
    - [x] Note Background
    - [x] Note Buttons
    - [x] Note Size
    - [x] Note Resize 
- [x] Rules to the Right
- [ ] Fonts and Colors
- [x] ⚠ Mobile Layout
- [x] Responsive Cursors

## 3. Installing
To install this app to test or develop, you need to clone this repository.

You need to have a react project already created for this, since this repo only contains the code that was modified, but not packages and other default react project files. If you do not have one already, see [this tutorial](https://create-react-app.dev). I created with create-react-app and to prevent possible errors, i would recommend doing the same.

If you just want to use the app, clone it right away: 

`git clone https://github.com/PorthoGamesBR/my-notes.git`

### 3.1 Contributing
If you want to develop/contribute, clone this repo

`git clone https://github.com/PorthoGamesBR/my-notes.git`

Then do a fork for your personal repo

<img src="https://docs.github.com/assets/cb-79331/mw-1440/images/help/repository/fork_button.webp" alt="Image of Fork on Github">

Add your fork as a remote (replace the arguments with your username and your fork url)

```git remote add your-github-username fork-url```

And last but not least, make a branch to develop the feature you are working on. Examples:

`git checkout -b "feature/note-color-change"`
`git checkout -b "bugfix/spelling-mistake-readme"`

Just remember to push to your fork in the edit branch. Trying to push without this will result in a error

`git push your-github-username branch-name`

Then in github, when you make a pull request, remember to make it from the branch, that way i can test your code and implement it more easily.

## 4. Deploy
For development purposes,in the project directory, you can run:
    `npm start`
That runs the app in the development mode in [http://localhost:3000](http://localhost:3000).

The page will reload when you make changes.\
You may also see any lint errors in the console.

For testing purposes, in the project directory, you can run:
`npm test`
That launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

When building for deployment on the server, run:
`npm run build`
That builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### 4.1 Express Server
For the purpose of making this app "batteries included", i made a simple node server with the Express package that is in the /server directory. The idea of this project it is to be server independent, so it can run with any server you want to (that runs React), but i added this for people who just want to use the app without configuring a server and have it save their notes.

The Express server saves the notes into a .json file, so it's not exactly secure, beware of that. Not that i recommend saving something potentially dangerous in this notes, but if you plan to use this app in a public network, i highly recomend using a more robust server with security measures.

Once you build the app, you need to use two commands:

- In the server folder, run `npm install`. This will install the dependecies of the server

- In the root folder of this project, run `node server`. The server will run with the files on the build folder.

Just a note: I plan to add this server directly in the app, as a .js file, so it does not need to install dependecies separately from the app. But i do not guarantee i will do it, so if you find this idea interesting, you can clone this repo and implement it, and push to this repo. I will not open a issue for it but i will accept if someone wants to do it.

- If i run the command inside the server folder...
...or in any other folder, it's gonna raise an error and shutdown, since it uses local paths. For it to run correctly, run it in the root folder of this project.

## 5. Using

No secret sauce here: 
- Click the pencil icon and a new note should appear
- Click the note text to edit it, press enter to save and shift+enter to add a line break
- Click the red X button to delete a note

For now, that´s all.
