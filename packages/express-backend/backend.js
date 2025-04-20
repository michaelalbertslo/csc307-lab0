// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspiring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const findUserByName = (name) => {
  return users.users_list.filter(user =>
    user.name.toLowerCase() === name.toLowerCase()
  );
};

const findUserByJob = (job) => {
  return users.users_list.filter(user =>
    user.job.toLowerCase() === job.toLowerCase()
  );
};

const findUserByNameAndJob = (name, job) => {
  return users.users_list.filter(user => user.name.toLowerCase() === name.toLowerCase() 
    && user.job.toLowerCase() === job.toLowerCase());
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUserById = (id) => {
  const index = users.users_list.findIndex(user => user.id === id);
  if (index !== -1) {
    const deleted = users.users_list.splice(index, 1);
    return deleted[0];
  }
  return null;
};

const generateId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); //random 6 digit
}

app.use(cors());
app.use(express.json());


app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; 
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});


//handle all queries in one
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name && job) {
    const result = { users_list: findUserByNameAndJob(name, job) };
    return res.send(result);
  }
  
  if (name) {
    const result = { users_list: findUserByName(name) };
    return res.send(result);
  }

  if (job) {
    const result = { users_list: findUserByJob(job) };
    return res.send(result);
  }
  
  res.send(users);
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;

  if (userToAdd) {
    const newUser = {id: generateId(), ...userToAdd}
    addUser(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).json({ error: "Invalid user post" });
  }
});


app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const deletedUser = deleteUserById(id);
  if (deletedUser) {
    res.send(deletedUser);
  } else {
    res.status(404).send("User not found");
  }
});
