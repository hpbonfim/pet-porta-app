#Dockerfile
FROM node:carbon
ENV NODE_ENV=production
# copy package.json to a temporary folder
ADD package.json /tmp/package.json
# installing the node_modules 
RUN cd /tmp && npm install --prod && \
    npm cache clean --force
# created a directory and copy all nedded files
RUN mkdir -p /usr/src/gateway && cp -a /tmp/node_modules /usr/src/gateway
# "layer" thats been cached will be used if possible
WORKDIR /usr/src/gateway
# create a worker folder and add all files to mainwork
ADD . /usr/src/gateway
# Entrypoint script
RUN cp docker-entrypoint.sh /usr/local/bin/ && \
    chmod +x /usr/local/bin/docker-entrypoint.sh
# Expose ports (for orchestrators and dynamic reverse proxies)
EXPOSE 3000
# Start the app
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
