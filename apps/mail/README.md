<h3 align="center">@webshop/mail</h3>

## Goal

This service aims to provide a simple interface for sending "beautiful" emails to customers.

The state of email clients has proved that using the same styling for emails as for the rest of the UI is hard.
Similar technologies and techniques are however used, through the use of [React Email](https://react.email).

## Requirements

In order to use this service, you will need NodeJS installed and credentials for an SMTP server.

A docker container is also available [here](https://github.com/thedatasnok/webshop/pkgs/container/webshop-mail).

## Endpoints

Due to the simplicity of this service, and the lack of public exposure we use no authentication.

The following endpoints are available in this service:

| Method | URL                           | Description                                                         |                                                   |
| ------ | ----------------------------- | ------------------------------------------------------------------- | ------------------------------------------------- |
| GET    | `/health`                     | Simple status, currently mocked in order to allow probing it in k8s | [Source](src/api/main.ts)                         |
| POST   | `/mails/order-confirmation`   | Sends an order confirmation to a customer                           | [Source](src/api/endpoints/orderConfirmation.ts)  |
| POST   | `/mails/sign-up-confirmation` | Sends a sign-up/welcome mail to a newly registered customer         | [Source](src/api/endpoints/signUpConfirmation.ts) |

The POST endpoints extend from a generic schema, which assumes the following body:

```json
{
  "to": "mail-to@noreply.org"
  // extended body, if any
}
```

## Order confirmation

The order confirmation extends from the generic schema, and accepts a key "order" containing the [OrderDetails](../../packages/contracts/src/main/java/no/ntnu/webshop/contracts/order/OrderDetails.java) DTO.

## Sign-up confirmation

The sign-up confirmation only uses the generic schema.
