import { PaginationMetadataModel } from './models/pagination-metadata.model';

export interface ResponseData<D> {
  data: D[];
  metadata?: {
    pagination?: PaginationMetadataModel;
  };
}
