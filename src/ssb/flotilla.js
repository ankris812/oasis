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
  require("@tangle/graph"),
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
      // Muestra el nombre del plugin (si tiene)
      console.log(`Cargando plugin: ${input.name || '???'}`);
      
      // Skip the `init` check for ssb-tangle or any other special plugin
      if (input && input.name === 'ssb-tangle') {
        console.log('Skipping init check for ssb-tangle');
        server.use(input); // Use ssb-tangle without calling init
      } else if (input && typeof input.init === 'function') {
        server.use(input);
      } else {
        console.warn(`Plugin ${input.name || '???'} no tiene método 'init'`);
      }
    } catch (err) {
      console.error(`Error al cargar plugin: ${input.name || '???'}`, err);
      throw err; // Lanza el error para que se capture en la traza general
    }
  }
};

  walk(plugins);

  return server({ ...ssbConfig, ...config });
};
