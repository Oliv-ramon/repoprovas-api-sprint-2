import Joi from "joi";
import { CreateTestData } from "../services/testService.js";

export const testSchema = Joi.object<CreateTestData>({
  name: Joi.string().required(),
  pdfUrl: Joi.string().uri().required(),
  categoryId: Joi.number().greater(0).required(),
  disciplineId: Joi.number().greater(0).required(),
  teacherId: Joi.number().greater(0).required(),
});
