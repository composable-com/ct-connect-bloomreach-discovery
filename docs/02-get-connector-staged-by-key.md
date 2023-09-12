# Query ConnectorStaged

```bash
curl --get https://connect.us-central1.gcp.commercetools.com/connectors/drafts/key=orium-ct-connect-bloomreach-discovery \
--header 'Authorization: Bearer {{ token }}' | json_pp
```

You'll get something like this:

```json
{
  "id": "3043718c-3ce2-4168-9932-58cdb6447842",
  "key": "orium-ct-connect-bloomreach-discovery",
  "version": 5,
  "name": "Bloomreach Discovery connector",
  "description": "Bloomreach Discovery connector",
  "creator": {
    "name": "IT",
    "email": "it@orium.com",
    "company": "Orium",
    "title": "Mr"
  },
  "repository": {
    "tag": "v1.1.0",
    "url": "git@github.com:composable-com/ct-connect-bloomreach-discovery.git"
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
  "private": true,
  "supportedRegions": ["us-central1.gcp"],
  "hasChanges": true,
  "alreadyListed": false,
  "status": "Draft",
  "isPreviewable": "true",
  "previewableReport": {
    "entries": [
      {
        "type": "Information",
        "title": "Image security analysis check succeeded",
        "createdAt": "2023-09-11T16:30:43.821Z"
      },
      {
        "type": "Information",
        "title": "SAST and SCA analysis check succeeded",
        "createdAt": "2023-09-11T16:30:43.824Z"
      },
      {
        "type": "Information",
        "title": "Connector specification file validation check succeeded",
        "createdAt": "2023-09-11T16:30:43.825Z"
      }
    ]
  }
}
```
