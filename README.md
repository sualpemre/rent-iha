
# SkywardLease 

Skywardlease is a platform designed to facilitate the rental and management of Unmanned Aerial Vehicles (UAVs), also known as drones.

## Used Technologies

<!-- HTML table -->
<table>
<tr>
<td>Django Project<br><img src="https://edent.github.io/SuperTinyIcons/images/svg/djangoproject.svg" width="100" title="Django Project"></td>
<td>Postgre SQL<br><img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/postgresql-icon.png" width="100" title="Postgre SQL"></td>
<td>React<br><img src="https://edent.github.io/SuperTinyIcons/images/svg/react.svg" width="100" title="React"></td>
<td>TypeScript<br><img src="https://edent.github.io/SuperTinyIcons/images/svg/typescript.svg" width="100" title="TypeScript"></td>
<td>Tailwind<br><img src="https://ph-files.imgix.net/829bdf09-bf73-4976-ae80-8eb1ec6b455d.png?auto=format" width="100" height="100" title="Tailwind"></td>
<td>NGINX<br><img src="https://edent.github.io/SuperTinyIcons/images/svg/nginx.svg" width="100" title="NGINX"></td>
<td>Gunicorn<br><img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/gunicorn_logo_icon_170045.png" width="100" title="Gunicorn"></td>
<td>Docker<br><img src="https://edent.github.io/SuperTinyIcons/images/svg/docker.svg" width="100" title="Docker"></td>


</tr>
</table>

## Table of Contents

- [SkywardLease](#skywardlease)
  - [Used Technologies](#used-technologies)
  - [Table of Contents](#table-of-contents)
  - [Quick Start](#quick-start)
- [With WSL](#with-wsl)
- [How to install WSL on windows](#how-to-install-wsl-on-windows)
  - [Enable WSL](#enable-wsl)
  - [WSL 2](#wsl-2)
  - [Install WSL Ubuntu](#install-wsl-ubuntu)
  - [Install Docker to WSL](#install-docker-to-wsl)
  - [References](#references)




## Quick Start

Use terminal and navigate to the project root. 

- Clone the repository with the following command:

```bash
git clone https://github.com/sualpemre/skywardlease.git
```

- Then open a command prompt, navigate to the location where you cloned the project using the command prompt

- Then run following command on project folder location:
  
    <code>docker-compose up -d --build</code>

- Then run following command:
    <code>docker ps</code>
    ![alt text](assets/dockerps.png)

- Open your browser:
    - FrontEnd:
        <code>http://localhost:1337/</code>
    - BackEnd: 
        <code>http://localhost:1337/api/</code>
        
- Note : If you don't have docker-compose installed on your machine, [👉 click](#with-wsl).



# With WSL
- Run following command on project folder location: 
    
    <code>wsl</code> 

- Note : If you don't have WSL and Docker installed on your machine, [👉 click](#how-to-install-wsl-on-windows) here to learn how to install them.



# How to install WSL on windows

## Enable WSL 
        
- Open Turn Windows features on or off and check Windows Subsystem for Linux
    ![Wsl Open](assets/wsl-1.png)

- On the first enablement of WSL, Windows will download required packages and will prompt to restart for completing the installation

## WSL 2

- Windows, by default, installs WSL 1. However, we need WSL 2 to run docker containers.

- Open elevated Powershell and run:
  
    <code>dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart</code>

- Then run in cmd or powershell
  
    <code>wsl --update</code> 

- after completed, set wsl version to 2 by running
  
    <code>wsl --set-default-version 2</code>

## Install WSL Ubuntu
    
  - <code>wsl --install -d ubuntu</code>

- Important: Save password that you set during the installation. For administrative commands, you will need to enter that password

- After install, it will login into ubuntu. To check the WSL version, type exit to leave WSL and run:
  
    <code>wsl -l -v</code>

- If you see version 2, we are good to install docker into WSL
    
    ![Wsl Shell](assets/wsl-2.png)

## Install Docker to WSL

- You can login to WSL Ubuntu by:

    <code>wsl</code>

- On the very first login, run the following for security updates:
 
    <code>sudo apt update && sudo apt upgrade</code>

- Important
  - To avoid any potential conflicts with using WSL 2 Docker Engine, you must uninstall any previous versions of Docker Engine and CLI installed directly  through Linux distributions or Docker Desktop.

- Install Dependencies(ignore temporary warnings/errors during installation)

    <code>sudo apt install -y \
        apt-transport-https \
        ca-certificates \
        curl \
        software-properties-common</code>

- Add Docker GPG Key
  
    <code>curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg</code>

- Note

  - If above command does not run and throws error as "Could not resolve host: download.docker.com", its because network connectivity issues [can happen](https://github.com/microsoft/WSL/issues?q=is%3Aissue+label%3Anetwork) with WSL 2, and tweaking the DNS settings often resolves these problems by running the following(skip if does not fail)
   
    <code>echo -e "[network]\ngenerateResolvConf = false" | sudo tee -a /etc/wsl.conf sudo unlink /etc/resolv.conf echo nameserver 1.1.1.1 | sudo tee /etc/resolv.conf</code>
    
- Add the Docker repository to your APT sources
  
    <code>echo "deb [signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null</code>

- Update the package list again
   
    <code>sudo apt update</code>

- Install the Docker engine
  
    <code>sudo apt install -y docker-ce docker-ce-cli containerd.io</code>

- when done, check the docker service status by
   
    <code>sudo systemctl status docker</code>

- or check the version
    
    <code>docker --version</code>

- Manage Docker as a Non-root User (Optional):
   
    <code>sudo usermod -aG docker $USER 
    newgrp docker</code>


## References

- [https://learn.microsoft.com/en-us/windows/wsl/install](https://learn.microsoft.com/en-us/windows/wsl/install)
- [https://learn.microsoft.com/en-us/windows/wsl/install-manual#step-3---enable-virtual-machine-feature](https://learn.microsoft.com/en-us/windows/wsl/install-manual#step-3---enable-virtual-machine-feature)
- [https://dev.to/bowmanjd/install-docker-on-windows-wsl-without-docker-desktop-34m9](https://dev.to/bowmanjd/install-docker-on-windows-wsl-without-docker-desktop-34m9)
- [https://raw.githubusercontent.com/bonben365/linux/main/docker-install.sh](https://raw.githubusercontent.com/bonben365/linux/main/docker-install.sh)