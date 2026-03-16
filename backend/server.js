const express = require("express");
const cors = require("cors");
const prisma = require("./prismaClient");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API do projeto fullstack rodando!");
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return res.json(tasks);
  } catch (error) {
    console.error("ERRO NO GET /tasks:", error);
    return res.status(500).json({ error: "Erro ao buscar tarefas." });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "O título é obrigatório." });
    }

    const newTask = await prisma.task.create({
      data: {
        title: title.trim(),
      },
    });

    return res.status(201).json(newTask);
  } catch (error) {
    console.error("ERRO NO POST /tasks:", error);
    return res.status(500).json({ error: "Erro ao criar tarefa." });
  }
});
app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const taskExists = await prisma.task.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!taskExists) {
      return res.status(404).json({ error: "Tarefa não encontrada." });
    }

    const dataToUpdate = {};

    if (title !== undefined) {
      if (title.trim() === "") {
        return res.status(400).json({ error: "O título não pode ser vazio." });
      }

      dataToUpdate.title = title.trim();
    }

    if (completed !== undefined) {
      dataToUpdate.completed = completed;
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: Number(id),
      },
      data: dataToUpdate,
    });

    return res.json(updatedTask);
  } catch (error) {
    console.error("ERRO NO PUT /tasks/:id:", error);
    return res.status(500).json({ error: "Erro ao atualizar tarefa." });
  }
});app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const taskExists = await prisma.task.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!taskExists) {
      return res.status(404).json({ error: "Tarefa não encontrada." });
    }

    await prisma.task.delete({
      where: {
        id: Number(id),
      },
    });

    return res.json({ message: "Tarefa excluída com sucesso." });
  } catch (error) {
    console.error("ERRO NO DELETE /tasks/:id:", error);
    return res.status(500).json({ error: "Erro ao excluir tarefa." });
  }
});
const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});