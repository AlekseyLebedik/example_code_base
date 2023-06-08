# -*- mode: ruby -*-
# vi: set ft=ruby :

# Devzone frontend Vagrantfile
#
# Setup all of the tools necessary for developing in the Devzone frontend
#
# Ensure you have checked out the devzone (API) and devzone frontend repository
# in the same folder.
#
#   <frontend directory>/
#                        Vagrantfile (this file)
#   devzone/
#           <devzone API repository>
#
# Exposes the following ports:
#  - http://localhost:3000 (frontend UI)
#  - http://localhost:8080 (Backend Admin/API)
#  - http://localhost:8008 (Backend Admin/API)
#
#
Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/bionic64"

  # Port forwarding for dev
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.network "forwarded_port", guest: 3004, host: 3004
  config.vm.network "forwarded_port", guest: 8080, host: 8080
  config.vm.network "forwarded_port", guest: 8081, host: 8081

  # Plugins
  config.vagrant.plugins = ["vagrant-fsnotify"]

  # Virtualbox config
  config.vm.provider "virtualbox" do |vb|
    # We need more memory for javascript build
    vb.memory = "8192"
    vb.cpus = 8
    vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
  end

  # Mount Frontend source code to container
  config.vm.synced_folder ".", "/home/vagrant/devzone-frontend", fsnotify: true, exclude: ["node_modules"]
  # Mount backend source code to container, will create a blank folder if it doesn't exist
  # to avoid erroring out
  config.vm.synced_folder "../devzone", "/home/vagrant/devzone-backend", create: true
  # Mount guest-apps
  config.vm.synced_folder "../ta-online", "/home/vagrant/ta-online", create: true, fsnotify: true, exclude: ["node_modules"]
  config.vm.synced_folder "../forge", "/home/vagrant/forge", create: true, fsnotify: true, exclude: ["node_modules"]

  # Requirements setup
  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
    # Docker repo
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    # Basic Dev
    apt-get install -y git
    # Yarn Repo
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
    apt-get update
    # Docker
    apt-get install -y docker-ce docker-ce-cli containerd.io
    usermod -aG docker vagrant
    # Docker Compose
    curl -L "https://github.com/docker/compose/releases/download/1.25.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    # Node / JS Install
    apt-get install -y --no-install-recommends yarn
    # Python
    apt-get install -y python3.6 python3-pip
    echo fs.inotify.max_user_watches=16384 | tee -a /etc/sysctl.conf
    sysctl -p
  SHELL

  # User level setup (nvm)
  config.vm.provision "shell", privileged: false, inline: <<-SHELL
    # Node / JS Install
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
    nvm install 12.16.1
  SHELL


end
