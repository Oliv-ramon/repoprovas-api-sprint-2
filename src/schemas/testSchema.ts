import Joi from "joi";
import { CreateTestData } from "../repositories/testRepository";

export const testSchema = Joi.object<CreateTestData>({
  name: Joi.string().required(),
  pdfUrl: Joi.string().uri().required(),
  categoryId: Joi.number().greater(0).required(),
  teacherDisciplineId: Joi.number().greater(0).required(),
  views: Joi.number().min(0),
});
