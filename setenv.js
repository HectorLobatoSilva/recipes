const { writeFile } = require("fs/promises");
const { argv } = require("yargs");
require("dotenv").config();

const environment = argv.environment;
const isProduction = environment === "prod";
const targetPath = `./src/environments/environment${
  isProduction ? ".prod" : ""
}.ts`;
const environmentFileContent = `export const environment = {
    production: ${isProduction},
    firebase: {
        apiKey: '${process.env["API_KEY"]}',
        authDomain: '${process.env["AUTH_DOMAIN"]}',
        databaseURL: '${process.env["DATABASE_URL"]}',
        projectId: '${process.env["PROJECT_ID"]}',
        storageBucket: '${process.env["STORAGE_BUCKET"]}',
        messagingSenderId: '${process.env["MESSAGING_SENDER_ID"]}',
        appId: '${process.env["APP_ID"]}',
    }
};
`; // write the content to the respective file
(async () => {
  try {
    await writeFile(targetPath, environmentFileContent);
    console.log(`Wrote variables to ${targetPath}`);
  } catch (error) {
    console.error(error);
  }
})();
