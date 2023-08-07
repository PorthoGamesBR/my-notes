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

## 2. Objectives
⚠ = Essential
### Content
- [x] ⚠ Show All Notes
- [ ] Show Rules
- [ ] Show Title
### Note Editing
- [x] ⚠ Create Note
- [x] Edit Note
- [x] ⚠ Delete Note
### Interactivity
- [x] Button to Create Notes
- [x] Edit notes by clicking them
- [x] Button to Delete Notes
- [ ] Reorganize note order with arrow button/areas
### Layout
- [x] Layout Elements (Vertical and Horizontal containers)
- [x] Note Elements (Header, Body and Container)
- [ ] Rule List Elements (Text List)
- [ ] Website Banner Elements (Title)
- [ ] Interactivity Elements (Floating Circle container)
- [x] Note list to the left
- [ ] Note Style (Like post it notes)
    - [x] Note Background
    - [x] Note Buttons
    - [ ] Note Size
    - [ ] Note Resize 
- [ ] Rules to the Right
- [ ] Fonts and Colors
- [ ] ⚠ Mobile Layout
- [ ] Responsive Cursors

## 3. Installing
To install this app to test or develop, you need to clone this repository.

If you just want to use the app, clone it right away: 

`git clone https://github.com/PorthoGamesBR/my-notes.git`

If you want to develop/contribute, do a fork firs

<img src="https://docs.github.com/assets/cb-79331/mw-1440/images/help/repository/fork_button.webp" alt="Image of Fork on Github">

Then do the clone on your personal repo

`git clone https://github.com/PorthoGamesBR/my-notes.git`

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

## 5. Using

No secret sauce here: 
- Click the pencil icon and a new note should appear
- Click the note text to edit it, press enter to save and shift+enter to add a line break
- Click the red X button to delete a note

For now, that´s all.