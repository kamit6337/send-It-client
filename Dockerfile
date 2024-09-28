FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install 

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN npm run build

# Install a lightweight HTTP server to serve static files
RUN npm install -g serve

# Expose port for the static server (usually 80 for production)
EXPOSE 80

# Command to serve the built app in the "dist" folder
CMD [ "npm", "run", "serve" ]