#Dockerfile
FROM node:10.15.1
ENV NODE_ENV=production
# copy package.json to a temporary folder
ADD package.json /tmp/package.json
# installing the node_modules 
RUN cd /tmp && npm install --only=production && \
    npm cache clean --force
    
RUN mkdir -p /usr/src/pet_database && cp -a /tmp/node_modules /usr/src/pet_database
# "layer" thats been cached will be used if possible
WORKDIR /usr/src/pet_database
# copy package.json to a temporary folder
ADD . /usr/src/pet_database
ADD nodemon.json /usr/src/pet_database
ADD docker-entrypoint.sh /usr/src/pet_database
# installing the node_modules 
RUN npm install && \
    npm cache clean --force
# Entrypoint script
RUN cp docker-entrypoint.sh /usr/local/bin/ && \
    chmod +x /usr/local/bin/docker-entrypoint.sh
# Expose ports (for orchestrators and dynamic reverse proxies)
# EXPOSE 3333
# Start the app
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
