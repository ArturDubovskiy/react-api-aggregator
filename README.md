# About

React application that allow to:
- `get` get data from external APIs 
- `save` data using local storage
- `customyze` saved data to JSON you whant to
- `send` processed data at any API endpoint

### Demo: [here.](https://api-aggregator.konstankino.com/demo/#/)
### UserGuide: [here.](https://api-aggregator.konstankino.com/userguide/)

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
