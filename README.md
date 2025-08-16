# OrderManager

A backend service to manage all the orders and to view their status.
Can sort all the orders according to their deliveryDate, cost...
Can filter orders based on company, catagory, and cost range of product present in order

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

*   [Node.js](https://nodejs.org/en/) (v18.x or later recommended)
*   [npm](https://www.npmjs.com/) (usually comes with Node.js)
*   [Git](https://git-scm.com/)
*   [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

## Installation and Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/nayangaripelly/OrderManager.git
    cd orderManager
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add the following variables. You can use the `.env.example` file as a template.

    ```
    PORT=3000
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    ```

## Running the Application

1.  **Build the project:**

    ```bash
    npm run build
    ```

2.  **Start the server:**

    ```bash
    npm run start
    ```

    The server will start on the port specified in your `.env` file (default is 3000).

    Alternatively, you can use the `dev` script to build and start the server in one command:

    ```bash
    npm run dev
    ```