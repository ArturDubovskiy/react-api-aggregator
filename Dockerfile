FROM node:8.12

# Create workdir and copy package.json
RUN mkdir -p /fetchify
WORKDIR /fetchify
COPY fetchify/package*.json /fetchify/

# Install packages
RUN npm install
