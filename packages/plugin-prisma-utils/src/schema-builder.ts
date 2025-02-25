import SchemaBuilder, {
  BaseTypeRef,
  EnumRef,
  InputFieldRef,
  InputObjectRef,
  InputRef,
  InputShapeFromTypeParam,
  InputType,
  SchemaTypes,
} from '@pothos/core';
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

export const schemaBuilder =
  SchemaBuilder.prototype as PothosSchemaTypes.SchemaBuilder<SchemaTypes>;

const OrderByRefMap = new WeakMap<
  PothosSchemaTypes.SchemaBuilder<SchemaTypes>,
  EnumRef<'asc' | 'desc'>
>();

schemaBuilder.prismaFilter = function prismaFilter<
  Type extends InputType<SchemaTypes>,
  Ops extends OpsOptions<SchemaTypes, Type, FilterOps>,
>(type: Type, { ops, name, ...options }: PrismaFilterOptions<SchemaTypes, Type, Ops>) {
  const filterName = name ?? `${nameFromType(type, this)}Filter`;
  const ref =
    this.inputRef<
      Pick<
        FilterShape<InputShapeFromTypeParam<SchemaTypes, Type, true>>,
        Ops extends readonly string[] ? Ops[number] : keyof Ops
      >
    >(filterName);

  const opsOptions: Record<string, unknown> = Array.isArray(ops)
    ? ((ops as string[]).reduce<Record<string, {}>>((map, op) => {
        // eslint-disable-next-line no-param-reassign
        map[op] = {};
        return map;
      }, {}) as {})
    : ops;

  ref.implement({
    ...options,
    extensions: {
      ...options.extensions,
      pothosPrismaInput: true,
    },
    fields: (t) => {
      const fields: Record<string, InputFieldRef<unknown, 'InputObject'>> = {};

      for (const op of Object.keys(opsOptions)) {
        const isList = op === 'in' || op === 'notIn';
        let fieldType: InputType<SchemaTypes> | [InputType<SchemaTypes>] = type;

        if (op === 'not') {
          fieldType = ref;
        } else if (op === 'in' || op === 'notIn') {
          fieldType = [type];
        }

        fields[op] = t.field({
          required: isList ? { list: false, items: true } : false,
          type: fieldType,
          ...(opsOptions[op] as {}),
        });
      }

      return fields as never;
    },
  });

  return ref as never;
};

schemaBuilder.prismaListFilter = function prismaListFilter<
  Type extends InputType<SchemaTypes>,
  Ops extends OpsOptions<SchemaTypes, Type, FilterListOps>,
>(type: Type, { name, ops, ...options }: PrismaListFilterOptions<SchemaTypes, Type, Ops>) {
  let filterName = name;

  if (!filterName) {
    const typeName = nameFromType(type, this);

    filterName = typeName.endsWith('Filter')
      ? typeName.replace(/Filter$/, 'ListFilter')
      : `List${typeName}`;
  }

  const ref = this.inputRef(filterName);
  const opsOptions: Record<string, unknown> = Array.isArray(ops)
    ? ((ops as readonly string[]).reduce<Record<string, {}>>((map, op) => {
        // eslint-disable-next-line no-param-reassign
        map[op] = {};
        return map;
      }, {}) as {})
    : ops;

  ref.implement({
    ...options,
    extensions: {
      ...options.extensions,
      pothosPrismaInput: true,
    },
    fields: (t) => {
      const fields: Record<string, InputFieldRef<unknown, 'InputObject'>> = {};

      for (const op of Object.keys(opsOptions)) {
        fields[op] = t.field({
          required: false,
          type,
          ...(opsOptions[op] as {}),
        });
      }

      return fields as never;
    },
  });

  return ref as never;
};

schemaBuilder.orderByEnum = function orderByEnum() {
  if (OrderByRefMap.has(this)) {
    return OrderByRefMap.get(this)!;
  }

  const ref = this.enumType('OrderBy', {
    values: {
      Asc: { value: 'asc' as const },
      Desc: { value: 'desc' as const },
    },
  });

  OrderByRefMap.set(this, ref);

  return ref;
};

schemaBuilder.prismaOrderBy = function prismaOrderBy<
  Name extends keyof SchemaTypes['PrismaTypes'],
  Model extends PrismaModelTypes = SchemaTypes['PrismaTypes'][Name] extends PrismaModelTypes
    ? SchemaTypes['PrismaTypes'][Name]
    : never,
>(type: Name, { name, fields, ...options }: PrismaOrderByOptions<SchemaTypes, Model>) {
  const filterName = name ?? `${nameFromType(type, this)}OrderBy`;
  const ref = this.inputRef<InputRef<Model['OrderBy']>>(filterName);

  ref.implement({
    ...options,
    extensions: {
      ...options.extensions,
      pothosPrismaInput: true,
    },
    fields: (t) => {
      const fieldDefs: Record<string, InputFieldRef<unknown, 'InputObject'>> = {};

      const fieldMap = typeof fields === 'function' ? fields() : fields;

      Object.keys(fieldMap).forEach((field) => {
        const fieldOption = fieldMap[field as keyof typeof fieldMap];

        if (typeof fieldOption === 'function') {
          const { type: fieldType, ...fieldOptions } = (
            fieldOption as () => PothosSchemaTypes.InputFieldOptions<SchemaTypes>
          )();

          fieldDefs[field] = t.field({
            required: false,
            ...fieldOptions,
            type: fieldType,
          });
        } else if (typeof fieldOption === 'boolean') {
          fieldDefs[field] = t.field({
            required: false,
            type: this.orderByEnum(),
          });
        } else {
          fieldDefs[field] = t.field({
            required: false,
            type: fieldOption as InputRef<unknown>,
          });
        }
      });

      return fieldDefs as never;
    },
  });

  return ref as InputObjectRef<Model['OrderBy']>;
};

schemaBuilder.prismaWhere = function prismaWhere<
  Name extends keyof SchemaTypes['PrismaTypes'],
  Model extends PrismaModelTypes = SchemaTypes['PrismaTypes'][Name] extends PrismaModelTypes
    ? SchemaTypes['PrismaTypes'][Name]
    : never,
>(
  type: Name,
  { name, fields, ...options }: PrismaWhereOptions<SchemaTypes, Model>,
): InputObjectRef<Model['Where']> {
  const ref = this.inputRef<Model['Where']>(name ?? `${nameFromType(type, this)}Filter`);

  ref.implement({
    ...options,
    extensions: {
      ...options.extensions,
      pothosPrismaInput: true,
    },
    fields: (t) => {
      const fieldDefs: Record<string, InputFieldRef<unknown, 'InputObject'>> = {};
      const fieldMap = typeof fields === 'function' ? fields(t) : fields;

      Object.keys(fieldMap).forEach((field) => {
        const fieldOption = fieldMap[field as keyof typeof fieldMap]!;
        if (!fieldOption) {
          return;
        }

        if (field === 'AND' || field === 'OR' || field === 'NOT') {
          fieldDefs[field] = t.field({
            required: false,
            type: field === 'NOT' ? ref : [ref],
            ...(typeof fieldOption === 'object' ? fieldOption : {}),
          });

          return;
        }

        if (fieldOption instanceof InputFieldRef) {
          fieldDefs[field] = fieldOption as InputFieldRef<SchemaTypes, 'InputObject'>;
        } else {
          fieldDefs[field] = t.field({
            required: false,
            type: fieldOption as InputRef<unknown>,
          });
        }
      });

      return fieldDefs as never;
    },
  });

  return ref;
};

function nameFromType<Types extends SchemaTypes>(
  type: InputType<Types>,
  builder: PothosSchemaTypes.SchemaBuilder<Types>,
) {
  if (typeof type === 'string') {
    return type;
  }

  if (builder.configStore.hasConfig(type)) {
    return builder.configStore.getTypeConfig(type).name;
  }

  if (typeof type === 'function' && 'name' in type) {
    return (type as { name: string }).name;
  }

  if (type instanceof BaseTypeRef) {
    return type.name;
  }

  throw new Error(`Unable to determine name for type ${String(type)}`);
}
