FROM node:lts-alpine

ADD package.json /app/package.json
ADD yarn.lock /app/yarn.lock

WORKDIR /app

# Installing packages
RUN yarn

ADD . /app

ENV NODE_ENV=production

# Building TypeScript files
#RUN yarn build

CMD ["npm", "start"]