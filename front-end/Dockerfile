# Use the official Node.js image as the base image for building the app
FROM node:20 as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

ENV NODE_OPTIONS="--openssl-legacy-provider"

# Install dependencies
RUN npm install

# Copy the entire project directory
COPY . .

# Build the Vue.js app for production
RUN npm run build

# Use a lightweight web server image to serve the static files
FROM nginx:stable-alpine as production-stage

# Copy the build output to the nginx html folder
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy custom nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]