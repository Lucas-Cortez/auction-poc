FROM node:19-alpine AS builder

WORKDIR /home/app
COPY . ./

RUN echo "Installing dependencies"
RUN npm install --frozen-lockfile

RUN echo "Bundling with dev dependencies"
RUN npm run build

RUN echo "Installing production dependencies"
RUN rm -rf node_modules && npm install --production

FROM node:19-alpine as runner

WORKDIR /home/app

COPY --from=builder /home/app/node_modules ./node_modules
COPY --from=builder /home/app/package.json ./
COPY --from=builder /home/app/dist ./dist
COPY --from=builder /home/app/prisma ./prisma

EXPOSE 3030


CMD npm run start
