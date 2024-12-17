import express from "express";
import config from "./config";

import {globSync} from "fs";
import path from "path";

const app = express();

app.get("/", (req, res) => {
    if (req.query.file) {
        let file = decodeURI(req.query.file as string);

        res.sendFile(file);
    } else {
        let files = globSync(path.join(path.resolve(config.path), "/**/*"));

        res.send(`${files.map(x => `<a href='${req.baseUrl}?file=${x}'>${x.split('/').pop()}</a>`)}`);
    }
});

app.listen(config.PORT, () => console.log("Server on port %i.", config.PORT));