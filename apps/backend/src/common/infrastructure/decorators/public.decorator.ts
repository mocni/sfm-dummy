import { SetMetadata } from '@nestjs/common';

import { decoratorMetadataKey } from './constants/decorator-metadata-key.constants';

// USED TO SET API ENDPOINTS PUBLICLY AVAILABLE
export const Public = () => SetMetadata(decoratorMetadataKey.IS_PUBLIC, true);
