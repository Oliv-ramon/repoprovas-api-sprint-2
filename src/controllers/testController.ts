import { Test } from "@prisma/client";
import { Request, Response } from "express";

import { CreateTestData } from "../repositories/testRepository.js";
import testService from "../services/testService.js";

async function find(req: Request, res: Response) {
  const { groupBy, disciplineName, teacherName } = req.query as { 
    groupBy: string;
    disciplineName?: string; 
    teacherName?: string; 
  };

  if (groupBy !== "disciplines" && groupBy !== "teachers") {
    return res.sendStatus(400);
  }

  const tests = await testService.find({ groupBy, disciplineName, teacherName });
  res.send({ tests });
}

async function updateViews(req: Request, res: Response) {
  const { testId } = req.params;
  
  await testService.updateViews(Number(testId));

  res.sendStatus(201);
}

export default {
  find,
  updateViews,
};
