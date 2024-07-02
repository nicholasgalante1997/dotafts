# DOTAFTS

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

Dotafts is a web platform for content about content.

## Activity

![Alt](https://repobeats.axiom.co/api/embed/79aeb6d62b816cd80b73c84c4c8912aeaeacc968.svg "Repobeats analytics image")

## Table of Contents

- [DOTAFTS](#dotafts)
  - [Activity](#activity)
  - [Table of Contents](#table-of-contents)
  - [Background](#background)
  - [Tech](#tech)
    - [A Standard Static Web Server Model](#a-standard-static-web-server-model)
    - [Server](#server)
    - [Client](#client)
    - [Database](#database)
  - [Install](#install)
    - [Installation (Web)](#installation-web)
    - [Installation (Server)](#installation-server)
  - [Local Development](#local-development)
  - [Deployment](#deployment)
  - [Icons](#icons)
  - [More optional sections](#more-optional-sections)
  - [Contributing](#contributing)

## Background

Dotafts is a web platform for content about content. It serves as a publication for editorials that offer a lens on content that has stuck with us. 

## Tech

### A Standard Static Web Server Model

This project doesn't reinvent the wheel. It subscribes to a common server-client model of infrastructure. We have a client application, the source code for which can be found under `./www`. We also have a traditional tcp https server, the source code for which can be found under `./src`.

### Server

We use Rust with Actix Web for our server. We use sqlx as our database exchange library. We use actix_files for our static web hosting.

### Client

We use React 18.2 and React DOM 18.2 for the client. We generate static html during the build/release process and hydrate the markup on the client. We use the ReactDOM/server api for static site generation. We don't use next.js or remix. When possible, we rely on native html and css functionality over any js counterpart.

### Database

We use postgres.

## Install

Installation of dependencies is twofold. We, in a sense, have two environments to prepare.

### Installation (Web)

```bash
$ cd www
$ pnpm install
> ...
```

### Installation (Server)

Our rs dependencies change less than our www dependencies. You can run

```bash
$ cargo build
> ...
```

Which should update your crate index with all the dependencies this project uses. This should speed up your first `cargo run` command.

## Local Development

```bash
# First time
chmod +x ./bin/dev

./bin/dev
```

## Deployment

We use github actions and shuttle.rs for continuous deployment and hosting.

## Icons

We use CSS GG Icons. For more information, please see [css.gg](https://css.gg/app).

## More optional sections

## Contributing

See [the contributing file](CONTRIBUTING.md)!

PRs accepted.

Small note: If editing the Readme, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.
