#!/bin/bash

if [ -f .env ]
then

    POSTGRES_DB=''
    POSTGRES_PORT=''
    POSTGRES_PASSWORD=''
    CONTAINER_NAME=''
    POSTGRES_HOST=''
    POSTGRES_USER=''

    while read -r LINE || [ -n "$LINE" ]; do
        KEY=$(echo $LINE | cut -d '=' -f 1)
        VALUE=$(echo $LINE | cut -d '=' -f 2)

        case $KEY in
            POSTGRES_DB)
                POSTGRES_DB=$VALUE
                ;;
            POSTGRES_PORT)
                POSTGRES_PORT=$VALUE
                ;;
            POSTGRES_PASSWORD)
                POSTGRES_PASSWORD=$VALUE
                ;;
            CONTAINER_NAME)
                CONTAINER_NAME=$VALUE
                ;;
            POSTGRES_HOST)
                POSTGRES_HOST=$VALUE
                ;;
            POSTGRES_USER)
                POSTGRES_USER=$VALUE
                ;;
            *)
                echo unknown
                ;;
        esac
    done < .env

    if [ "$POSTGRES_DB" == '' ] || [ "$POSTGRES_PORT" == '' ] || [ "$POSTGRES_PASSWORD" == '' ] || [ "$CONTAINER_NAME" == '' ] || [ "$POSTGRES_HOST" == '' ] || [ "$POSTGRES_USER" == '' ]
        then    
            echo "Couldn't get all necessary env variables"
        else
            docker run --rm --name $CONTAINER_NAME -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD -d -p 5432:$POSTGRES_PORT postgres:14
    fi
else
    echo "Couldn't create postgres container (can't find .env file)"
fi

sleep 5

node create_db.js

sleep 2

echo 'Finished...'