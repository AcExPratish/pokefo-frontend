FROM node:lts-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --omit=dev


FROM node:lts-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/dist dist
CMD serve -s dist
EXPOSE 3000