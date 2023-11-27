# MercaTech API REST
This is the RESTful API for the MercaTech application. To correctly run this application in a development environment you must have Node.js v18 or higher and mysql installed in your computer.

## Instalation & Run
To install this repository into your computer you neccesary must have git installed and  copy-paste this command in your terminal:
```
git clone https://github.com/la-true-liga/mercatech-express-api.git mercatech
```
This command clones the repository into ```mercatech``` folder

### Installing project dependencies
Installing dependencies its very easy. You only have to open a terminal inside of ```mercatech``` folder and execute the following command:
```
npm install
```
### Connection to mysql database
Now that you have the project and dependencies correctly installed, it only takes to creating the mercatech database and migrating the data stored in the project.

#### Creating a environment variables file
First of all, you need a ```.env``` file where you have the configured data. For the database connection you need to set up the ```DATABASE_URL``` variable following this example:
```
DATABASE_URL=mysql//user:password@ip:port/schema_name
```
#### Data migration
To migrate the data stored in the ```migrations``` folder you have two options

1. To launch the server and execute the following command:
    ```
    npm run prisma-migrate
    ```
2. Open a terminal in root folder of the project and run the command:
    ```
    npx prisma migrate dev
    ```
With ths you will have all correctly installed :)

### Running the server
To run the server in development mode you have to launch the following command:
```
npm run dev
```
This command will launch the server in ```localhost:4200```

## Basic structure and API documentation
For an extend explanation of the RESTful API and its basic structure please consult the [wiki](https://github.com/la-true-liga/mercatech-express-api/wiki)

Made by [42Alberto](https://github.com/42Alberto) [AlexTrujillo2002](https://github.com/AlexTrujillo2002) [ruzafa8](https://github.com/ruzafa8) and [jdomingu98](https://github.com/jdomingu98)