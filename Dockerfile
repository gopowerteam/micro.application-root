# 编译阶段
FROM node:lts-slim as builder

ADD . /builder/
WORKDIR /builder

RUN yarn config set registry https://registry.npm.taobao.org/ \
  && yarn \
  && npm run build:ssr

# 运行阶段
FROM node:lts-alpine as app

COPY --from=builder /builder/ /app/

EXPOSE 4000

ENTRYPOINT [ "node", "dist/root-config/server/main.js" ]




