<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h3 align="center">Beheshti project</h3>

  
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#initialize">Initialize</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
TODO later


### Built With
  ```sh
    python3
    postgresql
    django
  ```




<!-- GETTING STARTED -->
## Getting Started


### Prerequisites

* postgresql
  ```sh
    Ubunto:
        install postgres
        sudo apt install postgresql postgresql-contrib 
        sudo apt-get install pgadmin3
  ```

### Installation

**Note that if you use pycharm, you must set server dir as root**


1. Clone the repo
   ```sh
   git clone https://github.com/mohammadreza0852/graph_backend.git
   ```

2. Create pyhton virtual env
   ```sh
   sudo virtualenv venv -p python3
   source venv/bin/activate
   ```

3. Install packages
in order to install requirements you have to get access to django-dynamic-menu project
   ```sh
   cd server
   pip install -r requirements.txt
   ```
4. Set .env file (env sample is available)
This file should be created beside "manage.py" file (server directory)

5. Migrate models
   ```sh
   cd server
   python manage.py migrate

   ```




<!-- USAGE EXAMPLES -->
## Initialize

1. Create database 
    ```sh
        sudo -u postgres psql
        create database graph_back;
        create role mm with password '123';
        grant all privileges on database graph_back to mm;
        alter role mm with login;
    ```
2. Set env files
    ```sh
        DATABASE_NAME = graph_back
        DATABASE_PASSWORD = 123
        DATABASE_USER = mm

    ```



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.




