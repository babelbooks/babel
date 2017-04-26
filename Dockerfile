FROM node:boron

# Define some env variables
# ENV app /usr/src/babel

# Create app directory
RUN mkdir -p /usr/src/babel
WORKDIR /usr/src/babel

# Copy needed things
COPY . /usr/src/babel

# Expose port
EXPOSE 3000

# Install needed dependencies
RUN npm install -g gulp-cli --no-progress --silent
RUN npm install -g pm2 --no-progress --silent
RUN npm install --no-progress --silent

# Run it
CMD [ "npm", "start" ]


