---
sidebar_position: 4
---

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
  <img src={"/contributing/getting-started/requests.png"} alt={"Imported Hoppscotch collection"} style={{ width: "100%", height: "auto" }} />
  <img src={"/contributing/getting-started/create-shelf-request.png"} alt={"Create shelf request"} style={{ width: "100%", height: "auto" }} />
</div>
