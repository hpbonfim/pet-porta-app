#Dockerfile
FROM node:8.12.0-jessie
ENV NODE_ENV=production
# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
RUN cd /tmp && npm install --prod
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /usr/src/app
ADD . /usr/src/app

RUN npm run build && \
    npm cache clean --force && rm -rf ./build \
    rm -rf ./test \
    rm -rf ./src

# Entrypoint script
RUN cp docker-entrypoint.sh /usr/local/bin/ && \
    chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose ports (for orchestrators and dynamic reverse proxies)
EXPOSE 80
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
