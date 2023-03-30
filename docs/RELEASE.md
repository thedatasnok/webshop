# Releasing new versions of the project

1. Use the gradle task for versioning the project

```bash
./gradlew updateVersion -DnewVersion="1.0.0"
```

2. Push the changes

```bash
git push
git push --tags
```

The rest of the work is handled by GitHub Actions, where the following steps are executed:

- Building the project by producing docker images for each module

- Publishing the docker images to the GitHub Container Registry

- Use the [helm chart](../helm) to update container image versions in the Kubernetes cluster

## Notes on the Gradle task

The Gradle task is meant as a convenience tool to synchronize the versions of the project.
The task will update versions in both NodeJS (PNPM) and Java (Gradle) projects.

The task will not push the changes to the repository, so you need to do that manually just in case you want to review the changes.

This will allow the project modules to consistently read the same version if needed, e.g. Swagger API docs, Admin dashboard UI, etc.

## Setting up new environments

### Prerequisites

- A Kubernetes cluster or a host with Docker installed

If you're using Kubernetes the following is required:

- Let's Encrypt ClusterIssuer using Cert Manager
- ExternalDNS
- A namespace to deploy to (and a Service Account, with a token that can be used to authenticate to the Kubernetes API)

### Defining environments in GitHub

The environments are defined in the Environments section of the GitHub repository settings.

The following environment variables need to be defined:

- `K8S_API_URL` the URL to the Kubernetes API
- `K8S_NAMESPACE` the namespace to deploy to
- `HOSTNAME` the DNS name/hostname to use for ingress
- `K8S_CLUSTER_ISSUER` the cluster issuer to use for TLS certificates

The following environment secrets need to be defined:

- `K8S_SECRET` the secret for the Kubernetes cluster (needs permissions to create deployments, services, ingresses, etc.)
- `S3_ACCESS_KEY` the access key for the S3 bucket
- `S3_SECRET_ACCESS_KEY` the secret access key for the S3 bucket
- `S3_REGION_NAME` the name of the region where the S3 bucket is located
- `S3_BUCKET_NAME` the S3 bucket name

After defining a new environment, the environment needs to be deployed to.
This can be done by updating the workflow file with a job for the new environment.

Should you want to deploy to a new environment using helm without using GitHub Actions, see the [README](../helm/README.md) in the helm chart directory.
