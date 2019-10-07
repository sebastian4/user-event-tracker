import TrackingServer from './TrackingServer';
import * as dotenv from "dotenv";

console.log("------------------------------------------------"
    +"-------------------------------------------------------");

dotenv.config();

const trackingServer = new TrackingServer();
trackingServer.start(Number(process.env.PORT));
