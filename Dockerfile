# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's code to the container
COPY . .

# Build the Next.js app
RUN npm run build

# Remove dev dependencies to keep the image slim
RUN npm prune --production

# Expose the Next.js default port
EXPOSE 3000

# szStart the Next.js app
CMD ["npm", "start"]
