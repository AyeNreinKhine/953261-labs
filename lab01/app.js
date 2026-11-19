
import http from "node:http";

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);

  // 1. Homepage
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
    });

    res.end("<h1>Hello, 953261!</h1><p>My name is Avery (student ID 692115501)</p>");
    return;
  }

  // 2. JSON API route
  if (req.method === "GET" && req.url === "/api/me") {
    const myInfo = {
      name: "Avery",
      studentId: "692115501",
      favouriteLanguage: "JavaScript"
    };

    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify(myInfo));
    return;
  }

  // 3. 404 response for unknown paths
  res.writeHead(404, {
    "Content-Type": "text/html; charset=utf-8"
  });

  res.end("<h1>404 - Page Not Found</h1>");
});

server.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});
