FROM node:10-alpine
WORKDIR /thingy-client-red
COPY . /thingy-client-red
RUN npm install -g @angular/cli
RUN npm install
CMD ng serve --configuration=hosted --host 0.0.0.0
