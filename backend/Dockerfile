
# Base Image
FROM node:22

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Expose application port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]