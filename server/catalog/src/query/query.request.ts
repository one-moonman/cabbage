import { Request } from "express";
import { CategoryDocument } from "../categories/entities/category.entity";

export default interface RequestWithCategory extends Request {
    category: CategoryDocument
}