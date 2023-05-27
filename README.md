
# <a href="https://documenter.getpostman.com/view/9260774/2s93m7WgkM">API DOCUMENTATION FOUND HERE</a>
###### https://documenter.getpostman.com/view/9260774/2s93m7WgkM

# INSTALLATION GUIDE
    To install and run the automated deposit notification system, follow these steps:

##### Open the first terminal:

    Run npm install or yarn install to install the required dependencies.
    Once the installation is complete,

##### Compile TypeScript to JavaScript:

    After the dependencies are installed, you need to compile the TypeScript code into JavaScript before running the application.
    In the first terminal, run npm run build or yarn build. This command will compile the TypeScript files into JavaScript and generate the corresponding JavaScript files in the appropriate output directory.

##### Start the application: 
    Execute yarn dev to start the application using nodemon. Nodemon is a development utility that automatically restarts the application whenever changes are detected in the source code. It helps in the development process by providing a more efficient workflow.

    Execute yarn start to start the application using PM2. PM2 will manage the application process, handle automatic restarts, and provide logging capabilities.
    The application should now be up and running, and you can monitor the logs in the second terminal using npm run pm2 log or yarn pm2 log.

##### Open the second terminal:
    Run npm run pm2 log in the second terminal. This command will start the application using PM2. PM2 is a process manager for Node.js applications that provides features like automatic restarts, monitoring, and logging. The log argument ensures that the logs of the running application are displayed in the terminal.
    By following these steps, you will have the automated deposit notification system up and running using nodemon for development purposes and PM2 for process management. The first terminal is used to start the application, while the second terminal displays the application logs using PM2.


# Application Directory Tree

```
src
├── @api
│   ├── loaders
│   │   ├── index.ts
│   │   └── server.ts
│   └── notification
│       ├── notification.controller.ts
│       ├── notification.dto.ts
│       ├── notification.middleware.ts
│       ├── notification.model.ts
│       ├── notification.route.ts
│       ├── notification.service.ts
│       └── notification.validation.ts
├── @idp
│   ├── loaders
│   │   ├── index.ts
│   │   └── server.ts
│   └── user
│       ├── user.controller.ts
│       ├── user.dto.ts
│       ├── user.middleware.ts
│       ├── user.model.ts
│       ├── user.route.ts
│       ├── user.service.ts
│       └── user.validation.ts
├── @wallet
│   ├── loaders
│   │   ├── index.ts
│   │   └── server.ts
│   └── wallet
│       ├── wallet.controller.ts
│       ├── wallet.dto.ts
│       ├── wallet.middleware.ts
│       ├── wallet.model.ts
│       ├── wallet.route.ts
│       ├── wallet.service.ts
│       └── wallet.validation.ts
├── api.server.ts
├── common
│   ├── config
│   │   └── index.ts
│   ├── connections
│   │   ├── index.ts
│   │   ├── mail.ts
│   │   ├── mongodb.ts
│   │   └── redis.ts
│   ├── constants.ts
│   ├── dto
│   │   └── pagination.dto.ts
│   ├── interfaces
│   │   ├── notification.interface.ts
│   │   ├── pagination.interface.ts
│   │   ├── responses.ts
│   │   ├── user.interface.ts
│   │   └── wallet.interface.ts
│   ├── modules
│   │   ├── mongooseAdapter.ts
│   │   ├── redisAdapter.ts
│   │   └── storage.ts
│   ├── sdk
│   │   ├── api.ts
│   │   ├── idp.ts
│   │   ├── queue.ts
│   │   └── wallet.ts
│   └── types.ts
├── factories
│   └── generic.error.ts
├── idp.server.ts
├── responses
│   ├── artifacts
│   │   └── success.artifact.ts
│   ├── clientErrors
│   │   ├── badRequest.clientError.ts
│   │   ├── forbidden.clientError.ts
│   │   ├── notFound.clientError.ts
│   │   ├── unauthorized.clientError.ts
│   │   └── unprocessableEntity.clientError.ts
│   ├── errorHandler.ts
│   └── serverErrors
│       └── internalServerError.serverError.ts
├── utils
│   └── index.ts
├── wallet.server.ts
└── workers
    ├── index.ts
    ├── job-type.ts
    ├── pots
    │   └── notification.worker.ts
    ├── start.ts
    └── worker.wrapper.ts

```
## Explanation
    An automated deposit notification system is a software system that is designed to automatically send notifications or alerts when deposits are made to a particular account. It utilizes various microservices and workers to handle different functionalities of the system.

###### In this directory tree, we have the following main components:

##### @api:
    This directory contains the microservice responsible for handling API-related functionality. It includes loaders for initializing the server and the server itself. Additionally, there are files related to notifications, such as controllers, DTOs (Data Transfer Objects), middleware, models, routes, services, and validation.

##### @idp: 
    This directory represents the microservice responsible for identity management. It includes loaders and user-related functionality, such as controllers, DTOs, middleware, models, routes, services, and validation.

##### @wallet:
    This directory represents the microservice responsible for wallet-related functionality. It includes loaders and wallet-related functionality, such as controllers, DTOs, middleware, models, routes, services, and validation.

  - api.server.ts: This file is the entry point for the API microservice.

    * [ ] common: This directory contains common functionality shared across different components of the system. It includes configurations, database connections, constants, DTOs for pagination, interfaces for notifications, pagination, responses, users, and wallets, modules for database adapters and storage, and SDKs for interacting with different services.

    * [ ] factories: This directory contains a file related to generic error handling.

    * [ ] idp.server.ts: This file is the entry point for the identity management microservice.

    * [ ] responses: This directory contains files related to different types of responses, including success artifacts, client errors (e.g., bad request, forbidden, not found, unauthorized, unprocessable entity), error handling, and server errors (e.g., internal server error).

    * [ ] utils: This directory contains utility files.

    * [ ] wallet.server.ts: This file is the entry point for the wallet microservice.

##### Workers: 
    This directory contains files related to background workers. It includes an index file, a job-type file, a start file, and a worker wrapper. The pots directory within the workers directory contains a specific worker file (notification.worker.ts) related to sending deposit notifications.

    The system uses these components to automate the process of sending notifications to users whenever a deposit is made, using both email and mobile notifications. The microservices handle different aspects of the system, such as API handling, identity management, and wallet management. The workers handle background tasks, such as sending notifications, which are performed asynchronously to ensure efficient processing of deposit notifications.

    The automated deposit notification system utilizes two databases:

##### Redis: 
    Redis is used as a queue server through the implementation of Kue.js. Kue.js is a job queue library for Node.js that allows for the processing of asynchronous tasks in the background. Redis, in this context, serves as the storage engine for the job queue. The notification.worker.ts file likely contains code related to processing jobs from the queue, such as sending notifications or performing other tasks asynchronously. Redis provides fast and efficient data storage and retrieval, making it suitable for managing the job queue in the system.

##### MongoDB with Mongoose:
    MongoDB is used as the main database, and Mongoose is employed as an Object Data Modeling (ODM) library for Node.js, providing a convenient interface for interacting with MongoDB. Mongoose allows you to define schemas (as shown in the previous explanation) to structure and enforce rules on the data stored in MongoDB. It provides a powerful set of features for querying, updating, and managing data in the database. In this system, Mongoose is likely used to store and retrieve various entities such as notifications, users, and wallets.

By using Redis as the queue server and MongoDB with Mongoose as the database, the automated deposit notification system can efficiently manage and process notifications asynchronously, while also persisting relevant data in a structured manner.

Below are Database Schema, The provided code snippets define Mongoose schemas, which are used in conjunction with MongoDB to define the structure and behavior of documents in a collection. Each schema represents a specific entity or object in the system and defines the fields, data types, and validation rules for that entity.

### Notification Schema:
    reference: A string field representing a reference associated with the notification.
    userId: A field representing the user's unique identifier. It uses Schema.Types.ObjectId, which references the ObjectId type from Mongoose.
    amount: A numeric field representing the amount associated with the notification.
    status: A string field representing the status of the notification. It has a predefined set of values defined by the NotificationStatus enum. The default value is set to NotificationStatus.pending.
    type: A string field representing the type of the notification. It has a predefined set of values defined by the NotificationType enum.

``` ts
Schema<INotification>({
  reference: String,
  userId: Schema.Types.ObjectId,
  amount: Number,
  status: {
    type: String,
    values: Object.values(NotificationStatus),
    default: NotificationStatus.pending
  },
  type: {
    type: String,
    values: Object.values(NotificationType)
    required: true
  }
})

```

### User Schema:
   - name: A string field representing the user's name.
   - username: A string field representing the user's username.
   - deviceNotificationToken: A string field representing the user's device notification  token. It has a default value of null.
   - password: A string field representing the user's password.
   - email: A string field representing the user's email.
   - phone: A string field representing the user's phone.
   - type: A string field representing the type of user. It has a predefined set of values defined by the UserType enum.
``` ts
Schema<IProtectedUser>({
  name: { type: String, required: true },
  username: { type: String, required: true },
  deviceNotificationToken: { type: String, default: null },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  type: {
    type: String,
    values: Object.values(UserType),
    required: true
  }
})
```

### Wallet Schema:
   - userId: A field representing the user's unique identifier. It uses Schema.Types.ObjectId, which references the ObjectId type from Mongoose.
   - value: A numeric field representing the value of the wallet.
   - groupId: A field representing the group's unique identifier. It uses Schema.Types.ObjectId, which references the ObjectId type from Mongoose.
   - type: A string field representing the type of the wallet. It has a predefined set of values defined by the WalletType enum.


``` ts
Schema<IWallet>({
  userId: Schema.Types.ObjectId,
  value: Number,
  groupId: Schema.Types.ObjectId,
  type: {
    type: String,
    values: Object.values(WalletType)
    required: true
  }
})

```
Workers 


more details about the application tree


## @api:
   This folder represents the API microservice.
   - loaders:  Contains files responsible for initializing and configuring the API microservice.
   - notification: Contains files related to handling notifications, including controllers, DTOs (Data Transfer Objects), middleware, models, routes, services, and validation.

### @idp: 
   This folder represents the Identity Provider microservice.
   - loaders: Contains files responsible for initializing and configuring the Identity Provider microservice.

   - user: Contains files related to user management, including controllers, DTOs, middleware, models, routes, services, and validation.

### @wallet: 
   This folder represents the Wallet microservice.
   - loaders: Contains files responsible for initializing and configuring the Wallet microservice.

   - wallet: Contains files related to wallet management, including controllers, DTOs, middleware, models, routes, services, and validation.

   - api.server.ts, idp.server.ts, wallet.server.ts: These files serve as the entry points for their respective microservices, responsible for starting the servers.

   - common: This folder contains common components shared across microservices.

   - config: Contains configuration files.

   - connections: Contains files for establishing connections with external services such as mail, MongoDB, and Redis.

   - constants.ts: Defines common constants used across the system.

   - dto: Contains Data Transfer Objects used across microservices.

   - interfaces: Contains interfaces defining structures for notifications, pagination, responses, users, and wallets.

   - modules: Contains modules such as adapters for Mongoose (MongoDB) and Redis, as well as a storage module.

   - sdk: Contains SDK files for interacting with external services like API, IDP, queue, and wallet.

   - types.ts: Defines common types used throughout the system.
    factories: Contains a file named generic.error.ts, which likely represents a factory for creating generic error objects.

   - responses: Contains files related to handling different types of responses from the microservices.

   - artifacts: Contains a success artifact file.

   - clientErrors: Contains client error files such as bad request, forbidden, not found, unauthorized, and unprocessable entity.

   - errorHandler.ts: Handles errors and maps them to appropriate responses.

   - serverErrors: Contains server error files, such as an internal server error.
    utils: Contains utility functions that may be used throughout the system.

   - workers: Contains files related to background workers responsible for handling specific tasks.

   - index.ts: Entry point for the worker module.

   - job-type.ts: Defines different job types that workers can handle.

   - pots: Contains a file named notification.worker.ts, which likely represents a worker responsible for handling deposit notification tasks.

   - start.ts: Starts the worker.

   - worker.wrapper.ts: Wraps the worker logic.



# TypeScript is a popular choice for projects like the automated deposit notification system due to several advantages it offers over plain JavaScript. Here are some reasons why TypeScript may have been used for this project:

#### Static Typing: TypeScript introduces static typing to JavaScript, allowing you to define and enforce types for variables, function parameters, and return values. This helps catch type-related errors during development and provides better code quality and reliability.

#### Enhanced Tooling and IDE Support: TypeScript provides improved tooling and IDE support compared to JavaScript. With TypeScript, you can leverage features like code completion, intelligent code navigation, and better refactoring support. This enhances productivity and makes development more efficient.

#### Early Detection of Errors: TypeScript's static type checking catches errors early in the development process, even before running the code. This helps identify potential bugs and prevents runtime errors, leading to more robust and stable code.

#### Improved Maintainability: By using TypeScript, you can write more expressive and self-documenting code. The addition of static types makes the codebase easier to understand, maintain, and refactor. It also helps in collaboration among team members by providing clear interfaces and contracts.

#### Ecosystem and Community Support: TypeScript has a large and active community, with extensive support and a rich ecosystem of libraries and tools. This makes it easier to find resources, share code, and integrate with other frameworks and libraries.

#### Migration and Scalability: If the project grows over time or requires integration with existing JavaScript codebases, TypeScript allows for easy migration. TypeScript is a superset of JavaScript, meaning you can gradually introduce TypeScript into your codebase without having to rewrite everything at once.