## System reqruitments
- Apache Server 2.4.63
- PHP >= 8.4
- Mysql >= 8.0
- PhpMyAdmin >= 6.0 <sup>\*optional</sup>

## How to Install This Project

1. Clone this project to your local computer
   
   ```bash
   git clone https://github.com/Galihuyyy/inventaris-barang.git
   ```
   ```bash
   cd project-name/backend_laravel
   ```

2. Install Composer Dependencies
   ```bash
   composer install
   ```
   or
   ```vim
   composer i
   ```

3. Create .env file
   ```bash
    cp .env.example .env
   ```

4. Generate App Key
   ```bash
    php artisan key:generate
   ```

5. Set up database in your .env file
   ```bash
    DB_CONNECTION  = mysql (default)
    DB_HOST        = 127.0.0.1 (default)
    DB_PORT        = 3306 (default)
    DB_DATABASE    = database_name
    DB_USERNAME    = database_username
    DB_PASSWORD    = database_password
   ```

6. Run migration
   ```bash
    php artisan migrate
   ```

7. run laravel project in local
   ```bash
    php artisan serve
    ```
   or
   ```bash
    php artisan ser
    ```

8. Cd to frontend folder
   ```bash
    cd ..
   cd frontend_react
   ```

9. install npm dependencies
    ```bash
    npm install
    ```

10. Run frontend server
    ```bash
    npm run dev
    ```

11. `Ctrl + Click` the url server

12. Congrats, your project now is running enjoy your time!
   
