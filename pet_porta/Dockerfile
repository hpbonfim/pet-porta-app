#Dockerfile
FROM node:carbon
ENV NODE_ENV=production
# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
RUN cd /tmp && npm install --only=production
RUN mkdir -p /usr/src/pet_porta && cp -a /tmp/node_modules /usr/src/pet_porta
WORKDIR /usr/src/pet_porta
ADD . /usr/src/pet_porta
# Entrypoint script
RUN cp docker-entrypoint.sh /usr/local/bin/ && \
    chmod +x /usr/local/bin/docker-entrypoint.sh

RUN npm run build && \
    npm cache clean --force && rm -rf ./build \
    rm -rf ./test \
    rm -rf ./src

# Expose ports (for orchestrators and dynamic reverse proxies)
EXPOSE 3001
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
