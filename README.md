# GitHub Followers

## About

### What 

This web page lets the user enter a GitHub username and, if it exists, it will show the user handle, the number and a list of followers. When the list is bigger than 30 items, it will show the first 30 and let the user load more each time until the list is over.

### How

The web page is built using Pug, Sass, BEM, CSS Grids, Vue.js 2 and Vuex. A page component hosts the search component and a list of results. The page handles the interaction between these components through messages and events. 

The Vuex store contains all the data for the whole web page, and each time a new search is made a new user profile and its list of followers are added to the store, through an interface of actions and mutations defined in the store object.

There's an wrapper for the GitHub API. Each time a new search is made, the search component tells the page which then adds a new user to the store. Then a new component is added to the page with a loading message. This component tells to the store that it needs data about an username. The store uses a wrapper that makes easy to call consume the GitHub API service, then stores the new data, making it available to the component that is listening.

I also versioned my repository using Git and created a Docker image to make the deploy process easier.

### Why

Here I tell a little about my technological and architectural choices.

#### Sketches

The first thing I did was to use pen and paper to generate some ideias. After sketching in paper I decided to try some sketches using CodePen.io, which allow me to start a project right away, without having to create lots of boilerplate code. Here are some sketches I made that started really simple and evolved to be close to the final visual and techinical solution: https://codepen.io/javalisson/pen/PVrMoX https://codepen.io/javalisson/pen/ZwZNaZ 

#### Pug

I find it concise and easy to refactor when I need to. Part of the code written for a element can be copied as a Sass/CSS selector.

#### Sass, BEM and CSS Grids

Sass is also concise and let me write DRY code. I am still learning but I already am a big fan!

Writing components using BEM requires lots of classes, but the result is easy to understand, to style and to modify.

CSS Grids let me create beautiful layouts without having to wrangle with tricky CSS hacks. And they are responsive :wink:

#### Vue.js and Vuex

Vue.js became my choice because it's powerful, simple, similar to the combination "HTML + CSS + JS", easy to read and easy to teach. I have used frameworks that abstract web technologies and had a hard time when I needed to customize things. Vue.js makes it easy to collaborate with professionals that are familiar with the web.

I decided to give Vuex a try after studing it for a while. It was my first project using Vuex and that slowed me a bit. In the end I had a better understanding of the architecture and things connect when using Vuex, I consider it made things easier. I will certainly use it again.

#### Docker and Docker Compose

Docker makes me confident because I know that my code is working on a reproducible environment and I won't spend hours trying to make my code run on a different machine.

I created a docker-compose configuration file that, in combination with a multi-stage build, lets me use the same base image to develop and to build a image to production. The `dev` image comes with Vue CLI 3 and uses `npm run serve` to make use of Hot Reload. The image for production serves the compiled files from dist folder using NGINX.

### If I had more time... (and why left tests outside my code)

If I had more time to make this better I would certainly try to use TDD. I am not familiarized with `vue-test-utils` and even though I was able to write some tests. But when I added Vuex the complexity of the tests increased, the tests that were working stopped working and I gave up writing any tests at all. I tried to follow [this great tutorial](https://medium.com/magnetis-backstage/working-an-application-in-vue-js-with-tdd-an-extensive-guide-for-people-who-have-time-part-1-3be791dafa2b) in five parts focused on testing Vue.js applications but the time was too short. The author builds an app similar to this one, which retrieves a user profile from GitHub.

I would also invest more time on little details of the UI, such as animations. I would like to animate the loading indicators, the appearing of each follower on the list, the transition between searches and the load of new followers. 

I would like to use Storybook.js to document all the states of the components: when the user submit a blank search, a user with no followers, a user with no more followers to load, a user with more followers to load etc.

### Who

My name is Alisson a.k.a javalisson. I am a developer-interaction-designer-and-teacher. My first contact with Vue.js was two years ago while teaching at IFPR Telêmaco Borba. During the classes we used Vue.js to prototype with code and to create simple front-end data-driven web pages and applications. Now I am focused on diving deeper in the Vue.js ecosystem.

You can find on [GitHub](https://github.com/javalisson), [LinkedIn](https://www.linkedin.com/in/alissonprestes/) and [Facebook](https://www.facebook.com/javalisson)

## Repository, hosted demo and Docker image

The [source code](https://github.com/javalisson/github-followers) is on GitHub

The [hosted demo](https://elated-montalcini-9d20f1.netlify.com/) is on Netlify

The [Docker image](https://hub.docker.com/r/javalisson/github-followers) is on Docker Hub

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
