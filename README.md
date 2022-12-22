# xbs_puppeteer_poc
Small project using nodejs and puppeteer to automate tests in xbs

## Steps to run tests from a Docker container

Pull node lates image: `docker pull node:latest`

Create a container and share project directory in a volume that will be the working directory:
`docker container create --volume ~/Documents/Devsavant/XBS/repos/xbs_puppeteer_poc/:/xbs_puppeteer_poc --workdir /xbs_puppeteer_poc -i -t --name nodejs node`

Launch docker container: `docker start nodejs`

Access docker container: `docker exec -it nodejs /bin/bash`

Install chromium:
`# apt-get update`
`# apt-get install -y chromium`

Install project dependencies:
`# npm install`

Install puppeteer:
`# node ./node_modules/puppeteer/install.js`

Chromium may present problems when running in Docker container because Docker containers are set by default to run inside commands as root and Chromium removed support to run as root without --no-sandbox argument:

```
Error: Failed to launch the browser process!
[1216/230311.821970:ERROR:zygote_host_impl_linux.cc(100)] Running as root without --no-sandbox is not supported. See https://crbug.com/638180.
```

More information can be found in: https://lightrun.com/answers/karma-runner-karma-chrome-launcher-chromeheadless-cant-run-as-root-with---no-sandbox-anymore

Solution would be to pass --no-sandbox argument to puppeteer launch function:
`const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});`

## BackstopJS

Backstopjs is also included, this way we have the possibility to show how to test front-end look and feel, fron-end functionality and back-end APIs.

BackstopJS can be instlled globally, so that all dependencies and binaries are cleanly included in the installation and the `backstop` command is callabale from any directory:

`# npm install -g backstopjs`

Available backstopjs commands are summarized below:
- `backstop init` initialize current directory as a backstoopjs project
- `backstop reference` take base screenshots for the configured test cases
- `backstop test` take test screenshots for each test case and compare the result with base screenshots
- `backstop approve` in case there are significant differences but this is expected, newer screenshots will be saved as base for future tests

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