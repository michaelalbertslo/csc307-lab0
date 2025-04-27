// backend.js
import express from "express";
import cors from "cors";
import userService from "./services/user-service.js"

const { 
  addUser, 
  getUsers, 
  findUserById, 
  findUserByName, 
  findUserByJob,
  deleteUserById     
} = userService;

const app = express();
const port = 8000;


// const findUserByName = (name) => {
//   return users.users_list.filter(user =>
//     user.name.toLowerCase() === name.toLowerCase()
//   );
// };

// const findUserByJob = (job) => {
//   return users.users_list.filter(user =>
//     user.job.toLowerCase() === job.toLowerCase()
//   );
// };

// const findUserByNameAndJob = (name, job) => {
//   return users.users_list.filter(user => user.name.toLowerCase() === name.toLowerCase() 
//     && user.job.toLowerCase() === job.toLowerCase());
// };

// const findUserById = (id) =>
//   users["users_list"].find((user) => user["id"] === id);

// const addUser = (user) => {
//   users["users_list"].push(user);
//   return user;
// };

// const deleteUserById = (id) => {
//   const index = users.users_list.findIndex(user => user.id === id);
//   if (index !== -1) {
//     const deleted = users.users_list.splice(index, 1);
//     return deleted[0];
//   }
//   return null;
// };

// const generateId = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString(); //random 6 digit
// }

app.use(cors());
app.use(express.json());

//getting by ID
app.get("/users/:id", (req, res) => {
  findUserById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).send("Resource not found.");
      }
      res.json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    });
});


//get by name or job query
app.get("/users", (req, res) => {
  const {name, job} = req.query;
  let queryPromise;

  if (name && job) {
    queryPromise = getUsers(name, job); 
  }
  
  if (name) {
    queryPromise = findUserByName(name);
  }

  if (job) {
    queryPromise = findUserByJob(job);
  } else {
    queryPromise = getUsers();
  }
  
  queryPromise.then(
    usersList => {
      res.json({ users_list: usersList });
    }
  )
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  });
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

//creating a new user
app.post("/users", (req, res) => {
  addUser(req.body)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      console.error(err);
      res.status(400).json({ error: err.message });
    });
});

// delete 
app.delete("/users/:id", (req, res) => {
  deleteUserById(req.params.id)
    .then(deleted => {
      if (!deleted) return res.status(404).send("User not found");
      res.status(204).end();
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    });
});