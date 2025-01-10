FROM node:22.11.0-alpine
WORKDIR /app/backend
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
ENV NODE_ENV=production
ENV MONGO_URI=mongodb://mongo:27017/safewashdb
ENV DNS=safewashfrontend:80
CMD ["node", "./bin/www"]
