# Use an official Node.js runtime as the parent image
FROM node:20

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY ./frontend/package*.json /app/

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the content
COPY ./frontend /app/

# Build the React app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
