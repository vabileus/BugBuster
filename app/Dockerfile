FROM node:14 as development

# Add Tini
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

# Install only development dependencies from package-lock.json
RUN npm ci

COPY . .

RUN npm run build

# By using the FROM statement again, we are telling Docker that it should create a new,
# fresh image without any connection to the previous one. This time we are naming it production.
FROM node:14 as production

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# Add Tini
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

WORKDIR /usr/src/app

COPY package*.json ./

# Install only production dependencies from package-lock.json
RUN npm ci --only=production

COPY . .

# Copy the built /dist folder from the development image.
# This way we are only getting the /dist directory, without the devDependencies,
# installed in our final image.
COPY --from=development /usr/src/app/build ./build

CMD [ "npm", "run", "start:prod" ]