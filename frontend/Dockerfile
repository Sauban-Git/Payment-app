# ---------- Step 1: Build the React app ----------
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---------- Step 2: Serve it using Nginx ----------
FROM nginx:stable-alpine

# Copy built files from previous step
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Add custom Nginx config for SPA routing (recommended for React)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose Nginx port
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
