# Get a Deployment

```bash
curl --get https://connect.us-central1.gcp.commercetools.com/composable-product-dev-sandbox/deployments/key=orium-ct-connect-bloomreach-discovery-deployment \
--header 'Authorization: Bearer {{ token }}' | json_pp
```

You'll get something like this:

```json
{
  "id": "64a3f767-8616-412c-85bd-62fbf4aff1cf",
  "key": "orium-ct-connect-bloomreach-discovery-deployment",
  "version": 11,
  "connector": {
    "id": "3043718c-3ce2-4168-9932-58cdb6447842",
    "version": 5,
    "name": "Bloomreach Discovery connector",
    "description": "Bloomreach Discovery connector",
    "creator": {
      "name": "IT",
      "title": "Mr",
      "email": "it@orium.com",
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
      "schedule": "0 0 * * *"
    }
  ],
  "details": {
    "build": {
      "id": "f1810281-bcb1-4987-a4ee-268baf818b4b",
      "report": {
        "entries": [
          {
            "type": "Information",
            "application": "job",
            "title": "Script for \"postDeploy\" not defined",
            "createdAt": "2023-09-12T16:08:45.556Z"
          }
        ]
      }
    }
  },
  "preview": true,
  "status": "Deployed"
}
```
