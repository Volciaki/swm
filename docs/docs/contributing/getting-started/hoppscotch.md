---
sidebar_position: 5
---

import useBaseUrl from "@docusaurus/useBaseUrl";

# Hoppscotch

While downloading dependencies you might've noticed the `hoppscotch.json` file in the root of our repository. This file contains definitions for all API endpoints, allowing you to easily send requests to it. It comes in handy when you're working on a new backend feature that doesn't have a frontend yet.

To begin using it you should download Hoppscotch (well, duh) and use the "Import / Export" button on the rightmost side of the UI. From then on you'll be able to use all the predefined requests:

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1rem",
    maxWidth: "100vw",
  }}
>
  <img src={useBaseUrl("/contributing/getting-started/hoppscotch/requests.png")} alt={"Imported Hoppscotch collection"} style={{ width: "100%", height: "auto" }} />
  <img src={useBaseUrl("/contributing/getting-started/hoppscotch/create-shelf-request.png")} alt={"Create shelf request"} style={{ width: "100%", height: "auto" }} />
</div>

## Authentication

Our API expects authentication tokens to be defined via a cookie with a name of `$AUTHENTICATION_COOKIE_NAME`. By default that environment variable is set to: `development-authentication-cookie`. If you'd want to use Hoppscotch to access endpoints requiring authentication, please follow below steps.

Assuming that you have already created an user, as instruced in the <a href={useBaseUrl("/contributing/getting-started/adding-your-first-user")}>previous page</a>, you should navigate to the `identity.login` request:

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1rem",
    maxWidth: "100vw",
  }}
>
  <img src={useBaseUrl("/contributing/getting-started/hoppscotch/login-request.png")} alt={"Using the login request"} style={{ width: "100%", height: "auto" }} />
  <img src={useBaseUrl("/contributing/getting-started/hoppscotch/login-request-tree.png")} alt={"Login request tree location"} style={{ width: "100%", height: "auto" }} />
</div>

<br />

Fill out the data you've previously entered, and press "Send". You'll get a response like this:

<img src={useBaseUrl("/contributing/getting-started/hoppscotch/authentication-response.png")} alt={"Authentication response"} style={{ width: "100%", height: "auto" }} />

This `authenticationToken` should then later be used in your headers when sending requests. We can configure Hoppscotch to do that by:

1. Right-clicking the "primus-inter-pares" folder in your tree.
2. Selecting "properties".
3. Adding a new header with those fields:
- Key: `Cookie`,
- Value: `development-authentication-cookie=<your_authentication_token>`

<img src={useBaseUrl("/contributing/getting-started/hoppscotch/collection-properties.png")} alt={"Adding an authentication header"} style={{ maxWidth: "100%", height: "auto", position: "relative", left: "50%", transform: "translateX(-50%)" }} />

Now whichever request you use, your authentication token will be present.
