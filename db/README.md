## To create the database follow these steps:

1. Check if You are in the **\db** directory
2. run `npm install`
3. Make sure You have **Docker** running
4. Create a **.env** file with those variables:
    ```BASH
    POSTGRES_DB=''
    POSTGRES_PORT=''
    POSTGRES_PASSWORD=''
    CONTAINER_NAME=''
    POSTGRES_HOST=''
    POSTGRES_USER=''
5. Run :
    ```BASH
    sh create_container.sh
