# Use the official Node.js image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory
COPY . .

# Expose the port that your app runs on
EXPOSE 8000

# Command to run your application
CMD ["node", "src/server.js"]
