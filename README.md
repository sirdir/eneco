# Eneco

I have chose `TypeScript` as a programmin language, `jest` as test framework, `supertest` as tool/framework for API test and `playwright` as library to interact with UI.
The setup was one only for Linux(Debian/Ubuntu)

## 1-2) Test Plan & Prioritization

You can look at test plan in [dedicate Tes Plan file](./docs/Test%20Plan%20and%20Prioritization.md)

## Common stuff for 3-4 assigments

### Prerequisites

- Node.js >= 20
- For local usage, update the Bearer Token inside the `.env` file

## Setup the project

1. Clone the repo:

```sh
git clone https://github.com/your-username/gorest-api-test.git
cd gorest-api-test
```

2. After repo is clonned, next step is to install all the packages with:

```sh
npm install
```

## 3) Gorest API tests

### Setup for the API part

1. Replace `TODO` Bearer Token inside `.env` file with valid one

2. And you can run all the the tests with one command:

```sh
npm run test:api
```

## 4) Front End Automation

### Setup for the UI part

```sh
npx playwright install --with-deps
```

## P.S.

The test assignment is HUGE, so I have to cut some corners due to time pressure(we all have families and I value my time + to perform petter you must to have propper rest evey day). On top of that I have finished test assagnment in two days, which personally I find pretty impressive for that ammout of work.

What exactly was simplified:

1. Usually I do a lot of commits, step-by-step in this case I have only 5. Of which 3 are huge, 1 with README is moderate and 1 super small with initial commit.
2. On UI user journey I have provided more sophisticated methods only for the pages of **Beregen step(s)**. For the Aanbod, Gegevens, Controlle I hardcoded values and methods do not accept arguments. I think this is an overkill, the work that should be done quite repettetive and **Bereken step(s)** are quite representative that I can do that kind of stuff. I hope for your understanding.
   ![Beregen step](/docs/Bereken%20step.png)

### bugs ans issues

1. I have spot a bug in https://gorest.co.in/public/v2/todos/63979 POST you can see [an explanation in the comment](/src/utils/createTodo.ts)

2. Before even starting to wrire the code, during review of the test assignment I have experienced this error for gorest. If API tests are not working, please check manually https://gorest.co.in/ to verify that domain at least working
   ![host error image](docs/host-error.png)

### TODO

for UI
Except from adress I have used values that I sumbitted while appliying for the new contract.
I have avoide of using id for locators because they are notr providing any readability and I prefer for human readability `input[name="usageGas"]` instead of `#:r18:`
