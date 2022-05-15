import { get } from '../utils/request-handlers';
import constants from '../constants';
import { Args } from '../utils/types';

const { catalog } = constants;

export default {
    Query: {
        catalog: async (_: any, args: Args) => {
            console.log(args)
            if (args.product && args.variant) {
                // make request to session -> cart microservice
                // const taken = .....
                // pass taken
                return await get(catalog + 'query/' + args.category + '/' + args.product + '/' + args.variant + '?taken=0');
            }
            if (args.product && !args.variant) {
                return await get(catalog + 'query/' + args.category + '/' + args.product);
            }
            return await get(catalog + 'query/' + args.category);
        }

    },
    Catalog: {
        __resolveType(obj, context, info) {
            if (obj.stock) {
                return 'Variant';
            }
            if (obj.variants) {
                return 'Product';
            }
            return 'Category';
        },

    },
}