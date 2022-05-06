import express from "express";
import { NodeMailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-respository";
import { SubmitFeedbackService } from "./services/submit-feedback-service";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodeMailerMailAdapter();

  const submitFeedbackServices = new SubmitFeedbackService(
    prismaFeedbackRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackServices.execute({ type, comment, screenshot });

  return res.status(201).send();
});
