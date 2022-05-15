import { get } from '../../utils/request-handlers';
import constants from '../../constants';
import { Args } from '../../utils/types';

const { catalog } = constants;

export default {
    Query: {
        variants: async () => (get(catalog + 'variants')),
        variant: async (_: any, args: Args) => (get(catalog + 'variants/' + args.id))
    },
}