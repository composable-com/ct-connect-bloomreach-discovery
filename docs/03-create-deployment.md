# Create a Deployment

Deployments are created by posting a DeploymentDraft to the Deployments endpoint.

You must include a reference to the Connector that will be deployed (using the Connector's `id` or `key` and `version`), the Region where the deployment will be made, and also the environment variables necessary for the Connector to operate. It is recommended to include a key to identify your Deployment.

```bash
curl --location 'https://connect.us-central1.gcp.commercetools.com/composable-product-dev-sandbox/deployments' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{ token }}' \
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
    }
  ]
}'
```

You'll get something like this:

```json
{
  "id": "64a3f767-8616-412c-85bd-62fbf4aff1cf",
  "key": "orium-ct-connect-bloomreach-discovery-deployment",
  "version": 1,
  "connector": {
    "id": "3043718c-3ce2-4168-9932-58cdb6447842",
    "version": 5,
    "name": "Bloomreach Discovery connector",
    "description": "Bloomreach Discovery connector",
    "creator": {
      "name": "Emiliano Mateu",
      "title": "Mr",
      "email": "emiliano.mateu@orium.com",
      "company": "Orium"
    },
    "repository": {
      "url": "git@github.com:composable-com/ct-connect-bloomreach-discovery.git",
      "tag": "v1.1.0"
    },
    "configurations": [
      {
        "applicationName": "job",
        "applicationType": "job",
        "standardConfiguration": [
          {
            "key": "CTP_REGION",
            "description": "commercetools Composable Commerce API region"
          }
        ],
        "securedConfiguration": [
          {
            "key": "CTP_PROJECT_KEY",
            "description": "commercetools Composable Commerce project key"
          },
          {
            "key": "CTP_CLIENT_ID",
            "description": "commercetools Composable Commerce client ID"
          },
          {
            "key": "CTP_CLIENT_SECRET",
            "description": "commercetools Composable Commerce client secret"
          },
          {
            "key": "CTP_SCOPE",
            "description": "commercetools Composable Commerce client scope"
          },
          {
            "key": "BLOOMREACH_DISCOVERY_ACCOUNT_ID",
            "description": "Bloomreach Discovery Account Id"
          },
          {
            "key": "BLOOMREACH_DISCOVERY_AUTH_KEY",
            "description": "Bloomreach Discovery Auth Key"
          },
          {
            "key": "BLOOMREACH_DISCOVERY_DOMAIN_KEY",
            "description": "Bloomreach Discovery Domain Key"
          },
          {
            "key": "BLOOMREACH_DISCOVERY_API_KEY",
            "description": "Bloomreach Discovery API Key"
          },
          {
            "key": "BLOOMREACH_DISCOVERY_CATALOG_LOCALE",
            "description": "Bloomreach Discovery Catalog Locale"
          }
        ]
      }
    ],
    "supportedRegions": ["us-central1.gcp"],
    "certified": false
  },
  "deployedRegion": "us-central1.gcp",
  "applications": [
    {
      "id": "91ad8471-cd12-4f8c-9c86-881b1586f224",
      "applicationName": "job",
      "standardConfiguration": [
        { "key": "CTP_REGION", "value": "us-central1.gcp" }
      ],
      "securedConfiguration": [
        { "key": "CTP_CLIENT_ID", "value": "****" },
        { "key": "CTP_CLIENT_SECRET", "value": "****" },
        { "key": "CTP_PROJECT_KEY", "value": "****" },
        { "key": "CTP_SCOPE", "value": "****" },
        { "key": "BLOOMREACH_DISCOVERY_ACCOUNT_ID", "value": "****" },
        { "key": "BLOOMREACH_DISCOVERY_AUTH_KEY", "value": "****" },
        { "key": "BLOOMREACH_DISCOVERY_DOMAIN_KEY", "value": "****" },
        { "key": "BLOOMREACH_DISCOVERY_API_KEY", "value": "****" },
        { "key": "BLOOMREACH_DISCOVERY_CATALOG_LOCALE", "value": "*****" }
      ]
    }
  ],
  "details": {},
  "preview": true,
  "status": "Deploying"
}
```
