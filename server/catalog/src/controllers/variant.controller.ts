import { Request, Response } from "express";
import { NotFound } from 'http-errors';
import { Variant } from "../models/variant.model";

export default {
    // GET -> /
    getAll: async (_: Request, res: Response) => {
        const all = await Variant.find({}).exec();
        return res.status(200).json(all);
    },
    // GET -> /:slug
    getOneBySlug: async (req: Request, res: Response) => {
        const { slug } = req.params;
        const doc = await Variant.findOne({ slug }).exec();
        if (!doc) throw new NotFound();
        return res.status(200).json(doc);
    }
}