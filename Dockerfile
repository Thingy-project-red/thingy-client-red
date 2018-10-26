FROM node:10-alpine
WORKDIR /thingy-client-red

# Stage 1: install Angular CLI (only runs on clean build)
RUN npm install -g @angular/cli

# Stage 2: install NPM dependencies (only runs when dependencies changed)
COPY package.json /thingy-client-red
COPY package-lock.json /thingy-client-red
RUN npm install

# Stage 3: copy code (only runs when code changed)
COPY . /thingy-client-red

CMD ng serve --configuration=hosted --host 0.0.0.0
