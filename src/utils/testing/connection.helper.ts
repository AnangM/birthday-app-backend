import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { EntitySchema } from 'typeorm'
type Entity = Function | string | EntitySchema<any>

export const createTestDB = (
  entities: Entity[],
): TypeOrmModuleOptions => ({
  "type":"postgres",
    "host":"localhost",
    "port":5432,
    "username":"postgres",
    "password":".",
    "database":"birthday_app_test",
    entities,
    synchronize: true,
    logging: false
});