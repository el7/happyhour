# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm ci --only=production

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["node", "app.js"]
