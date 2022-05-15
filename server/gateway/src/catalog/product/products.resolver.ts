import { get } from '../../utils/request-handlers';
import constants from '../../constants';
import { Args } from '../../utils/types';

const { catalog } = constants;

export default {
    Query: {
        products: async () => (get(catalog + 'products')),
        product: async (_: any, args: Args) => (get(catalog + 'products/' + args.id))
    },
}