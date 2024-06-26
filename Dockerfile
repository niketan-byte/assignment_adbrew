# Set base image (host OS)
FROM python:3.8-slim-buster

# Use bash as the default shell instead of sh
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Install necessary packages
RUN apt-get -y update && \
    apt-get install -y curl nano wget git build-essential gcc && \
    apt-get clean

# Install PIP using get-pip.py
RUN wget https://bootstrap.pypa.io/get-pip.py && \
    python get-pip.py && \
    rm get-pip.py

# Upgrade pip to the latest version
RUN pip install --upgrade pip

# Set environment variables to prefer binary wheels
ENV PIP_NO_BINARY=:none:
ENV PIP_ONLY_BINARY=:all:

# Set environment variables
ENV ENV_TYPE=staging
ENV MONGO_HOST=mongo
ENV MONGO_PORT=27017
ENV PYTHONPATH=$PYTHONPATH:/src/

# Copy the dependencies file to the working directory
COPY src/requirements.txt /requirements.txt

# Install dependencies in a virtual environment
RUN python -m venv /venv && \
    /venv/bin/pip install -r /requirements.txt

# Set environment variables for PATH
ENV PATH="/venv/bin:$PATH"

# Copy the rest of the application code
COPY src/ /src/

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get -y update && \
    apt-get install -y yarn && \
    apt-get clean

# Set working directory
WORKDIR /src

# Install frontend dependencies
RUN cd app && yarn install

# Expose necessary ports
EXPOSE 8000
EXPOSE 3000

# Run server
CMD ["sh", "-c", "cd /src && python manage.py runserver 0.0.0.0:8000"]
