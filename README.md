# GitHub Followers

A web app that lets the user enter a GitHub username and, if it exists, it will show the user handle, the number and a list of followers. When the list is bigger than 30 items, it will show the first 30 and let the user load more each time until the list is over.

## Project setup

Here's a description of how to just run the code. If you want to make modifications or just play with the code, check the next section, ["Running in development environment"](#optional-running-in-development-environment)

### How to run app on your local machine from source code

To run the code you will need `Node.js` with `npm`. We will also use `http-server` to serve the resulting files, but feel free to use any other web server, such as Apache or NGINX.

The first step is to download the source.

```bash
git clone https://github.com/javalisson/github-followers.git
```

Then enter the source code directory.

```bash
cd github-followers
```

Before building the project you need to download the project dependencies.

```bash
npm install
```

Now it's time to build the project.

```bash
npm run build
```

The resulting code will be on `dist` directory and is ready for deployment. You can serve it with `http-server`. Install `http-server`.

```bash
npm install -g http-server
```

Then serve the `dist` directory.

```bash
http-server dist
```

Visit your browser on `http://localhost:8080`. That's it!

### <a href="running-dev-env"></a>(Optional) Running in development environment

If you want to modify the project or just want to play with the code, you can run the development server that comes with Vue CLI. It is a web server and also provides you with Hot-Module-Replacement (HRM), i.e., your modifications are loaded in the browser without a browser refresh. 

Run the development server with

```bash
# the same steps took in the previous section
git clone https://github.com/javalisson/github-followers.git
cd github-followers
npm install
# but now runnig the development server
npm run serve
```

Visit `http://localhost:8080` on your browser. Then modify the source and check how the browser reloads the content.

### (Optional) Running with Docker

This project includes a Dockerfile and two Docker Compose files. They let you build images for production or development. 

The production image uses `NGINX` to serve the `dist` folder. You can build it with 

```bash
docker build --tag=javalisson/github-followers .
```

and then run it with

```bash
docker run -p 80:80 javalisson/github-followers 
```

You can now visit `http://localhost` on your browser.

Alternatively, you can use Docker Compose build and run the production image.

```bash
# build step
docker-compose build
# launch the container
docker-compose up
```

The development image lets you modify the code on your local file system and reflects the changes inside the container. Since the container uses the Vue CLI development server, it gives you the same ability to reload modifications on the browser automatically. In this case, use Docker Compose to build and run the development container.

```bash
# builds and launch the development container
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

Visit `http://localhost:8080` on your browser. Then modify the source and check how the browser reloads the content.

You can also just download the production image from Docker Hub (if the image is not on your local machine it will be automatically downloaded). 

```bash
# run the production image.
docker run -it --rm --name github-followers_1 -p 80:80 javalisson/github-followers:latest
```

## About

### How it works

The web app is built using Pug, Sass, BEM, CSS Grids, Vue.js 2 and Vuex. A page component hosts the search component and a list of results. The page handles the interaction between these components through messages and events. 

The Vuex store contains all the data for the whole web app, and each time a new search is made a new user profile and its list of followers are added to the store, through an interface of actions and mutations defined in the store object.

There's an wrapper for the GitHub API. Each time a new search is made, the search component tells the page which then adds a new user to the store. Then a new component is added to the page with a loading message. This component tells to the store that it needs data about an username. The store uses a wrapper that makes easy to call consume the GitHub API service, then stores the new data, making it available to the component that is listening.

I also versioned my repository using Git and created a Docker image to make the deploy process easier.

### Process and techologies

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

I created a docker-compose configuration file that, in combination with a multi-stage build, lets me use the same base image to develop and to build a image to production. The `dev` image comes with Vue CLI 3 and uses `npm run serve` to make use of Hot Reload. The image for production serves the compiled files from dist directory using NGINX.

### If I had more time... (and why left tests outside my code)

If I had more time to make this better I would certainly try to use TDD. I am not familiarized with `vue-test-utils` and even though I was able to write some tests. But when I added Vuex the complexity of the tests increased, the tests that were working stopped working and I gave up writing any tests at all. I tried to follow [this great tutorial](https://medium.com/magnetis-backstage/working-an-application-in-vue-js-with-tdd-an-extensive-guide-for-people-who-have-time-part-1-3be791dafa2b) in five parts focused on testing Vue.js applications but the time was too short. The author builds an app similar to this one, which retrieves a user profile from GitHub.

I would also invest more time on little details of the UI, such as animations. I would like to animate the loading indicators, the appearing of each follower on the list, the transition between searches and the load of new followers. 

I would like to use Storybook.js to document all the states of the components: when the user submit a blank search, a user with no followers, a user with no more followers to load, a user with more followers to load etc.

### The author

My name is Alisson a.k.a javalisson. I am a developer-interaction-designer-and-teacher. My first contact with Vue.js was two years ago while teaching at IFPR Telêmaco Borba. During the classes we used Vue.js to prototype with code and to create simple front-end data-driven web pages and applications. Now I am focused on diving deeper in the Vue.js ecosystem.

You can find on [GitHub](https://github.com/javalisson), [LinkedIn](https://www.linkedin.com/in/alissonprestes/) and [Facebook](https://www.facebook.com/javalisson)

## Repository, hosted demo and Docker images

The [source code](https://github.com/javalisson/github-followers) is on GitHub

The [hosted demo](https://elated-montalcini-9d20f1.netlify.com/) is on Netlify

The [Docker image](https://hub.docker.com/r/javalisson/github-followers) is on Docker Hub
