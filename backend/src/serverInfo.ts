import path from "path";
import fs from "fs";

export interface IServerInfo {
    smtp: {
        host: string,
        port: number,
        auth: {
            user: string, pass: string
        }
    }
}

// Export serverInfo interface
export let serverInfo: IServerInfo;

const rawInfo: string = fs.readFileSync(
    path.join(__dirname, "../server/serverInfo.json"), "utf-8");
serverInfo = JSON.parse(rawInfo); // string to object