import { OK } from 'http-status-codes';
import { JwtManager, ISecureRequest } from '@overnightjs/jwt';
import { Controller, Middleware, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Logger } from '@overnightjs/logger';
import { DbMemService } from '../DbMemService';
import { EventType } from '../models/EventType';

@Controller('event')
export class EventController { 

    // create event login
    @Post('login')
    private postLoginMessage(req: Request, res: Response) {
        Logger.Info("create event "+req.body.email);

        let dbService = DbMemService.getInstance()

        if (dbService.checkUserAuth(req.body.email, req.body.password)) {

            let event = new EventType("LOGIN", req.body.email);

            if ( dbService.addEvent(event) ) {
                const jwtStr = JwtManager.jwt({
                    email: req.body.email
                });
                return res.status(OK).json({
                    jwt: jwtStr,
                    message: "event created",
                    success: true
                });
            }
            else {
                return res.status(424).json({
                    message: "event was unable to create, check event size",
                    success: false
                });
            }
        }
        else {
            return res.status(401).json({
                message: "the login or password were incorrect",
                success: false
            });
        }
    }

    // create event
    @Post()
    @Middleware(JwtManager.middleware)
    private postMessage(req: ISecureRequest, res: Response) {
        Logger.Info("create event "+req.payload.email);

        let event = new EventType(req.body.type, req.payload.email);

        let dbService = DbMemService.getInstance()

        if ( dbService.addEvent(event) ) {
            return res.status(OK).json({
                message: "event created",
                success: true
            });
        }
        else {
            return res.status(424).json({
                message: "event was unable to create, check event size",
                success: false
            });
        }
    }

    // // return all events for all users debug
    // @Get('alld')
    // private getAllEventsDebug(req: Request, res: Response) {
    //     let dbService = DbMemService.getInstance()
    //     return res.status(OK).json(dbService.getAllEvents());
    // }

    // return all events for all users
    @Get('all')
    @Middleware(JwtManager.middleware)
    private getAllEvents(req: ISecureRequest, res: Response) {
        let dbService = DbMemService.getInstance()
        return res.status(OK).json(dbService.getAllEvents());
    }

    // return all events for a single user
    @Get('single/:userid')
    @Middleware(JwtManager.middleware)
    private getSingleEvents(req: ISecureRequest, res: Response) {
        let dbService = DbMemService.getInstance()
        let results = dbService.getAllEventsFromUser(req.params.userid)
        return res.status(OK).json(results);
    }

    // return all events for the last day
    @Get('all/lastday')
    @Middleware(JwtManager.middleware)
    private getAllEventsLastDay(req: ISecureRequest, res: Response) {
        let dbService = DbMemService.getInstance()
        let oneDay = 60 * 60 * 24;
        let results = dbService.getAllEventsFromLastTimelapseInSeconds(oneDay);
        return res.status(OK).json(results);
    }

}
