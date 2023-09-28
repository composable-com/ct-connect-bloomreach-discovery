# Bloomreach Discovery commercetools connector

<img height="110" src="https://github.com/oriuminc/ct-connect-bloomreach/blob/main/_logos.svg" />

The Bloomreach Discovery commercetools connector was created by [Orium](https://orium.com/), and provides the following features:

- Ability to initially load all products from commercetools to Bloomreach Discovery when the connector is installed
- Ability to automatically synchronize all products from commercetools to Bloomreach Discovery through a scheduled task

## Overview

This connector syncs commercetools data with both Bloomreach Discovery.

Once per day your commercetools products will be synchronized with Bloomreach Discovery.

## Pre-requisites

- commercetools Account
- [commercetools API keys](https://docs.commercetools.com/getting-started/create-api-client) (“Admin client”)
- Bloomreach Discovery Account

_The account info looks like this:_

```
smAccountId	7340
smAuthKey	ojvyt91lkrmzy1rn
smDomainKey	sandbox_orium
DataConnect API Key (staging)  sandbox_orium-r5361234-ab73-4307-y47d-496369911853
DataConnect API Key (prod)  sandbox_orium-r5361234-ab73-4307-y47d-496369911853
```

## Installing the connector

In order to install the connector in your commercetools project, you'll need to deploy it. Refer to the [commercetools connect deployment documentation](https://docs.commercetools.com/connect/concepts#deployments).

Setup the required environment variables when you [create the deployment](https://docs.commercetools.com/connect/getting-started#create-a-deployment):

- `CTP_CLIENT_ID`
- `CTP_CLIENT_SECRET`
- `CTP_PROJECT_KEY`
- `CTP_SCOPE`
- `CTP_REGION`
- `BLOOMREACH_DISCOVERY_ACCOUNT_ID`
- `BLOOMREACH_DISCOVERY_AUTH_KEY`
- `BLOOMREACH_DISCOVERY_DOMAIN_KEY`
- `BLOOMREACH_DISCOVERY_API_KEY`
- `BLOOMREACH_DISCOVERY_CATALOG_LOCALE`
- `COMMERCETOOLS_DEPLOYMENT_KEY`
- `BASIC_AUTH_SECRET`

> Here you have an example for deployment creation: [docs/03-create-deployment.md](docs/03-create-deployment.md)

### After deploying (optional)

The connector setups a cronjob that will sync products every 24 hours. This means, the products will be automatically synced in no more than 24 hours after deploying the connector.

In order to manually trigger a sync, you'll need to send the appropriate HTTP request.

#### Sending the HTTP request to manually sync

**1]** Get the deployment details and find the service url.

```bash
curl --get https://connect.us-central1.gcp.commercetools.com/{{ CTP_CLIENT_ID }}/deployments/key={{ COMMERCETOOLS_DEPLOYMENT_KEY }} \
--header 'Authorization: Bearer {{ access_token }}' | json_pp | grep https://
```

> _Replace `{{ CTP_CLIENT_ID }}` and `{{ COMMERCETOOLS_DEPLOYMENT_KEY }}` with the values used when creating the deployment._
>
> _[How to get the {{ access_token }}?](https://docs.commercetools.com/api/authorization#client-credentials-flow)_

The url will look like this `https://service-2da6408a-5e4e-493e-a413-c248f2c37174.us-central1.gcp.preview.commercetools.app/service`

**2]** After getting the service url, send the HTTP request to trigger the products sync.

```bash
curl -u {{ CTP_PROJECT_KEY }}:{{ BASIC_AUTH_SECRET }} \
https://service-2da6408a-5e4e-493e-a413-c248f2c37174.us-central1.gcp.preview.commercetools.app/service/bloomreach-discovery-catalog-ingestion
```

> _Replace `{{ CTP_PROJECT_KEY }}` and `{{ BASIC_AUTH_SECRET }}` with the values you used when creating the deployment._
> 
> _Replace `https://service-2da6408a-5e4e-493e-a413-c248f2c37174.us-central1.gcp.preview.commercetools.app/service` with the service url you got in the previous step._

## Uninstalling the connector

In order to uninstall the connector, you’ll need to [send the appropriate HTTP request and delete it](https://docs.commercetools.com/connect/deployments#delete-deployment).

## FAQ

### Where is the mapping for _products_ defined?

- We map the commercetools products data into Bloomreach in `src/services/bloomreach-discovery-catalog-ingestion.ts`.

### Why do we need the `BLOOMREACH_DISCOVERY_CATALOG_LOCALE` env variable?

- By default, commercetools has built-in i18n support. In order to consume the catalog data, we must specify the desired [`LocalizedString`](https://docs.commercetools.com/api/types#localizedstring).

### What is the `BASIC_AUTH_SECRET` env variable for?

- The connector cronjob will sync products using an endpoint exposed by the connector itself. This endpoint is secured using a [basic http authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication), where the username is the `CTP_PROJECT_KEY` and the password the `BASIC_AUTH_SECRET`.

### What is the `COMMERCETOOLS_DEPLOYMENT_KEY` env variable for?

- When deploying a connector you'll be asked to define a "deployment key". This connector also needs the deployment key to be defined as an env variable to work properly.

## Useful links

- https://documentation.bloomreach.com/discovery/reference/introduction
- https://documentation.bloomreach.com/discovery/reference/format-your-data-product
- https://documentation.bloomreach.com/discovery/recipes/product-catalog-format-your-data
