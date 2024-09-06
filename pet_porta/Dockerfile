#Dockerfile
# Create the container from the alpine linux image
FROM alpine:3.19

# Add nginx and nodejs
RUN apk add --update nginx nodejs

# Create the directories we will need
RUN mkdir -p /tmp/nginx/pet_porta
RUN mkdir -p /var/log/nginx
RUN mkdir -p /var/www/html

# Copy the respective nginx configuration files
COPY nginx_config/nginx.conf /etc/nginx/nginx.conf
COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf
#COPY nginx_config/server.crt /etc/nginx/ssl/server.crt
#COPY nginx_config/server.key /etc/nginx/ssl/server.key

# Set the directory we want to run the next commands for
WORKDIR /tmp/nginx/pet_porta
# Copy our source code into the container
COPY . .
# Install the dependencies, can be commented out if you're running the same node version
RUN npm install

# run webpack and the vue-loader
RUN npm run build

# copy the built app to our served directory
RUN cp -r dist/* /var/www/html

# make all files belong to the nginx user
RUN chown nginx:nginx /var/www/html

# start nginx and keep the process from backgrounding and the container from quitting
CMD ["nginx", "-g", "daemon off;"]
# ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

# FROM node:10.15.1
# # use changes to package.json to force Docker not to use the cache
# # when we change our application's nodejs dependencies:
# ADD package.json /tmp/package.json
# RUN cd /tmp && npm install
# RUN mkdir -p /usr/src/pet_porta && cp -a /tmp/node_modules /usr/src/pet_porta
# WORKDIR /usr/src/pet_porta
# ADD nodemon.json /usr/src/pet_porta
# ADD . /usr/src/pet_porta
# # Entrypoint script
# RUN cp docker-entrypoint.sh /usr/local/bin/ && \
#     chmod +x /usr/local/bin/docker-entrypoint.sh

# RUN npm install && \
#     npm i -g -s @vue/cli && \
#     npm i -g -s @vue/cli-service && \
#     npm run build && \
#     npm cache clean --force && rm -rf ./build \
#     rm -rf ./test \
#     rm -rf ./src

# # Expose ports (for orchestrators and dynamic reverse proxies)
# # EXPOSE 3001
# ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]