#Dockerfile
FROM node:8.12.0
ENV NODE_ENV=production
# copy package.json to a temporary folder
ADD package.json /tmp/package.json
# installing the node_modules 
RUN cd /tmp && npm install --only=production && \
    npm cache clean --force
# created a directory and copy all nedded files
RUN mkdir -p /usr/src/pet_arduino && cp -a /tmp/node_modules /usr/src/pet_arduino
# "layer" thats been cached will be used if possible
WORKDIR /usr/src/pet_arduino
# create a worker folder and add all files to mainwork
ADD . /usr/src/pet_arduino
# Entrypoint script
RUN cp docker-entrypoint.sh /usr/local/bin/ && \
    chmod +x /usr/local/bin/docker-entrypoint.sh
# Expose ports (for orchestrators and dynamic reverse proxies)
# EXPOSE 3333
# Start the app with secure shell cmd
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
