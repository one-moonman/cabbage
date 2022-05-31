import { Ctx, Query, Resolver } from "type-graphql";
import axios from "axios";
import { Context } from "../utils/types";
import CartItem, { CartItemResponse } from "../types/cart-item.type";

import { urls } from "../constants";
const URL = urls + 'cart-items/';

@Resolver(returns => CartItem)
export default class CartItemResolver {

    @Query(returns => [CartItem])
    async getItems(@Ctx() { req }: Context) {
        const response = await axios.get(URL + req.sessionID)
            .catch(error => { throw new Error(error.response.data.message) });
        return response.data;
    }
}