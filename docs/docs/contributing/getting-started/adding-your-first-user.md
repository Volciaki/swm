---
sidebar_position: 4
---

import useBaseUrl from "@docusaurus/useBaseUrl";

# Adding your first user

To fully use the website, you'll need an admin user. You can easily add one via database UI. Visit [localhost:3001](http://localhost:3001), and navigate to the `users` table > "New item". You'll see something like this:

<img src={useBaseUrl("/contributing/getting-started/adding-your-first-user/adding-user.png")} alt={"Empty database add user form"} style={{ maxWidth: "75%", height: "auto", position: "relative", left: "50%", transform: "translateX(-50%)" }} />

Tick `is_admin` and enter arbitrary values into `name` and `email` (albeit `email` needs to be a valid email address). Then enter a [random UUID](https://www.uuidgenerator.net/) into `uuid` (for example `be652059-06a8-4eb7-ad4b-87cb1bd2b258`) and your password's hash into `password_hash`. It can be quickly generated [here](https://bcrypt-generator.com/). We're using *12* salting rounds. At the end you should have something like this:

<img src={useBaseUrl("/contributing/getting-started/adding-your-first-user/adding-user-example.png")} alt={"Filled database add user form"} style={{ maxWidth: "75%", height: "auto", position: "relative", left: "50%", transform: "translateX(-50%)" }} />

Press "Save" and head over to [localhost:3000/login](http://localhost:3000/login). You should now be able to login and access the whole site:

<img src={useBaseUrl("/contributing/getting-started/adding-your-first-user/logging-in.png")} alt={"Using the login form"} style={{ maxWidth: "75%", height: "auto", position: "relative", left: "50%", transform: "translateX(-50%)" }} />

<img src={useBaseUrl("/contributing/getting-started/adding-your-first-user/logged-in.png")} alt={"Logged in website preview"} style={{ maxWidth: "75%", height: "auto", position: "relative", left: "50%", transform: "translateX(-50%)" }} />
