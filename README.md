# xbs_puppeteer_poc
Small project using nodejs and puppeteer to automate tests in xbs

## To run tests in your local machine

- Install NodeJS: https://nodejs.org/en/download/
- Install Chromium: https://www.chromium.org/Home/
- Install project dependencies:
  - Open CLI terminal and browse to project's root directory
  - Install project dependencies: `npm install`
  - Install puppeteer: `node ./node_modules/puppeterr/install.js`
  - Install BackstopJS globally: `npm install -g backstopjs`

### Cucumber Tests
Cucumber is a tool oriented to Behaviour Driven Development that is capable of interpreting test scenarios in the form of _feature files_ and using the Gherkin language especification.

Gherkin language evolved from the Domain-Drive Design and the concept of using _ubiquitous language_ to describe a software solution in a way that is understandable and useful for both non-technical and technical team members. e.g.:

```
Feature: Is it Friday yet?
  Everybody wants to know when it's Friday

  Scenario: Sunday isn't Friday
    Given today is Sunday
    When I ask whether it's Friday yet
    Then I should be told "Nope"
```

For the business and product stand point this is useful to describe expected application behavior and acceptance criteria for a given piece of software. In the other hand it is also useful for developers and testers to clearly understand the desired functionality and the expected behavior.

The second good benefit of using feature files y that Cucumber has the hability to interpret them and connect them to step definitions, which are portions of code that can incorporate actual testing automation such as unit tests, web API tests and even browser automation by the use of WebDriver, Selenium or Puppeteer libraries. 

```
┌────────────┐                 ┌──────────────┐                 ┌───────────┐
│   Steps    │                 │     Step     │                 │           │
│ in Gherkin ├──matched with──>│ Definitions  ├───manipulates──>│  System   │
│            │                 │              │                 │           │
└────────────┘                 └──────────────┘                 └───────────┘
```

Additional information on Cucumber and Gherkin language can be found in: https://cucumber.io/docs/guides/overview/

In this repo the feature files are located in `./features` whereas the step definitions source files are located under `./features/setp_definitions`.

In order to run the tests in you local machine, open a new terminal window and change directory to this project's root directory. There, and if all project dependencies are already installed, just execute command: `npm test`

This will trigger cucumber tests and will present a result summary in the terminal window. (puppeteer passes parameter `headless: true` to chromium so that the tests run in console without actually opening a chromium window. This is very useful for non-gui environments)

### BackstopJS

BackstopJS is a wrapper that includes puppeteer, resemblejs and junit and combines them in order to facilitate visual regression testing.

While BackstopJS is not precisely a testing automation framework (such as playwright or cypress) it includes everything that is needed to catch broken pieces of the layout in a web application while providing a very intuitive report with the test results where spotted differences on how things looked like in the past and how they look like at the time of the test execution are easy to verificate.

Scenarios in backstopjs are configured as part of the backstop.json file, under the `scenarios` array. Many configurations and specifications can be passed to each scenario. However, among other possibilities, backstopjs is able to:
- Simulate a specific browser viewport
- Take a screenshot of the entire page, the visible area in the vewport, a selected area (distinguished by a CSS selector) or a selected element of the DOM (als distinguished by a CSS selector)
- Click on a certain element before taking the screenshot
- Hover on a certain element before taking the screenshot
- Wait for an element to be visible before taking the screenshot
- Remove certain DOM elements before taking the screenshot
- Adjust the percentage of difference that should be considered as a fail for every test scenario

There is also possibility to perform some actual browser automation steps with the help of custom scripts that are configured under the `onReadyScript` clause in the backsto.json file. However this option may have some limitations that are worth to be revised in order to establish a feasible testing strategy.

By default backstopjs uses puppeteer which is compatible with Chromium, Chrome, Edge and Firefox. However it is also capable of using playwright which appar from the said browsers also supports Apple Safary, which is useful for projects that need to assert visual consistency across many browsers.

In order to run the tests in your local machine, open a new terminal window and change directory to this project's root directoyy. There, and if all project dependencies are alreay installed, execute any of the following commands:

- `backstop init`: This command initializes the current directory as a backstopjs project
- `backstop reference`: Once test cases have been correctly configured, this command takes the first set of screenshots in order to take them as base images
- `backstop test`: Take the test screen shots and compare them with the base screenshots in order to spot possible differences
- `backstop approve`: If the spotted differences happen to be valid because of known changes, then take the latest screenshots as base images

Result summary is shown in the terminal. And, if configured to do so, once the test has finished, backstopjs launches your machine default web browser in order to show a more detailed report, which can be found in `[project root directory]/backstop_data/html_report/indes.html`

## Steps to run tests from a Docker container (using your computer as host)

Pull node lates image: `docker pull node:latest`

Create a container and share project directory in a volume that will be the working directory:
`docker container create --volume [your path to repo]/xbs_puppeteer_poc/:/xbs_puppeteer_poc --workdir /xbs_puppeteer_poc -i -t --name nodejs node`

Launch docker container: `docker start nodejs`

Access docker container: `docker exec -it nodejs /bin/bash`

### Steps to follow in the container's terminal

Install chromium:
`# apt-get update`
`# apt-get install -y chromium`

Install project dependencies:
`# npm install`

Install puppeteer:
`# node ./node_modules/puppeteer/install.js`

Chromium may present problems when running in Docker container because Docker containers are set by default to run inside commands as root and Chromium removed support to run as root without `--no-sandbox` argument:

```
Error: Failed to launch the browser process!
[1216/230311.821970:ERROR:zygote_host_impl_linux.cc(100)] Running as root without --no-sandbox is not supported. See https://crbug.com/638180.
```

More information can be found in: https://lightrun.com/answers/karma-runner-karma-chrome-launcher-chromeheadless-cant-run-as-root-with---no-sandbox-anymore

Solution would be to pass `--no-sandbox` argument to puppeteer launch function:
`const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});`

To run tests, same than in local, just execute the command:

`npm test`

### BackstopJS Tests

Backstopjs should be installed globally inside the container as long as a project level installation may not work as expected:

`# npm install -g backstopjs`

As long as the project structure is already setup with a `backstio.json` file and the `backstop_data` folder, then it is not needed to execute the `backstop init` command.

However it may be necessary, depending on project startegy, to take the base images from inside the container as long as taking base images from your host operating system and the test screenshots from the Docker container may always result in certain level of difference.

In this sense, then esecute the following commands:

- `backstop reference`: Take base images, this should only be done once
- `backstop test`: Take test screenshots in order to spot differences from the current look and feel and the base images. As long as the working directory is configured as a volume that point to the local directory where the project is located then the results are updated in it in realtime. The result report should be foun in `[project root directory]/backstop_data/html_report/indes.html` as if tests were executed locally
- `backstop approve`: This command may be executed from the host system or from inside the container. When spotted differences are expected and are know not to be failures.

In order to pass the `--no-sandbox` argument to chromium when launching puppeteer from BackstopJS then do it under `$.engineOptions.args` node of the `backstop.json` file:

```
  "engineOptions": {
    "args": ["--no-sandbox"]
  },
```

It is also important to take into account that backstopjs default behavior is to present results in a graphical format, so that computer's default browser is opened automatically when test finishes to show the results. As long as Docker is a non-gui environment it is required to change this behavior in `backstop.json` file:

```
"report": ["CI"],
```

Other available options for this parameter are `["browser", "CI"]` and `["browser"]`

Backstopjs results are kept in the project's directory under `./backstop_data/html_report/` and `./backstop_data/ci_report`

## Run Tests as Part of a Pipeline in CircleCI

Pipeline configuration file can be found in `[project root directory]/.circleci/config.yml`

Configuration is set to use the official nodejs image in docker hub: https://hub.docker.com/_/node

This is because CircleCI convenience image for node (https://circleci.com/developer/images/image/cimg/node) is based on Ubuntu and Ubuntu's apt repository lacks an installation candidate for Chromium, whereas official node image is based on Debian which apt repository does have an installation candidate for chromium.

Base images for backstopjs are already taken using chromium inside a docker container, thus no need to execute `backstop init` command.

Once the tests have been executed, then it is needed to push the results from the job image back to the repo. This part is still pending to be done. So that it will be possible to pull the results from the repository to the local machine in order to visualize them or it would be even feasible to push them into a micro site, such as in Gitlab Pages.

Ideally, when the results show differences that are expected and the execution of the `backstop approve` command is required then the proccess would be pulling the latest results from the repo to the local machine, then open a terminal and change directory to the project root directory and execute the approval command from there without executing the tests again as long as local browser render may differ from the one in the docker container and tests will always fail from this point on.

Once the approve command has been executed locally, it is required to push the updated files to the repo.

It is also possible to automate this in CircleCI with an on-demmand job but further investigation would be required.