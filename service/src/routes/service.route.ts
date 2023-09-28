import { Router } from 'express';
import { getHandleBloomreachDiscoveryCatalogIngestion } from '../controllers/handleBloomreachDiscoveryCatalogIngestion.controller';

const serviceRouter = Router();

serviceRouter.get(
  '/bloomreach-discovery-catalog-ingestion',
  getHandleBloomreachDiscoveryCatalogIngestion
);

export default serviceRouter;
