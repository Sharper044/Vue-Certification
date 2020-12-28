# STG YouTuber

## An STG Vue Certification Module

This certification project is designed to showcase your ability to program with VueJs and Vue related technologies. These instructions provide the framework and requirements that your project manager needs to see for the completed application. In this project you will be creating a Vue App that will find and show YouTube videos. Since this project is designed to test your understanding of JavaScript fundamentals and general Vue skills, there will be comments and instructions provided to help with non-Vue specific tools. However, the general programming specifics of how to accomplish each step will be left up to you and your coding expertise.

**_IMPORTANT_**

To more clearly showcase your Vue skill, you will need to follow a couple of procedural steps.

1. Before you work on each step of this Vue certification you will need to create a new branch specifically for that step.

1. As you work you will need to commit and push that work to your repository on Bitbucket at least daily while working on this certification. While there is no official time limit on completing this certification we want to see the progress that you have made. (This does not mean that you need to make a commit daily, it simply means that any day that you do work on the certification you should make a commit and push that work by the end of the day.)

1. After each component section is completed you will need to save and push your code AND make a pull request to merge your code to your repository's master branch for each section of your work. (You can merge your code to the master branch immediately but please do not delete the merged branch from your repository!)

1. Be sure to add comments in your code that demonstrate your knowledge of Javascript and Vue fundamentals as listed at the end of this file. This is necessary to show your knowledge of these important concepts and to assist the Certification lead in verifying that you have completed all of the tasks in this Vue certification. You'll probably find that it is easier and more convenient to make these comments as you work on the certification rather than waiting until the work has been completed.

We have provided a few resources to assist you with understanding the fundamentals of Javascript, Vue, Vuex, and Vue-test-utils. You can find these resources in your Resources.md file or online here: [Vue Certification Resources](https://drive.google.com/file/d/1NJJtktC0HGi77yp3o7Gu8UCH13LPF6c6/view?usp=sharing). We also have a vue_certification Slack channel where you can post questions and get help from other Vue certification veterans and our Scripted Lead developers.

**Do not spend a lot of time on styling this project.** We want to see enough styling to know that you understand how to style Vue components in multiple ways but we do not want you to spend a lot of time on styling as styling is not the focus of this Vue certification.

**Please read through the rest of this outline before you write any code**. Some of the latter tasks can be incorporated while working on earlier tasks (e.g. demonstrating basic JavaScript and Vue knowledge and skills), and understanding the scope of the project will help to couple these tasks together.

As you complete tasks, change the numbers boxes to `[x]`. (ex: `1.` -> `[x]`). This will help you track your work through this certification process.

## Initializing App

1. Create a new Vue app (you may use the Vue CLI or Nuxt CLI)

1. Create your `Vue Certification` repository, then initialize your app with git and push your master branch to your new repository.

1. Add a copy of this Readme.MD file to your Vue certification repository at the main level. (You will probably want to copy all of the .md files to your repository for easy reference)

1. **Important** Share your repository with the certification supervisor.

   - In your Bitbucket repository click the ellipsis (`...`) button located in the top right corner of the screen.

   - Click `Share Repository`

   - Add your certification supervisor's username or email address in the `Users` input. Click the `Add` button then click `Write` to give them write access.

1. Create a new branch called `initializing` and checkout this branch. This is where you will begin working on this project.

1. We recommend that you have the following dependencies in your application (or other comparable packages):

   - axios
   - vuex
   - vue-test-utils
   - jest

1. This project will use the YouTube Search API. To work with this api you will need to obtain an API key. Save your api key in a new file for use later in this project (Add a Youtube API readme).

1. Create a header component. Include an element that says "STG YouTuber". This component should be at the top of every page in this app and centered on the page.

**Note:** If you used any CLI to create your Vue app then you may need to remove any code or files that were created through this process that you feel are unnecessary.

1. Save your work and push these changes to your Bitbucket repository.

1. Create a Pull Request (PR) for your code and merge it with the `master` branch (**Do not delete this branch!**).

## Routing

1. Create a new branch called `routing` and checkout this branch.

1. We recommend that you create a folder inside of your `src` folder for components and views (if they do not exist already). All future component and view files should be placed in their respective folders.

1. Set up your application with the following routes:

   - The main page (Also known as the landing page or the home page)
   - The `Search` page
   - The `Favorites` page
   - The `Not Found` page (for any routes not explicitly specified)

1. Add a button, menu, or some other way to navigate between routes.

1. Add the `Not Found` page with text that indicates that the user has selected a route that does not exist. Provide a button or link to redirect the user back to the main page.

1. Save your work and push these changes to your Bitbucket repository.

1. Create a Pull Request (PR) for your code and merge it with the `master` branch (**Do not delete this branch!**).

## Authentication

1. Create a new branch called `authentication` and checkout this branch.

1. On your main page set up a form to take an email and password in order to login.

   - The password should have a way to toggle masking or showing the characters of the password
   - The login button should be disabled until a username and password have been entered
   - The email field should have an email validation check (the login button should remain disabled until a valid email has been entered)
   - The password should be validated to have at least 1 capital letter, 1 lower case letter, 1 number, and is between 6-10 characters in length.

1. When the login button is submitted an authentication method should be called that will simulate an HTTP call, give an appropriate delay (1500 - 3000 ms), and then redirect the user to the search page.

1. Save your work and push these changes to your Bitbucket repository.

1. Create a Pull Request (PR) for your code and merge it with the `master` branch (**Do not delete this branch!**).

## State Management

1. Create a new branch called `state-management` and checkout this branch.

1. Add vuex (or other state management dependency) to your app if you have not already done so. Add any necessary code to complete the setup of your state management dependencies.

1. Update the authentication method to add an `isAuthenticated` value to the app's state.

1. Add a check to the Search and Favorites routes that prevents a user from going to these pages if they have not logged in.

1. Save your work and push these changes to your Bitbucket repository.

1. Create a Pull Request (PR) for your code and merge it with the `master` branch (**Do not delete this branch!**).

## Search

1. Create a new branch called `search` and checkout this branch.

1. The following components will be contained on the search page:

   - Search bar
   - Main view component with youtube video, title and description
   - Sidebar with search results

1. Create a search bar where a user can input any search string. The input should search on either the enter/return key press or by clicking on a search icon at the end of the search input.

1. When a search is initiated an HTTP request should be made to the Youtube API to retrieve the first 10 search results for the submitted query string (You will probably want to use Axios to make this HTTP request).

1. The search results should be displayed in a sidebar (which can be displayed on either side of the screen). The results should display a thumbnail of the video, a video title and a short video description.

1. The main section of the screen should have the first video of the search results displayed. Under the video player should be the video title and the full video description.

1. When any video is selected (clicked) in the results sidebar, that video should then be displayed in the main section with the video's title and description.

1. Save your work and push these changes to your Bitbucket repository.

1. Create a Pull Request (PR) for your code and merge it with the `master` branch (**Do not delete this branch!**).

## Favorites

1. Create a new branch called `favorites` and checkout this branch.

1. This page will have a similar layout to the Search page with the following differences:

   - The search bar will search through (filter) the user's favorite selected videos
   - The sidebar will display the user's favorited videos

1. Update the Search components so that a clickable icon will be displayed when the user's cursor hovers over any video in the sidebar results. When a user clicks on this "favorite" icon that video is added to the user's favorited videos. Repeated clicks on the icon will toggle the video in/out of the user's favorited videos.

1. Add the same icon to the main section on the Search page so that the selected video can be toggled in/out of the user's favorite videos.

1. Add the functionality to filter the user's favorite videos by any query string.

1. Add sorting functionality by video title, date added and video length. Add a component over the sidebar that allows a user to sort by these additional video criteria.

1. Save your work and push these changes to your Bitbucket repository.

1. Create a Pull Request (PR) for your code and merge it with the `master` branch (**Do not delete this branch!**).

## Testing

If you have not been adding tests as you were developing the previous features, then add tests now.

1. Create a new branch called `testing` and checkout this branch.

1. You will add unit tests to your project. For example:

   - Test routing component works correctly
   - Test login component features (email & password validation)
   - Test favorites toggle function
   - Test adding and removing videos from favorites

1. Achieve at least 90% test coverage for your project.

1. Save your work and push these changes to your Bitbucket repository.

1. Create a Pull Request (PR) for your code and merge it with the `master` branch (**Do not delete this branch!**).

## Finish Project

1. If necessary, create a `comments` branch

1. Inside of this branch you will (if you haven't already), add comments to your code to demonstrate your use and knowledge of Javascript fundamentals as well as Vue basics. This should not be hard, but it will help us recognize your knowledge and use of ES6 and ES7 basics. **You do not need to identify every instance**, just 1 to 2 instances to show you know and understand these concepts.

1. In your code you should add comments to demonstrate these **Javascript** fundamentals:

   - Closures
   - `this` keyword
   - Arrow functions
   - Array / Object methods:
     - Map
     - Filter
     - Reduce (if used)
     - Destructuring
     - Spread Operator
   - Promises
   - Blocked-scoped variables `let` and `const`

1. Comments should be proceeded with a # and should look something like this:

```JavaScript
// #closure
function myClosure() = {...}
```

or this:

```JavaScript
/* #map function */
myArray.map(...);
```

1. In your code you should add comments to demonstrate these Vue basics:

   - Reactive data object
   - Components
   - Lifecycle hooks (at least 2-3 different hooks should be commented)
   - Event handling
   - Props
   - Vue directives
   - Lists & Keys
   - Routing
   - Actions, Reducers and the Store
   - Styles (2-3 different methods of applying styles to Vue components)

1. Comments should be styled similar to the Javascript comments.

1. Remove all console.log statements from your code.

1. Push and merge the commented code to your `Master` branch.

1. Email your practice manager that your have completed the certification project and that it is now ready for review!

## Congratulations

You have completed the Vue Certification!