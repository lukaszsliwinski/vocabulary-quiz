# =========================
# Angular build stage
# =========================

# Use official Node.js LTS (Alpine) as the base image
FROM node:20-alpine AS client-build

# Set working directory inside the container
WORKDIR /app/client

# Copy only package.json and package-lock.json first for caching
COPY client/package*.json ./

# Install all dependencies (prod + dev)
RUN npm install

# Copy the rest of the Angular application code
COPY client .

# Build the Angular application
RUN npm run build

# Remove devDependencies, keep only production
RUN npm prune --production


# =========================
# Backend production stage
# =========================

# Use official Node.js LTS (Alpine) as the base image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json first for caching
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the backend application code
COPY server ./server

# Copy built Angular static files from previous stage
COPY --from=client-build /app/client/dist ./client/dist

# Expose port 3000 (or the one your app uses)
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
