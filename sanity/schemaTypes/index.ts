import { type SchemaTypeDefinition } from 'sanity';
import { categoryType } from './categoryType';
import { blockContentType } from './blockContentType';
import { addressType } from './addressType';
import { authorType } from './authorType';
import { blogCategoryType } from './blogCategoryType';
import { blogType } from './blogType';
import { brandType } from './brandTypes';
import { orderType } from './orderType';
import { productType } from './productType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    addressType,
    authorType,
    blockContentType,
    blogCategoryType,
    blogType,
    brandType,
    categoryType,
    orderType,
    productType,
  ],
};
