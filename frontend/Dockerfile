# Use official Node.js 16 image as the base image
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .
# Build the React app with Vite
RUN npm run build

# Stage 2 - Production Environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the build output from the previous stage into the nginx server's public directory
COPY --from=build /app/dist /usr/share/nginx/html



# Start nginx server
CMD ["nginx", "-g", "daemon off;"]