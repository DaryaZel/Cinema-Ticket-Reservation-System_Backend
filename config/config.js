import { configDev } from ("./config.dev.js");
import { configProd } from ("./config.prod.js");
export let config;

const nodeEnv = process.env.NODE_ENV || "development";

if (nodeEnv === "devlopment") {
    config = configDev;
} else {
    config = configProd;
}
