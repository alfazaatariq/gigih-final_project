# Use a base image with Node.js
FROM node

# Set the working directory
WORKDIR /fe

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the app code
COPY . .    

# Start Nginx
CMD ["npm", "run", "dev"]
