import { OK } from 'http-status-codes';
import { JwtManager, ISecureRequest } from '@overnightjs/jwt';
import { Controller, Middleware, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Logger } from '@overnightjs/logger';
import { DbMemService } from '../DbMemService';
import { User } from '../models/User';

@Controller('user')
export class UserController {

    // create user
    @Post()
    private postMessage(req: Request, res: Response) {
        Logger.Info("create user "+req.body.email);

        var dbService = DbMemService.getInstance()

        let user = new User(
            req.body.email,
            req.body.password,
            req.body.phone
        );

        if ( dbService.addUser(user) ) {
            const jwtStr = JwtManager.jwt({
                email: req.body.email
            });
            return res.status(OK).json({
                jwt: jwtStr,
                message: "user created",
                success: true
            });
        }
        else {
            let message = "something went wrong with creating new user. "
                + "check correct email or phone syntax or if user already exists";
            return res.status(424).json({
                message: message,
                success: false
            });
        }
    }

    // // debug get all users
    // @Get('alld')
    // private getAllUsersDebug(req: Request, res: Response) {
    //     var dbService = DbMemService.getInstance()
    //     return res.status(OK).json(dbService.getAllUsers());
    // }

}
