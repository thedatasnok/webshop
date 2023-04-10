<div align="center">
  <img align="center" width="300" src="docs/assets/logo-big.svg" />
</div>
<br />
<p align="center">A webshop group project for the courses IDATA2301 and IDATA2306 at NTNU</p>

<div align="center">
  <a href="#getting-started">Getting started</a> •
  <a href="#">View demo</a> •
  <a href="#license">License</a>
</div>

## Project structure

```
├───apps
│   ├───backend (Spring Boot backend)
│   ├───storefront (customer-facing frontend)
│   └───dashboard (admin frontend)
└───packages
    ├───contracts (DTOs - shared between frontends and backend, including validation)
    ├───migrations (Liquibase database migrations)
    └───ui (shared UI components & configuration)
```

The frontend is split in two as noted above, the reason why this is done is because the layout and functionality of the two are quite different. The storefront is a customer-facing webshop, while the dashboard is an admin panel for managing the webshop. 

Any shared UI components are placed in the `ui` package. This helps avoid code duplication. 

Migrations are split into it's own package, but is a development dependency for the backend. The motivation for splitting the migrations out from the backend is to allow for running them in a init container before the backend is started. 

## Architecture

A high-level overview of the architecture is in the diagram below, and should depict how things are deployed in our production environment.


<div align="center">
  <img alt="Architectural diagram" src="docs/diagrams/architecture.drawio.svg" />
</div>


It assumed that the application is going to be deployed as a set of containers to a Kubernetes cluster, however running it within any other container orchestration system should be possible. The reverse proxy part would have to be swapped out with an equivalent solution for the chosen system. 

For Kubernetes it is assumed that the cluster has a ClusterIssuer from [cert-manager](https://cert-manager.io/) installed, which will be used to issue TLS certificates.
ExternalDNS on the other hand is not a requirement. But it is a "nice-to-have" as it can automate setting up A records for the services based on the ingress configuration. 


## Getting started (WIP)

In order to get started with development, you will need the following:

- Java 17 (LTS)
- Docker

With those installed, you can:

1. Clone the repository using your preferred method

2. Set up a run/debug config:

    `no.ntnu.webshop.WebshopApplication` as the entry point for the backend
    
    `no.ntnu.webshop.migrations.MigrationsApplication` as the entry point to run migrations

    A default launch.json is already provided for VSCode.

3. Set up the following environment variables in an `.env` file and place it in the root of the project (See `.env.example`):

    `POSTGRES_HOST` address of the database

    `POSTGRES_PORT` port of the database

    `POSTGRES_DB` name of the database

    `POSTGRES_USER` user to authenticate as when connecting to the database

    `POSTGRES_PASSWORD` password of the aforementioned user

    `TOKEN_ISSUER` -

    `ACCESS_TOKEN_SECRET` -

    `REFRESH_TOKEN_SECRET` -

    If using Amazon S3, also set the following:

    `S3_ACCESS_KEY` -

    `S3_SECRET_ACCESS_KEY` -

    `S3_REGION_NAME` -

    `S3_BUCKET_NAME` -

4. Start the docker container by running `docker compose up -d`

5. Start the backend through the debug menu

6. Start the frontend by running `pnpm --filter @webshop/storefront dev`

Once completed, you can access the frontend at http://localhost:5173/


## License

Distributed under the [MIT License](LICENSE).

