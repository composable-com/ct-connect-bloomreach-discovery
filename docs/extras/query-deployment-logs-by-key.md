# Query Deployment logs by Key

```bash
curl --get https://connect.us-central1.gcp.commercetools.com/composable-product-dev-sandbox/deployments/key=orium-ct-connect-bloomreach-discovery-deployment/logs \
--header 'Authorization: Bearer {{ access_token }}' | json_pp
```
