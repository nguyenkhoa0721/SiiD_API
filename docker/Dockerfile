FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY . .
RUN npm install && mv node_modules ../
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
