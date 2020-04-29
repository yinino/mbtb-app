# Get the base Ubuntu image from Docker Hub
FROM ubuntu:18.04

# Update apps on the base image
RUN apt-get -y update && apt-get install -y

# Install the Clang compiler
RUN apt-get -y install clang

# Install cmake
RUN apt-get -y install cmake

# Install git
RUN apt-get -y install git

# Install openssl
RUN apt-get -y install openssl

#Install boost
RUN apt-get -y install libboost-all-dev

#Install zlib
RUN apt-get -y install zlib1g-dev

#Install cppresksdk
RUN apt-get -y install libcpprest-dev

#Install mysql
RUN apt-get -y install mysql-server

#Install mysql-connector-c++
RUN apt-get -y install libmysqlcppconn-dev

#Install cpp-jwt
RUN apt-get -y install libgtest-dev libssl-dev 

#Install nlohmann
RUN apt-get -y install nlohmann-json-dev
