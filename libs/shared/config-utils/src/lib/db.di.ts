import { Inject } from '@nestjs/common';
import { dbConfiguration } from './db.configuration';

export const InjectDbConfig = () => Inject(dbConfiguration.KEY);
