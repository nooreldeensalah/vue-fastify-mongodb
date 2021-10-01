"use strict";

const path = require("path");
const AutoLoad = require("fastify-autoload");

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {*} opts
 */
module.exports = async function (fastify, opts) {
  // Place here your custom code!

  fastify.register(require("fastify-env"), {
    dotenv: true,
    schema: {
      type: "object",
      required: ["MONGODB_URI", "JWT_SECRET"],
      properties: {
        MONGODB_URI: {
          type: "string",
        },
        JWT_SECRET: { type: "string" },
      },
    },
  });

  fastify.register(require("fastify-cors"));

  fastify.register(require("fastify-jwt"), {
    secret: process.env.JWT_SECRET,
  });

  fastify.register(require("fastify-mongodb"), {
    forceClose: true, // Force close the database connection when the app is stopped.
    url: process.env.MONGODB_URI,
  });

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });
};
