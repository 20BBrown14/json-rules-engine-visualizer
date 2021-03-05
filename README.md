# JSON Rules Engine Visualiser

JSON Rules Engine Visualiser is a UI for visualising and editing rules as defined by [json-rules-engine](https://github.com/CacheControl/json-rules-engine). You can add this component to your project and edit rules without the need to redeploy the js code utilizing them. 

## Getting Started

### Information

This project uses [Storybook](https://storybook.js.org/) for local develop and component demos. This library provides an easy and robust way to see our components and interact with them. More information on how to use Storybook below.

### Node and NPM Version
After cloning the project be sure you're the correct version of npm and node: **lts/fermium**

### Install dependencies and running
1. Run `npm install` to install requierd dependencies
2. Run `npm run storybook` to start storybook
3. Navigate to http://localhost:6006/ in your browser
4. Modify and save `/src/` files to hot load changes

## Available Scripts

In the project directory, you can run:

### `npm run build-storybook`

> Troubleshooting routing issues with Storybook 6.0

More information: https://storybook.js.org/docs/react/api/cli-options#build-storybook


### `npm run lint`

Run ESLint and StyleLint on all js, jsx, and style files. This script runs `lint:js` and `lint:css` both of which can be ran seperately.

### `npm run nuke`

Runs [nuke.sh](./scripts/nuke.sh) which removes the `node_modules` directory, the `package-lock.json` file, and reinstalled node_modules with `npm i`. If you get permissions issues while running this file execute `chmod +x scripts/nuke.sh`

### `npm run storybook`

Starts the storybook on port 6006. If you need to run the storybook on a different port you can do `npm run storybook -- -p $PORT`.

This script uses the `start-storybook` script from Storybook. More information: https://storybook.js.org/docs/react/api/cli-options#start-storybook

### `npm run test`

Runs Jest tests using config found in [jestconfig.json](./jsonconfig.json)

### `npm run test:updateSnapshots`

Update Jest snapshots. More information: https://jestjs.io/docs/en/snapshot-testing#updating-snapshots

## Unit Testing

This project should be unit tested. To run tests run `npm run test` which will run all tests using Jest in the `/tests/` directory. 

We are using Jest for the unit testing framework and Enzyme for the react doc rendering framework. Jest configuration and setup files are [jestconfig.json](./jestconfig.json) and [jestsetup.js](./jestsetup.js).

To view coverage after running tests open `tests/jest/reports/coverage/index.html`. **Coverage should be at a minimum of 80%.**

## Contributing

Pull requests and issues for this project are always welcome. Breaking changes should be discussed first in an issue so that impact will be well known. Before opening a pull request your contributions should be tested and no failing tests present. Your code should also be linted and not introducing any new lint warning or errors without reason.

When opening a pull request you should read and use the pull request template provided to you by this project.

## License
[MIT](https://choosealicense.com/licenses/mit/)
