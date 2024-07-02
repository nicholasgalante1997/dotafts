# DOTAFTS

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

Dotafts is a web platform for content about content.

## Activity

![Alt](https://repobeats.axiom.co/api/embed/79aeb6d62b816cd80b73c84c4c8912aeaeacc968.svg "Repobeats analytics image")

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)

## Background

Dotafts is a web platform for content about content. It serves as a publication for editorials that offer a lens on content that has stuck with us. 

## Tech

### A Standard Static Web Server Model

This project doesn't reinvent the wheel. It subscribes to a common server-client model of infrastructure. 

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

### Any optional sections

## Usage

### Any optional sections

## API

## Icons

We use CSS GG Icons. For more information, please see [css.gg](https://css.gg/app).

## More optional sections

## Contributing

See [the contributing file](CONTRIBUTING.md)!

PRs accepted.

Small note: If editing the Readme, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.
