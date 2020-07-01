# Use a lighter version of Node as a parent image
FROM node:12.13.0-alpine

# Set the working directory to /api
WORKDIR /app

# copy package.json into the container at /api
COPY package.json /app

COPY . /app

# Install app dependencies
RUN npm install

# Make port 80 available to the world outside this container
EXPOSE 3005

# Run the app when the container launches
CMD ["npm", "start"]