// @ts-nocheck
/* eslint-disable @typescript-eslint/no-redeclare */
import './types/global/index.ts';
import SchemaBuilderClass from './builder.ts';
import InternalFieldBuilder from './fieldUtils/builder.ts';
import InternalInputFieldBuilder from './fieldUtils/input.ts';
import InternalInterfaceFieldBuilder from './fieldUtils/interface.ts';
import InternalMutationFieldBuilder from './fieldUtils/mutation.ts';
import InternalObjectFieldBuilder from './fieldUtils/object.ts';
import InternalQueryFieldBuilder from './fieldUtils/query.ts';
import InternalRootFieldBuilder from './fieldUtils/root.ts';
import InternalSubscriptionFieldBuilder from './fieldUtils/subscription.ts';
import InternalBaseTypeRef from './refs/base.ts';
import InternalEnumRef from './refs/enum.ts';
import InternalInputListRef from './refs/input-list.ts';
import InternalInputObjectRef from './refs/input-object.ts';
import InternalInterfaceRef from './refs/interface.ts';
import InternalListRef from './refs/list.ts';
import InternalObjectRef from './refs/object.ts';
import InternalScalarRef from './refs/scalar.ts';
import InternalUnionRef from './refs/union.ts';
import type { FieldKind, NormalizeSchemeBuilderOptions, RootName, SchemaTypes } from './types/index.ts';
export * from './plugins/index.ts';
export * from './types/index.ts';
export * from './utils/index.ts';
const SchemaBuilder = SchemaBuilderClass as unknown as {
    registerPlugin: typeof SchemaBuilderClass.registerPlugin;
    allowPluginReRegistration: boolean;
    new <Types extends Partial<PothosSchemaTypes.UserSchemaTypes> = {}>(options: NormalizeSchemeBuilderOptions<PothosSchemaTypes.ExtendDefaultTypes<Types>>): PothosSchemaTypes.SchemaBuilder<PothosSchemaTypes.ExtendDefaultTypes<Types>>;
};
export default SchemaBuilder;
export const FieldBuilder = InternalFieldBuilder as new <Types extends SchemaTypes, ParentShape, Kind extends Exclude<FieldKind, RootName> = Exclude<FieldKind, RootName>>(name: string, builder: SchemaBuilderClass<Types>, kind: FieldKind, graphqlKind: PothosSchemaTypes.PothosKindToGraphQLType[FieldKind]) => PothosSchemaTypes.FieldBuilder<Types, ParentShape, Kind>;
export type RootFieldBuilder<Types extends SchemaTypes, ParentShape, Kind extends FieldKind = FieldKind> = PothosSchemaTypes.RootFieldBuilder<Types, ParentShape, Kind>;
export const RootFieldBuilder = InternalRootFieldBuilder as new <Types extends SchemaTypes, ParentShape, Kind extends FieldKind = FieldKind>(name: string, builder: SchemaBuilderClass<Types>, kind: FieldKind, graphqlKind: PothosSchemaTypes.PothosKindToGraphQLType[FieldKind]) => PothosSchemaTypes.RootFieldBuilder<Types, ParentShape, Kind>;
export type QueryFieldBuilder<Types extends SchemaTypes, ParentShape> = PothosSchemaTypes.QueryFieldBuilder<Types, ParentShape>;
export const QueryFieldBuilder = InternalQueryFieldBuilder as new <Types extends SchemaTypes, ParentShape>(builder: SchemaBuilderClass<Types>) => PothosSchemaTypes.QueryFieldBuilder<Types, ParentShape>;
export type MutationFieldBuilder<Types extends SchemaTypes, ParentShape> = PothosSchemaTypes.MutationFieldBuilder<Types, ParentShape>;
export const MutationFieldBuilder = InternalMutationFieldBuilder as new <Types extends SchemaTypes, ParentShape>(builder: SchemaBuilderClass<Types>) => PothosSchemaTypes.MutationFieldBuilder<Types, ParentShape>;
export type SubscriptionFieldBuilder<Types extends SchemaTypes, ParentShape> = PothosSchemaTypes.SubscriptionFieldBuilder<Types, ParentShape>;
export const SubscriptionFieldBuilder = InternalSubscriptionFieldBuilder as new <Types extends SchemaTypes, ParentShape>(builder: SchemaBuilderClass<Types>) => PothosSchemaTypes.SubscriptionFieldBuilder<Types, ParentShape>;
export type ObjectFieldBuilder<Types extends SchemaTypes, ParentShape> = PothosSchemaTypes.ObjectFieldBuilder<Types, ParentShape>;
export const ObjectFieldBuilder = InternalObjectFieldBuilder as new <Types extends SchemaTypes, ParentShape>(name: string, builder: SchemaBuilderClass<Types>) => PothosSchemaTypes.ObjectFieldBuilder<Types, ParentShape>;
export type InterfaceFieldBuilder<Types extends SchemaTypes, ParentShape> = PothosSchemaTypes.InterfaceFieldBuilder<Types, ParentShape>;
export const InterfaceFieldBuilder = InternalInterfaceFieldBuilder as new <Types extends SchemaTypes, ParentShape>(name: string, builder: SchemaBuilderClass<Types>) => PothosSchemaTypes.InterfaceFieldBuilder<Types, ParentShape>;
export type InputFieldBuilder<Types extends SchemaTypes, Kind extends "Arg" | "InputObject" = "Arg" | "InputObject"> = PothosSchemaTypes.InputFieldBuilder<Types, Kind>;
export const InputFieldBuilder = InternalInputFieldBuilder as new <Types extends SchemaTypes, Kind extends "Arg" | "InputObject" = "Arg" | "InputObject">(builder: SchemaBuilderClass<Types>, kind: Kind, typename: string) => PothosSchemaTypes.InputFieldBuilder<Types, Kind>;
export type BaseTypeRef = PothosSchemaTypes.BaseTypeRef;
export const BaseTypeRef = InternalBaseTypeRef as new (kind: "Enum" | "InputObject" | "Interface" | "Object" | "Scalar" | "Union", name: string) => PothosSchemaTypes.BaseTypeRef;
export type EnumRef<T, P = T> = PothosSchemaTypes.EnumRef<T, P>;
export const EnumRef = InternalEnumRef as new <T, P = T>(name: string) => PothosSchemaTypes.EnumRef<T, P>;
export type InputObjectRef<T> = PothosSchemaTypes.InputObjectRef<T>;
export const InputObjectRef = InternalInputObjectRef as new <T>(name: string) => PothosSchemaTypes.InputObjectRef<T>;
export type InputListRef<Types extends SchemaTypes, T> = PothosSchemaTypes.InputListRef<Types, T>;
export const InputListRef = InternalInputListRef as new <Types extends SchemaTypes, T>(name: string, required: boolean) => PothosSchemaTypes.InputListRef<Types, T>;
export type InterfaceRef<T, P = T> = PothosSchemaTypes.InterfaceRef<T, P>;
export const InterfaceRef = InternalInterfaceRef as new <T, P = T>(name: string) => PothosSchemaTypes.InterfaceRef<T, P>;
export type ObjectRef<T, P = T> = PothosSchemaTypes.ObjectRef<T, P>;
export const ObjectRef = InternalObjectRef as new <T, P = T>(name: string) => PothosSchemaTypes.ObjectRef<T, P>;
export type ScalarRef<T, U, P = T> = PothosSchemaTypes.ScalarRef<T, U, P>;
export const ScalarRef = InternalScalarRef as new <T, U, P = T>(name: string) => PothosSchemaTypes.ScalarRef<T, U, P>;
export type UnionRef<T, P = T> = PothosSchemaTypes.UnionRef<T, P>;
export const UnionRef = InternalUnionRef as new <T, P = T>(name: string) => PothosSchemaTypes.UnionRef<T, P>;
export type ListRef<Types extends SchemaTypes, T, P = T> = PothosSchemaTypes.ListRef<Types, T, P>;
export const ListRef = InternalListRef as new <Types extends SchemaTypes, T, P = T>(name: string, nullable: boolean) => PothosSchemaTypes.ListRef<Types, T, P>;
export { default as BuildCache } from './build-cache.ts';
export { default as BuiltinScalarRef } from './refs/builtin-scalar.ts';
export { default as FieldRef } from './refs/field.ts';
export { default as InputTypeRef } from './refs/input.ts';
export { default as InputFieldRef } from './refs/input-field.ts';
export { ImplementableInputObjectRef } from './refs/input-object.ts';
export { ImplementableInterfaceRef } from './refs/interface.ts';
export { ImplementableObjectRef } from './refs/object.ts';
export { default as OutputTypeRef } from './refs/output.ts';
