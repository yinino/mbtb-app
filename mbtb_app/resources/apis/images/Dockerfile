# Get the base Ubuntu image from Docker Hub
FROM ubuntu:18.04

# Update apps on the base image
#RUN apt-get -y update && apt-get install -y

RUN apt-get update

# Install build dependencies
RUN apt-get -y install clang cmake git openssl libboost-all-dev zlib1g-dev libcpprest-dev mysql-server libmysqlcppconn-dev libgtest-dev libssl-dev nlohmann-json-dev 



# Copy the current folder which contains C++ source code to the Docker image under /usr/src
COPY . /usr/src/image-api
# Specify the working directory
WORKDIR /usr/src/image-api

RUN mkdir build \
    && cd build \
    && cmake ..

RUN make 


#expose port 8200
#EXPOSE 8200
