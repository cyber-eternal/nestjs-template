FROM node:16.15.0

WORKDIR /usr/app
COPY . .
RUN yarn install --frozen-lockfile && yarn cache clean
RUN yarn add global pm2
EXPOSE 80
EXPOSE 3000
EXPOSE 443

CMD ["yarn", "start:docker"]
