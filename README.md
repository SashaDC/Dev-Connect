# Boilerplate: Fullstack with Sass

## Setup

### What's included

This repo includes:

* a single, simple API endpoint (`/api/v1/fruits`)
* frontend routing via react-router
* an auth0 setup waiting to be configured
* an example database module (`server/db/fruits.js`)
* an API client module (`client/apis/fruits.js`)
* configuration for Vitest and testing library
* configuration for server-side debugging in VS Code
* configuration for preprocessing css with tailwind support

### Installation

/DevConnect
├── client/
│   ├── apis/
│   │   ├── posts.ts       # Fetches/creates posts
│   │   ├── users.ts       # Fetches user profile data
│   │   └── groups.ts       # for groups, group posts
│   │
│   ├── components/
│   │   ├── App.tsx           
│   │   ├── HomeFeed.tsx      # Main component for the /home route
│   │   ├── Layout.tsx        # Contains Navbar and renders pages 
│   │   ├── Login.tsx         # need to aadd auth0 if we are using it
│   │   ├── Navbar.tsx        # Navigation bar (Home, Profile, Logout)
│   │   ├── Post.tsx          # Renders a single post component
│   │   ├── Profile.tsx       # Main component for /:id
│   │   ├── ProtectedRoute.tsx # if we need it - for routes protected by Auth0
│   │   ├── GroupsList.tsx   # Component for viewing all joined/public groups
│   │   ├── GroupDetail.tsx   # Component for viewing a specific group's page
│   │   ├── NewsFeed.tsx      # Component to display the external news feed
│   │   └── WeatherWidget.tsx # Component to display weather info
│   │
│   ├── hooks/              
│   │   ├── useFetchPosts.ts   # example e.g. manages state for fetching and displaying to the main feed
│   │   ├── useAuth.ts         # for Auth0 status?
│   │   ├── useCreatePost.ts   # post creation form/API
│   │   └── useFetchGroups.ts  # fetching group info
│   │
│   ├── models/                        
│   │   ├── posts.ts          #  Post, Users etc.. (Will need to include User and Group models here)
│   │   └── groups.ts         # (NEW) Group and GroupMember TypeScript interfaces
│   │
│   ├── styles/                       
│   │   ├── main.css          # tailwind 
│   ├── routes.tsx          
│   └── index.tsx        
│
├── server/
│   ├── db/
│   │   ├── knexfile.ts
│   │   ├── migrations/
│   │   │   ├── 20230101_users.ts  
│   │   │   ├── 20230102_posts.ts  
│   │   │   └── 20230103_groups.ts    
│   │   ├── seeds/
│   │   │   ├── users.ts           
│   │   │   ├── posts.ts           
│   │   │   └── groups.ts         
│   │   ├── posts.ts
│   │   ├── users.ts
│   │   ├── groups.ts         
│   │   ├── knexfile.js       
│   │   └── connection.ts
│   │
│   ├── routes/
│   │   ├── posts.ts
│   │   ├── users.ts
│   │   ├── groups.ts         
│   │   └── external.ts       # for the news feed and weather? could seperate if needed. 
│   │
│   ├── server.ts
│   └── tsconfig.json
│
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── README.md
└── vitest.config.ts

#### **From the Github UI**

See the instructions [here](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) to use Github's feature to create a new repo from a template.

```
git clone [your-project-ssh-address]
cd [your-project-name]
npm install # to install dependencies
npm run dev # to start the dev server
```

You can find the server running on [http://localhost:3000](http://localhost:3000) and the client running on [http://localhost:5173](http://localhost:5173).

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=boilerplate-fullstack)
