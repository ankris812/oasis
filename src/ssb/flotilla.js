const stack = require("secret-stack");
const debug = require("debug")("oasis");
const ssbConfig = require("ssb-config");

const plugins = [
  // Authentication often hooked for authentication.
  require("ssb-master"),
  require("ssb-db"),
  require("ssb-backlinks"),
  require("ssb-conn"),
  require("ssb-about"),
  require("ssb-blobs"),
  require("ssb-ebt"),
  require("ssb-friends"),
  require("ssb-replication-scheduler"),
  require("ssb-invite"),
  require("ssb-lan"),
  require("ssb-logging"),
  require("ssb-meme"),
  require("ssb-no-auth"),
  require("ssb-onion"),
  require("ssb-ooo"),
  require("ssb-plugins"),
  require("ssb-private1"),
  require("ssb-query"),
  require("ssb-room/tunnel/client"),
  require("ssb-search"),
  require("ssb-tangle"),
  require("ssb-unix-socket"),
  require("ssb-ws"),
];

module.exports = (config) => {
  const server = stack();
const walk = (input) => {
  if (Array.isArray(input)) {
    input.forEach(walk);
  } else {
    try {
      debug(`Cargando plugin: ${input.name || 'sin nombre'}`);
      server.use(input);
    } catch (err) {
      debug(`Error al cargar el plugin: ${input.name || 'sin nombre'}`);
      console.error('Error al cargar plugin:', input);
      console.error(err);
    }
  }
};

  walk(plugins);

  return server({ ...ssbConfig, ...config });
};
