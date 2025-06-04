FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Ensure your server listens on 5000 or use ENV
EXPOSE 5000
CMD ["npm", "start"]
