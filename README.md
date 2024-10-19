# Eneco

Hello reviewer.

I hope that you will read through the README first, before digging into the code.

I have chosen `TypeScript` as a programming language, `jest` as a test framework, `supertest` as a tool/framework for API tests, and `playwright` as a library to interact with the UI, `@faker-js/faker` to provide test data for UI and API tests.

## Setup

### 1. Clone the repo:

```sh
git clone git@github.com:sirdir/eneco.git eneco-by-tymur-kubai
cd eneco-by-tymur-kubai
```

### 2. Bearer Token

Replace `TODO` with appropriate Bearer Token in `.env` file.

How to create bearer token for `gorest` you can find [here](https://gorest.co.in/my-account/access-tokens)

### 3. After the repo is cloned.

Please run setup script for your OS in the root of this repo.
The script contains all necessary comments with explanations.

#### 3.1. Linux (Debian/Ubuntu):

Only one remark, it will ask for the sudo password to install system dependencies required by `playwright`.

```
./setup.sh
```

#### 3.2 Windows

First, ensure that you are using an **administrative PowerShell.exe**, here is the [instruction](https://www.howtogeek.com/194041/how-to-open-the-command-prompt-as-administrator-in-windows-10/) on how to do it.

```sh
.\setup.ps1
```

#### 3.3 MacOS

I do not have MacOS under hand, so there is no script :-(

---

## Assignments:

### 1-2) Test Plan & Prioritization

You can look at the test plan in the [dedicated Test Plan file](./docs/Test%20Plan%20and%20Prioritization.md)

### 3) Gorest API tests

Tests for gorest API are located at `src/api-tests/`.

I have chosen only to cover CRUDs for 4 major endpoints, namely `/users`, `/posts`, `/comments`, and `/todos`.

You can run API tests separately with the command:

```sh
npm run test:api
```

### 4) Front End Automation

Tests for eneco UI are located at `src/ui-tests/`.

`Automate sales flow` as it written in the test assignment is quite abstract, so I ended up with one positive user flow from start to finish, although methods in page objects provide flexibility to easily increase test coverage.
Apart from address and user personal and contact details, I have chosen all other options (meter, sun panels, etc.) as I did for my latest contract.

You can run UI tests separately with the command:

```sh
npm run test:ui
```

## P.S.

You can run all the tests (API + UI) with the command:

```sh
npm run test:all
```

---

The test assignment is HUGE, so I have to cut some corners due to time pressure (we all have families and I value my time + to perform better you must have proper rest every day). On top of that, I have finished the test assignment in two days, which personally I find pretty impressive for that amount of work.

What exactly was simplified:

1. Usually, I do a lot of commits, step-by-step in this case I have only 5. Of which 3 are huge, 1 moderate with README and setup scripts, and 1 super small with the initial commit.
2. No offense but the UI was never designed with test automation in mind, so locators are as bad as hell, so please bear that in mind. There are not that many assertions for the UI part because of that. If I had access to the source code I would adjust it, but meanwhile, I'm forced to use workarounds.
3. I used the Page Object Pattern for UI tests and I have provided each separate page for each step of **Beregen**. But for the Aanbod, Gegevens, Controlle I used only one dedicated page. The work that should be done is quite repetitive and **Bereken step** breakdown for each separate page is quite representative that I can do that kind of stuff.

### Bugs and issues

1. I have spotted a bug in https://gorest.co.in/public/v2/todos POST method you can see [an explanation in the comment](/src/utils/createTodo.ts)

2. Before even starting to write the code, during the review of the test assignment I have experienced this error for `gorest`. If API tests are not working, please check manually https://gorest.co.in/ to verify that the domain is at least working
    ![host error image](docs/host-error.png)
