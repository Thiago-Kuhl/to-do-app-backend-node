import { Router } from "express";
import userController from "./controllers/userController";
import taskController from "./controllers/taskController";
const routes = Router();

routes.get("/users/:id", userController.show);
routes.post("/users", userController.create);
routes.delete("/users/:id", userController.delete);
routes.put("/users/:id", userController.update);

routes.get("/tasks/:id", taskController.show);
routes.get("/tasks/:id/archived", taskController.showArchived);
routes.get("/tasks/:id/finished", taskController.showFinished);
routes.post("/tasks", taskController.create);
routes.put("/tasks/:id", taskController.update);
routes.delete("/tasks/:id", taskController.delete);

export default routes;
