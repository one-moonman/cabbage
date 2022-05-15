import { get } from '../../utils/request-handlers';
import constants from '../../constants';
import { Args } from '../../utils/types';

const { catalog } = constants;

export default {
    Query: {
        categories: async () => (get(catalog + 'categories')),
        category: async (_: any, args: Args) => (get(catalog + 'categories/' + args.id))
    },
}