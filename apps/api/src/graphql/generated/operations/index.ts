import { DocumentNode } from 'graphql';
import { IResolvers } from 'apollo-server-express';
import { baseSchema } from './baseSchema';
import { entityResolvers } from './entityResolvers';
import { entitySchema } from './entitySchema';
import { filterSchema } from './filterSchema';
import { filtersResolvers } from './filterResolvers';
import { widgetResolvers } from './widgetResolvers';
import { widgetSchema } from './widgetSchema';

export const generatedResolvers: IResolvers[] = [filtersResolvers, entityResolvers, widgetResolvers];

export const generatedSchema: DocumentNode[] = [filterSchema, baseSchema, entitySchema, widgetSchema];
