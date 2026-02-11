---
sidebar_position: 4
---

import useBaseUrl from "@docusaurus/useBaseUrl";

# Infrastructure

Our app's infrastructure is largely explained by below graphs:

<img src={useBaseUrl("/design/infrastructure/infrastructure-2.png")} alt={"Project infrastructure (2)"} style={{ maxWidth: "75%", height: "auto" }} />

<img src={useBaseUrl("/design/infrastructure/infrastructure-1.png")} alt={"Project infrastructure (1)"} style={{ maxWidth: "75%", height: "auto" }} />

The app itself is stateless, so it requires input from a separate process when it comes to triggering periodical tasks. This is what Scheduler does. It can be configured from a third party (for example when hosting on Vercel), however our Docker image includes it so that the whole container stays independent (as the Scheduler is crucial for our app's functioning). This is why for clarity reasons we've decided to include it as both a separate service and broader part of the app respectively on our graphs.
