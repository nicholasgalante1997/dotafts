# TODOS

## Pain Point Derived TODOs

- Fix issue with webserver being unreachable in docker
  - WebServer (Actix) builds + runs fine with:
    - cargo run
    - cargo build
    - cargo build --release
  - WebServer is not being reached when running in docker sandbox.
  - WebServer is not crashing, it sits and listens but isn't receiving requests from the browser

- It's a lot of manual setup to add a route to dev and prod, we probably want a more streamlined process for adding pages.

