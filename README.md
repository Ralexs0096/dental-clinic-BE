# CCL mentorship final project "DENTORA"

## Dentora Backend

The API endpoints for the CCL mentorship frontend application

---

### DEV environment setup

Once the project is cloned, please install the latest dependencies:

```bash
npm install
```

> **NOTE**: You'll need to do this any time `package.json` or `package-lock.json` changes.

---

### Environment variables

Please take a look at `.env.example` to set up your `.env` file in the root of the project.  
You need to configure environment variables such as the **DB URI** and the **server PORT**.

Example of `MONGODB_URI` (if using the Docker container):

```env
MONGODB_URI=mongodb://root:example@localhost:27017
```

---

### Starting MongoDB locally with Docker

To run a local MongoDB instance using Docker, follow these steps:

1. Make sure Docker is installed and running on your system.
2. In the root of the project, you have a file named `docker-compose.yml` which contains all the necessary instructions to create a container with mongo db
3. Start the MongoDB service:

    ```bash
    docker-compose up -d
    ```

This will create and start a MongoDB container accessible on `localhost:27017`.

---

### Start the project

Once MongoDB is running and the `.env` file is configured, start the project:

```bash
npm run dev
```

Now, the server will be running on the defined **PORT** in your `.env` file or the default **4000**.

---

## Documentation

To see the available endpoints, you can use the Swagger docs by visiting:

```
http://localhost:<PORT>/doc
```

Replace `<PORT>` with the actual port used by your server.
