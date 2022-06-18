import { Ctx, Mutation, Resolver } from "type-graphql";
import { Context } from "../../common/types";
import OrderService from "./order.service";
import { Order, OrderResponse } from "./order.type";

@Resolver(Order)
export default class OrderResolver {
    private readonly orderService = new OrderService();

    @Mutation(() => OrderResponse)
    async saveOrder(@Ctx() { session }: Context) {
        return this.orderService.saveOrder(session);
    }
}