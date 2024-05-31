# Introduction

We're excited to see that you might be interested in contributing to Opensql! No need to ask permission to participate.
For example, anyone can open issues and suggest changes to the source code (via pull requests). Here are some ways
people can get involved:

* Opening well-written bug reports [(via New Issue)](https://github.com/opensql-org/opensql/milestone/1)
* Opening well-written feature requests [(via New Issue)](https://github.com/opensql-org/opensql/milestone/2)
* Opening Pull Requests to fix bugs or make other improvements
* Reviewing (i.e. commenting on) open Pull Requests, to help their creators improve it if needed and allow maintainers
  to take less time looking into them
* Helping to clarify issues opened by others, commenting and asking for clarification

# How to prepare a development environment for Opensql

### 0. Requirements

Most operating systems provide all the needed tools (including Windows, Linux and MacOS):

- Mandatory:
    - [Node.js](https://nodejs.org/), it is preferred to use the current LTS version of Node
    - [Git](https://git-scm.com/)

### 1. Clone the repository

Clone the repository (if you haven't already) via git clone https://github.com/opensql-org/opensql. If you plan on
submitting a pull request, you can create a fork by clicking the fork button and clone it instead with git
clone https://github.com/your-github-username/opensql, or add your fork as an upstream on the already cloned repo with
git remote add upstream https://github.com/your-github-username/opensql.

### 2. Install the Node.js dependencies

Run

```shell
npm i
```

### 3. Running tests

Before starting any work, try to run the tests locally in order to be sure your setup is fine.

```shell
npm test
```

### 4. Commit your modifications

We squash all commits into a single one when we merge your PR. That means you don't have to follow any convention in
your commit messages, but you will need to follow
the [Conventional Commits Conventions](https://www.conventionalcommits.org/en/v1.0.0/) when writing the title of your
PR.

We will then use the title of your PR as the message of the Squash Commit. It will then be used to automatically
generate a changelog and calculate the next [semver](https://semver.org/) version number.

#### Important note:

Please send all your pull requests to the dev branch, otherwise the commit will not be merged with the original source
code.

Happy hacking, and thank you for contributing.