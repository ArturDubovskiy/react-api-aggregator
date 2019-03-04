[![Codacy Badge](https://api.codacy.com/project/badge/Grade/0886999bb6ab4230a687478b17953ab7)](https://app.codacy.com/app/ArturDubovskiy/react-api-aggregator?utm_source=github.com&utm_medium=referral&utm_content=ArturDubovskiy/react-api-aggregator&utm_campaign=Badge_Grade_Settings)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/ArturDubovskiy/react-api-aggregator/master.svg?style=flat-square)](https://codecov.io/gh/ArturDubovskiy/react-api-aggregator/)
[![Build Status](https://travis-ci.com/ArturDubovskiy/react-api-aggregator.svg?branch=master)](https://travis-ci.com/ArturDubovskiy/react-api-aggregator)
[![Known Vulnerabilities](https://snyk.io/test/github/ArturDubovskiy/react-api-aggregator/badge.svg?targetFile=fetchify%2Fpackage.json)](https://snyk.io/test/github/ArturDubovskiy/react-api-aggregator?targetFile=fetchify%2Fpackage.json)


# About

React application that allow to:
- `get` get data from external APIs 
- `save` data using local storage
- `customize` saved data to JSON you whant to
- `send` processed data at any API endpoint

#### Demo: [here](https://api-aggregator.konstankino.com/demo/#/)
#### UserGuide: [here](https://api-aggregator.konstankino.com/userguide/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)  
This project UI based on [Semantic UI React](https://react.semantic-ui.com/)  
This project is licensed under the MIT License. [Learn more](https://choosealicense.com/licenses/mit/)  


# Requirements

- [docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)
- [make](https://www.npmjs.com/package/make)

# Available scripts

- `make up` - to build/start docker container and start development server
- `make down` - to stop docker container
- `make test` - to run tests
- `make test-watch` - to run tests in whatch mode 
- `make test-coverage` - to get tests coverage
- `make clean-docker` - to clean docker workspace
- `make build-dev` - to create development build
- `make build-prod` - to create production build
