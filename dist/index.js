// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  committees;
  registrations;
  currentUserId;
  currentCommitteeId;
  currentRegistrationId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.committees = /* @__PURE__ */ new Map();
    this.registrations = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentCommitteeId = 1;
    this.currentRegistrationId = 1;
    this.initializeCommittees();
  }
  initializeCommittees() {
    const defaultCommittees = [
      {
        name: "Security Council",
        description: "Address international peace and security challenges with the most prestigious UN body",
        icon: "fas fa-shield-alt",
        color: "blue",
        delegateCount: 15,
        type: "Crisis Committee"
      },
      {
        name: "General Assembly",
        description: "Debate sustainable development goals and global policy in the world's largest deliberative body",
        icon: "fas fa-globe",
        color: "green",
        delegateCount: 193,
        type: "Large Committee"
      },
      {
        name: "Human Rights Council",
        description: "Protect and promote human rights worldwide through comprehensive policy debates",
        icon: "fas fa-balance-scale",
        color: "purple",
        delegateCount: 47,
        type: "Specialized"
      },
      {
        name: "ECOSOC",
        description: "Coordinate economic and social work among UN agencies and member states",
        icon: "fas fa-chart-line",
        color: "orange",
        delegateCount: 54,
        type: "Economic Focus"
      },
      {
        name: "ICJ",
        description: "Adjudicate international legal disputes in the principal judicial organ of the UN",
        icon: "fas fa-gavel",
        color: "red",
        delegateCount: 15,
        type: "Legal Focus"
      },
      {
        name: "WHO",
        description: "Address global health challenges and coordinate international health responses",
        icon: "fas fa-heartbeat",
        color: "teal",
        delegateCount: 60,
        type: "Health Focus"
      }
    ];
    defaultCommittees.forEach((committee) => {
      this.createCommittee(committee);
    });
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async getCommittees() {
    return Array.from(this.committees.values());
  }
  async getCommittee(id) {
    return this.committees.get(id);
  }
  async createCommittee(insertCommittee) {
    const id = this.currentCommitteeId++;
    const committee = { ...insertCommittee, id };
    this.committees.set(id, committee);
    return committee;
  }
  async getRegistrations() {
    return Array.from(this.registrations.values());
  }
  async createRegistration(insertRegistration) {
    const id = this.currentRegistrationId++;
    const createdAt = (/* @__PURE__ */ new Date()).toISOString();
    const registration = { ...insertRegistration, id, createdAt };
    this.registrations.set(id, registration);
    return registration;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var committees = pgTable("committees", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  delegateCount: integer("delegate_count").notNull(),
  type: text("type").notNull()
});
var registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  organization: text("organization").notNull(),
  preferredCommittee: text("preferred_committee").notNull(),
  createdAt: text("created_at").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertCommitteeSchema = createInsertSchema(committees).omit({
  id: true
});
var insertRegistrationSchema = createInsertSchema(registrations).omit({
  id: true,
  createdAt: true
});

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/committees", async (req, res) => {
    try {
      const committees2 = await storage.getCommittees();
      res.json(committees2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch committees" });
    }
  });
  app2.get("/api/committees/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid committee ID" });
      }
      const committee = await storage.getCommittee(id);
      if (!committee) {
        return res.status(404).json({ error: "Committee not found" });
      }
      res.json(committee);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch committee" });
    }
  });
  app2.post("/api/registrations", async (req, res) => {
    try {
      const validatedData = insertRegistrationSchema.parse(req.body);
      const registration = await storage.createRegistration(validatedData);
      res.status(201).json(registration);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Validation failed",
          details: error.errors
        });
      }
      res.status(500).json({ error: "Failed to create registration" });
    }
  });
  app2.get("/api/registrations", async (req, res) => {
    try {
      const registrations2 = await storage.getRegistrations();
      res.json(registrations2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch registrations" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  base: "/UnitedMUN/",
  build: {
    assetsDir: "",
    outDir: "docs",
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    base: "/",
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "..", "docs");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5001;
  server.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });
})();
