# Use a base image with Node.js and npm
FROM node

# Set the working directory
WORKDIR /be

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Start Nginx
CMD ["npm", "run","dev"]
