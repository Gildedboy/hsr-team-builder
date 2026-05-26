# Refactor Codegen Prompt

Refactor raw Playwright codegen output into the HSR Team Builder automation framework.

Rules:

- move UI mechanics into page objects
- keep specs readable and behavior-focused
- replace brittle selectors
- remove hard waits
- add meaningful web-first assertions
- create helpers only for reusable behavior
- do not add runtime dependencies unless necessary
