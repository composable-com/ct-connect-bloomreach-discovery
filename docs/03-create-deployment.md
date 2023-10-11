# Create a Deployment

Deployments are created by posting a DeploymentDraft to the Deployments endpoint.

You must include a reference to the Connector that will be deployed (using the Connector's `id` or `key` and `version`), the Region where the deployment will be made, and also the environment variables necessary for the Connector to operate. It is recommended to include a key to identify your Deployment.

```bash
curl --location 'https://connect.us-central1.gcp.commercetools.com/composable-product-dev-sandbox/deployments' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{ access_token }}' \
--data-raw '{
  "key": "orium-ct-connect-bloomreach-discovery-deployment",
  "connector": {
    "key": "orium-ct-connect-bloomreach-discovery",
    "staged": true,
    "version": 11
  },
  "region": "us-central1.gcp",
  "configurations": [
    {
      "applicationName": "job",
      "standardConfiguration": [
        {
          "key": "CTP_REGION",
          "value": "us-central1.gcp"
        }
      ],
      "securedConfiguration": [
        {
          "key": "CTP_CLIENT_ID",
          "value": "{{ SECRET }}"
        },
        {
          "key": "CTP_CLIENT_SECRET",
          "value": "{{ SECRET }}"
        },
        {
          "key": "CTP_PROJECT_KEY",
          "value": "composable-product-dev-sandbox"
        },
        {
          "key": "CTP_SCOPE",
          "value": "manage_project:composable-product-dev-sandbox manage_api_clients:composable-product-dev-sandbox view_audit_log:composable-product-dev-sandbox"
        },
        {
          "key": "BLOOMREACH_DISCOVERY_ACCOUNT_ID",
          "value": "7340"
        },
        {
          "key": "BLOOMREACH_DISCOVERY_AUTH_KEY",
          "value": "{{ SECRET }}"
        },
        {
          "key": "BLOOMREACH_DISCOVERY_DOMAIN_KEY",
          "value": "sandbox_orium"
        },
        {
          "key": "BLOOMREACH_DISCOVERY_API_KEY",
          "value": "{{ SECRET }}"
        },
        {
          "key": "BLOOMREACH_DISCOVERY_CATALOG_LOCALE",
          "value": "en-US"
        }
      ]
    },
    {
      "applicationName": "service",
      "standardConfiguration": [
        {
          "key": "CTP_REGION",
          "value": "us-central1.gcp"
        }
      ],
      "securedConfiguration": [
        {
          "key": "CTP_CLIENT_ID",
          "value": "{{ SECRET }}"
        },
        {
          "key": "CTP_CLIENT_SECRET",
          "value": "{{ SECRET }}"
        },
        {
          "key": "CTP_PROJECT_KEY",
          "value": "composable-product-dev-sandbox"
        },
        {
          "key": "CTP_SCOPE",
          "value": "manage_project:composable-product-dev-sandbox manage_api_clients:composable-product-dev-sandbox view_audit_log:composable-product-dev-sandbox"
        },
        {
          "key": "BLOOMREACH_DISCOVERY_ACCOUNT_ID",
          "value": "7340"
        },
        {
          "key": "BLOOMREACH_DISCOVERY_AUTH_KEY",
          "value": "{{ SECRET }}"
        },
        {
          "key": "BLOOMREACH_DISCOVERY_DOMAIN_KEY",
          "value": "sandbox_orium"
        },
        {
          "key": "BLOOMREACH_DISCOVERY_API_KEY",
          "value": "{{ SECRET }}"
        },
        {
          "key": "BLOOMREACH_DISCOVERY_CATALOG_LOCALE",
          "value": "en-US"
        }
      ]
    }
  ]
}'
```
