import { InputShapeFromTypeParam, InputType, SchemaTypes } from '@pothos/core';
import { PrismaModelTypes } from '@pothos/plugin-prisma';
import {
  FilterListOps,
  FilterOps,
  FilterShape,
  OpsOptions,
  PrismaFilterOptions,
  PrismaListFilterOptions,
  PrismaOrderByOptions,
  PrismaWhereOptions,
} from './types';

import type { PrismaUtilsPlugin } from '.';

declare global {
  export namespace PothosSchemaTypes {
    export interface Plugins<Types extends SchemaTypes> {
      prismaUtils: PrismaUtilsPlugin<Types>;
    }

    export interface SchemaBuilder<Types extends SchemaTypes> {
      prismaListFilter: <
        Type extends InputType<Types>,
        Ops extends OpsOptions<Types, Type, FilterListOps>,
      >(
        type: Type,
        options: PrismaListFilterOptions<Types, Type, Ops>,
      ) => InputObjectRef<{
        [K in Ops extends string[] ? Ops[number] : keyof Ops]: InputShapeFromTypeParam<
          Types,
          Type,
          true
        >;
      }>;
      prismaFilter: <Type extends InputType<Types>, Ops extends OpsOptions<Types, Type, FilterOps>>(
        type: Type,
        options: PrismaFilterOptions<Types, Type, Ops>,
      ) => InputObjectRef<
        Pick<
          FilterShape<InputShapeFromTypeParam<Types, Type, true>>,
          Ops extends readonly string[] ? Ops[number] : keyof Ops
        >
      >;

      prismaOrderBy: <
        Name extends keyof Types['PrismaTypes'],
        Model extends PrismaModelTypes = Types['PrismaTypes'][Name] extends PrismaModelTypes
          ? Types['PrismaTypes'][Name]
          : never,
      >(
        name: Name,
        options: PrismaOrderByOptions<Types, Model>,
      ) => InputObjectRef<Model['OrderBy']>;

      orderByEnum: () => EnumRef<'asc' | 'desc'>;

      prismaWhere: <
        Name extends keyof Types['PrismaTypes'],
        Model extends PrismaModelTypes = Types['PrismaTypes'][Name] extends PrismaModelTypes
          ? Types['PrismaTypes'][Name]
          : never,
      >(
        type: Name,
        options: PrismaWhereOptions<Types, Model>,
      ) => InputObjectRef<Model['Where']>;
    }
  }
}
