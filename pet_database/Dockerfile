#Dockerfile
FROM node:latest
ENV NODE_ENV=production
# "layer" thats been cached will be used if possible
WORKDIR /usr/src/pet_database
# copy package.json to a temporary folder
ADD . /usr/src/pet_database
ADD docker-entrypoint.sh /usr/src/pet_database
# installing the node_modules 
RUN npm install && \
    npm cache clean --force
# Entrypoint script
RUN cp docker-entrypoint.sh /usr/local/bin/ && \
    chmod +x /usr/local/bin/docker-entrypoint.sh
# Expose ports (for orchestrators and dynamic reverse proxies)
EXPOSE 3003
# Start the app
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
