import { urls } from "../common/constants";
import CatalogService from "../common/catalog.service";

export default class ProductService extends CatalogService {
    protected static readonly URL: string = urls.catalog + 'product';
}