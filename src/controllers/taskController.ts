import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from "yup";
import Task from "../models/Task";
import User from "../models/User";
import tasksView from "../views/tasks-view";
import bcrypt from "bcryptjs";
export default {
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const tasksRepository = getRepository(Task);
    const tasks = await tasksRepository.find({
      where: { user_id: id },
      relations: ["user_id"],
    });

    if (!tasks) {
      return res.sendStatus(204);
    }
    console.log(tasks);
    return res.status(200).json(tasksView.renderMany(tasks));
  },

  async showArchived(req: Request, res: Response) {
    const { id } = req.params;

    const tasksRepository = getRepository(Task);
    const tasks = await tasksRepository.find({
      where: { user_id: id, is_archived: true },
      relations: ["user_id"],
    });

    if (!tasks) {
      return res.sendStatus(204);
    }
    console.log(tasks);
    return res.status(200).json(tasksView.renderMany(tasks));
  },

  async showFinished(req: Request, res: Response) {
    const { id } = req.params;

    const tasksRepository = getRepository(Task);
    const tasks = await tasksRepository.find({
      where: { user_id: id, has_finished: true },
      relations: ["user_id"],
    });

    if (!tasks) {
      return res.sendStatus(204);
    }
    console.log(tasks);
    return res.status(200).json(tasksView.renderMany(tasks));
  },

  async create(req: Request, res: Response) {
    const { name, description, due_date, user_id } = req.body;

    const tasksRepository = getRepository(Task);
    const usersRepository = getRepository(User);

    console.log({ name, description, due_date, user_id });

    const userExists = await usersRepository.findOne({
      where: { id: user_id },
    });

    if (!userExists) {
      return res.sendStatus(400);
    }

    const data = {
      name: name,
      description: description,
      due_date: due_date,
      has_finished: false,
      is_archived: false,
      user_id: user_id,
    };

    const task = tasksRepository.create(data);

    await tasksRepository.save(task);

    return res.status(200).json(task);
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { finished, archived } = req.query;

    const tasksRepository = getRepository(Task);

    const existingTask = await tasksRepository.findOne({ where: { id } });

    if (!existingTask) {
      return res.status(404).json({ message: "Task not found!" });
    }
    console.log(finished);
    if (finished !== undefined) {
      switch (finished) {
        case "true":
          existingTask.has_finished = true;
          break;
        case "false":
          existingTask.has_finished = false;
          break;
        default:
          return res.status(500).json({ message: "Invalid finished status!" });
      }
    }

    if (archived !== undefined) {
      switch (archived) {
        case "true":
          existingTask.is_archived = true;
          break;
        case "false":
          existingTask.is_archived = false;
          break;
        default:
          return res.status(500).json({ message: "Invalid archived status!" });
      }
    }

    const task = await tasksRepository.create(existingTask);

    await tasksRepository.save(task);

    return res.status(200).json(existingTask);
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const tasksRepository = getRepository(Task);

    const taskExists = await tasksRepository.findOne({ where: { id } });

    if (!taskExists) {
      return res.status(400).json({ message: "Task not found!" });
    }
    try {
      await tasksRepository.delete(taskExists);
    } catch {
      return res.sendStatus(400);
    }
    return res.status(200).json({ message: "Task successfully deleted!" });
  },
};
