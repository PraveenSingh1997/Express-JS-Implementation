import express from "express";

const app = express();

// Middleware
//Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option.
//This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.

app.use(express.json());

const loggindMiddleware = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next();
};

const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, usernam: "Praveen", displayName: "Praveen" },
  { id: 2, usernam: "Radhika", displayName: "Radhika" },
  { id: 3, usernam: "Nilay", displayName: "Nilay" },
  { id: 4, usernam: "Hardick", displayName: "Hardick" },
  { id: 5, usernam: "Ravi", displayName: "Ravi" },
  { id: 6, usernam: "Yatharth", displayName: "Yatharth" },
  { id: 7, usernam: "Shammi", displayName: "Shammi" },
  { id: 8, usernam: "Dhruv", displayName: "Dhruv" },
  { id: 9, usernam: "Megha", displayName: "Megha" },
  { id: 10, usernam: "Hari", displayName: "Hari" },
  { id: 11, usernam: "Gopi", displayName: "Gopi" },
  { id: 12, usernam: "Ram", displayName: "Ram" },
  { id: 13, usernam: "Sita", displayName: "Sita" },
  { id: 14, usernam: "Laxman", displayName: "Laxman" },
];

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

app.get("/", loggindMiddleware, (request, response) => {
  response.status(201).send({ msg: "Hello" });
});

app.get("/api/Users", (request, response) => {
  response.send(mockUsers);
});

app.post("/api/users", (request, response) => {
  console.log(request.body);
  const { body } = request;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);

  return response.status(201).send(newUser);
});

app.get("/api/Users", (request, response) => {
  response.send([
    { id: 1, usernam: "Praveens", displayName: "Praveen" },
    { id: 2, usernam: "Radhika", displayName: "Radhika" },
    { id: 3, usernam: "Nilay", displayName: "Nilay" },
  ]);
});

app.get("/api/Users/:id", (request, response) => {
  console.log(request.params);
  const parsedId = parseInt(request.params.id);
  if (isNaN(parsedId))
    return response.status(400).send({ msg: "Bad Request . Invalid ID." });

  const findUser = mockUsers.find((user) => user.id === parsedId);
  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});

app.get("/api/products", (request, response) => {
  console.log(request.params);
  response.send([{ id: 1, name: "Vegetable", price: 12.99 }]);
});

app.put("/api/users/:id", (request, response) => {
  const {
    body,
    params: { id },
  } = request;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

  if (findUserIndex === -1) return response.sendStatus(404);

  mockUsers[findUserIndex] = { id: parsedId, ...body };
  return response.sendStatus(200);
});

app.patch("/api/users/:id", (request, response) => {
  // From route paramenter object destructring the object
  const {
    body,
    params: { id },
  } = request;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

  if (findUserIndex === -1) return response.sendStatus(404);
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return response.sendStatus(200);
});

app.delete("/api/users/:id", (request, response) => {
  const {
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return response.sendStatus(404);

  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
});
