# Specify the base image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install pnpm
RUN npm i -g pnpm

# Install app dependencies
RUN pnpm i --production

# Copy the rest of the application code to /app
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["pnpm", "start"]
