import { Request, Response } from "express";
import ShowOrderService from "../services/ShowOrderService copy";
import CreateOrderService from "../services/CreateOrderService";

export default class OrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const createOrders = new CreateOrderService();

    const order = await createOrders.execute({
      customer_id,
      products,
    });

    return response.json(order);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrder = new ShowOrderService();

    const order = await showOrder.execute({ id });

    return response.json(order);
  }
}
