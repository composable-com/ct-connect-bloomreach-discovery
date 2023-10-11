# Bloomreach Discovery commercetools connector

<img height="110" src="https://github.com/oriuminc/ct-connect-bloomreach/blob/main/_logos.svg" />

The Bloomreach Discovery commercetools connector was created by [Orium](https://orium.com/), and provides the following features:

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

> Here you have an example for deployment creation: [docs/03-create-deployment.md](docs/03-create-deployment.md)

## Uninstalling the connector

In order to uninstall the connector, you’ll need to [send the appropriate HTTP request and delete it](https://docs.commercetools.com/connect/deployments#delete-deployment).

## FAQ

### When will the products get synced on Bloomreach?

- The connector [runs every day at 00:00 UTC](blob/main/connect.yaml#L6), so the products will be synced once per day. If you have just installed the connector, you'll need to wait until the next scheduled job at 00:00 UTC for the products to be synced.

### Where is the mapping for _products_ defined?

- We map the commercetools products data into Bloomreach in `src/services/bloomreach-discovery-catalog-ingestion.ts`.

### Why do we need the `BLOOMREACH_DISCOVERY_CATALOG_LOCALE` env variable?

- By default, commercetools has built-in i18n support. In order to consume the catalog data, we must specify the desired [`LocalizedString`](https://docs.commercetools.com/api/types#localizedstring).

### What is the `COMMERCETOOLS_DEPLOYMENT_KEY` env variable for?

- When deploying a connector you'll be asked to define a "deployment key". This connector also needs the deployment key to be defined as an env variable to work properly.

## Useful links

- https://documentation.bloomreach.com/discovery/reference/introduction
- https://documentation.bloomreach.com/discovery/reference/format-your-data-product
- https://documentation.bloomreach.com/discovery/recipes/product-catalog-format-your-data
