import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from "yup";
import User from "../models/User";
import usersView from "../views/users-view";
import bcrypt from "bcryptjs";
export default {
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { id } });

    if (!user) {
      return res.sendStatus(204);
    }

    return res.status(200).json(usersView.render(user));
  },

  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const usersRepository = getRepository(User);

    const existingUser = await usersRepository.findOne({ where: { email } });

    if (existingUser) {
      return res.sendStatus(409);
    }

    const data = {
      name,
      email,
      password,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const user = usersRepository.create(data);

    await usersRepository.save(user);

    return res.status(201).json({ name, email, password });
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const usersRepository = getRepository(User);

    const userExists = await usersRepository.findOne({ where: { id } });

    if (!userExists) {
      return res.sendStatus(400);
    }

    usersRepository.delete(userExists);

    return res.status(200).json({ message: "User deleted successfully!" });
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password } = req.query;

    const usersRepository = getRepository(User);

    const userExists = await usersRepository.findOne({ where: { id } });

    if (!userExists) {
      return res.sendStatus(400);
    }

    if (name !== undefined) {
      userExists.name = String(name);
    }

    if (email !== undefined) {
      userExists.email = String(email);
    }

    if (password !== undefined) {
      const equalsPassword = bcrypt.compare(
        userExists.password,
        String(password)
      );
      if (!equalsPassword) {
        return res.sendStatus(400);
      }
      userExists.password = String(password);
    }

    const user = usersRepository.create(userExists);

    await usersRepository.save(user);

    return res.status(200).json({message: "User successfully updated!"});
  },
};
