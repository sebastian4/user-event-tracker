import * as bodyParser from 'body-parser';
import * as logmorgan from 'morgan';
import { UserController } from './controllers/UserController';
import { EventController } from './controllers/EventController';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';

class TrackingServer extends Server {

    private readonly SERVER_STARTED = 'Example server started on port: ';

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(logmorgan('combined'));
        this.setupControllers();
    }

    private setupControllers(): void {
        let userController = new UserController();
        let eventController = new EventController();
        super.addControllers([ userController, eventController ]);
    }

    public start(port: number): void {
        this.app.get('*', (req, res) => {
            res.send(this.SERVER_STARTED + port);
        });
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_STARTED + port);
        });
    }
}

export default TrackingServer;
