# Stage 1: Build the Node.js application
FROM node:19 AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the application files to the working directory
COPY . .

# Build the application
RUN npm run build

# Stage 2: Use the official Nginx image with Alpine Linux
FROM nginx:alpine AS production

# Copy the built files from the previous stage to Nginx's default public directory
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Expose the default port that Nginx will listen on
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]