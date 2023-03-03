# Introduction

When I initiated this coding challenge, I approached it from the the same perspective that I approach my day-to-day work: take everything incrementally so that the mistakes are easy to find that bugs, if any, are easy to squash. In that regard, I followed this basic outline:

1) Read the instructions all the way through to make sure I understand what is being asked of me
2) Research how to create a React & Express app with Docker (#GoogleFu)
3) Start by just focusing on the architecture of a Dockerized app
4) Create a backend
5) Take a break
6) Create a frontend
7) Spin up the containers
8) Drill down into building each component of the form

Below are the steps and approaches I took to tackling this challenge. Enjoy!

## Process

### Research

To start off, since I don't deal with Docker on a day-to-day basis, I had to start with some research on how to create a dockerized React + Express application. JavaScript is what I know best, so that's why I went with an all-JS solution.

My first instinct, of course, was to go to Google and begin searching through various internet articles on how to do so.

After finding out the patterns, I picked the tutorial that I thought was going to save me the most dev time:

- installed `nodemon` to continuously reload the backend so it wasn't necessary to kill the containers and constantly rebuild the server
- used `create-react-app`, which reduces setup & dev time by using a boilerplate app with hot reloading already enabled in the Webpack settings
- had a simple, clear `docker-compose.yml` and simple, clean `Dockerfile`s

### Backend

To start off, I began by setting up a simple Express server `GET` route at `/api` that returned a simple "hello world".

As I went along, I encountered a CORS error, so again I turned to Google and StackOverflow to find the solution, which led me to the `cors` middleware, which I integrated into the application.

As I developed the frontend little-by-little, I added more complexity to the backend.

The next level of complexity came with integrating the MaxMind `geoip2` library, and I used their examples and documentation to get set up quickly.

As I pivoted the frontend to use a button to submit the form data, I knew that next I would need to shift my `GET` route to a `POST` route so that I could send a body of data along with the request.

After some judicious `console.log`ing and reading through the API documentation more, I realized that I needed to use the `.city` method for the `geoip2` library in order to get the longitude & latitude for the dummy IP address I was using.

Finally, after removing the dummy data from the backend, I started receiving a request body from the frontend with IPv4 addresses and returning the longitude and latitude, as expected.

#### Functionality Implemented

- Process `POST` request with IPv4 data
- Query GeoIP2 service for location data
- Return longitude & latitude data in a JSON response

### Frontend

With the front-end, I took a complementary approach, where I built the frontend incrementally with the backend so that I could manage my changes and any bugs that came with them.

At first, even though it was not the way the final app would work, I implemented a simple `useEffect` hook, which is now no longer part of the app, that sent off a `GET` request to the API, to which I set up a proxy in the `package.json` using the `proxy` parameter.

Once I was able to solve the CORS issue I mentioned earlier, I began by adding the `useState` hook that would get & set the data received from the API since I knew I was going to have to display it later.

After I was able to connect the to the `geopip2` service from the backend, I was able to start modeling how the data would look on the frontend. Since I knew I needed the latitude and longitude data returned from the backend, I decided to model the data where `longitude` and `latitude` were keys in the data object that was returned from the API, promting me to use `data.longitude` and `data.latitude` in my JSX, which renders on the condition that there is data at all.

Once I had the data rendering and the backend more tailored to my needs, I started building the form from which I would send the IPv4 addresses. Wiring up React Bootstrap was basically native to me, and so I copied and pasted in a form from an example, modified it for my needs, and created a submit button that gave some user feedback based on when the form was submitting or not (i.e. added another `useState` hook that get and set `isFetching`).

From there, I moved on preventing the default Form submit behavior, wrapped the fetch in an onClick handler that was originally in the `useEffect` I created earlier, and then set a default value on the Form input so that it was easy to test that the app works.

#### Functionality Implemented

- Display a form on page load that has a pre-filled IPv4 value
- Search for any IPv4 value to get it's approximate geo-coordinates
- Loading when IPv4 value is submitted
- Conditional display of Long-Lat values

# Improvements for Future Iterations

Since y'all had mentioned that you had places you wanted to start a conversation when I submit this project, I decided to add some improvement topics, in no particular order, that could have been made on this application better given more extended development time:

## Backend

### 1) TypeScript

While TypeScript is not the end-all-be-all of safety in JavaScript coding, it would be helpful in guiding the application toward a more intelligible, less wild-west-y application. Don't get me wrong, I love JavaScript for the reason that it's quick and easy to develop in, but that has its drawbacks.

Also, it would also just add to the consistency of the app, with its frontend being in TypeScript already.

### 2) Validation

IP Address, whether v4 or v6, follow certain patterns, so it would have been a relatively high-value, low-effort feature to add a check that ensured the frontend was passing valid data to the backend.

### 3) Testing

Every good server has backend testing, so it would have behooved me to set up some Mocha & Chai testing that sent sample data to the endpoint.

I'm sure MaxMind probably does their own validation and error handling, but it never hurts to filter out invalid data and save yourself the third-party costs of bad API requests!

Plus, the application would probably only grow more complex over time, so a good testing framework from the start can help when scaling.

### 4) CI/CD

There are so many other things that could be improved, but if you wanted to take the unit testing into the cloud via a CI/CD pipeline, that's certainly the next evolution of this application.

## Frontend

### 1) More TypeScript

While this application doesn't showcase a bunch of TypeScript, I made my best effort to incorporate an interface. Ideally, as the app grows, there would be more models (interfaces, types) that would help guide a sustainable growth path of the application.

### 2) Componentization

Ideally, I could have broken the app out into two more sub-components - the Form and Lat-Long display. It's mostly a style nitpick, but in the long term, componentization makes the app easier to read by humans, and that saves dev time in the long run.

### 2) More Component / E2E Testing

The frontend as well as the backend are missing more robust testing, but that's nothing a little bit of Jest & React Testing Library couldn't fix.

# Closing

I'd like to take a moment to thank Jaymie & Andrew for the opportunity to interview for this Senior Frontend Engineer position. I believe that I was able to come up with the start of a project that, given proper time investment, could be up to the high standards that you all hold at Censys.io.

Additionally, I'd love a chance to become part of the Censys.io team because the of the immense social impact on the consumer and especially those for which cybersecurity is just an afterthought or something that's taken for granted. I pride myself on working with companies that help the average person - WipeRecord's product led to non-violent criminals getting better housing and job opportunities; ZenBusiness abstracted the legal hassle for small business owners; and Feedtrail was about improving patient outcomes with real-time feedback during hospital visits.

On top of my penchant for companies solving real consumer problems, I've worked exclusively remotely for start-ups my entire career, with only occasional office visits. In my latest role that I've had since February 2022, I've been 100% remote with Warner Bros Discovery, the enterprise company behind brands like HBO, HBOMax, DC Comics, Cartoon Network, and now the Discovery Channel and its brands, with only email, Zoom, and Slack huddles and chats as my main forms of communication. All I need is a clear set of requirements - and I'm humble enough to ask for help when I need it, no matter who I need to ask - to get the job done.

As a self-taught web developer, I've had to be open since day 1 to accepting that I don't know everything and that I need to seek out help or advice from wherever I can get it. And, of course, I'm willing to work hard to get the job done for important deadlines when it comes down to it.

I'm not only a developer, but a manager (WipeRecord + Certified Scrum Master), I have 10+ years experience as a teacher / mentor (WipeRecord, LegalShield, & Third Coast Martial Arts), and I'm a team player (WipeRecord, ZenBusiness, Feedtrail, LegalShield, and Warner Bros Discovery) whose worked on teams as small as 2 to teams as large as 40 engineers reaching millions of customers. I'm looking to grow into a role where I lead a team or mentor junior developers the same way I was mentored at my first role by a brilliant senior dev.

Thank you again, and I hope we talk soon!
