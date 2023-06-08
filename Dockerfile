FROM docker.las.demonware.net/bdcentos/7:latest

MAINTAINER Thibault Deutsch <tdeutsch@demonware.net>

# Setup Node.js repo
RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -

# Install Node.js and fpm deps
RUN INSTALL_PKGS="nodejs ruby-devel gcc gcc-c++ make rpm-build rubygems git" && \
    yum install -y --setopt=tsflags=nodocs $INSTALL_PKGS && \
    rpm -V $INSTALL_PKGS && \
    yum clean all -y

# Install Yarn
RUN npm install -g yarn
