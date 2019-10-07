import * as loki from 'lokijs';
import { User } from './models/User';
import { EventType } from './models/EventType';

export class DbMemService { 

    private static instance: DbMemService;

    private db: any;

    private users: any;
    private events: any;

    private constructor() {
    }

    public init() {
        this.db = new loki('');
        this.users = this.db.addCollection('users');
        this.events = this.db.addCollection('events');
    }

    static getInstance() {
        if (!DbMemService.instance) {
            DbMemService.instance = new DbMemService();
            DbMemService.instance.init()
        }
        return DbMemService.instance;
    }

    public getDb() {
        return this.db;
    }

    public getUsers() {
        return this.users;
    }

    public getEvents() {
        return this.events;
    }

    public addUser(user:User) : boolean {
        if (this.checkUserExists(user.Email)) {
            return false;
        }
        if (user.checkValidity()) {
            this.users.insert(user);
            return true;
        }
        return false;
    }

    public addEvent(eventType:EventType) {
        if (!this.checkUserExists(eventType.User)) {
            return false;
        }
        if (eventType.checkValidity()) {
            this.events.insert(eventType);
            return true;
        }
        return false;
    }

    public checkUserExists(email: string) {
        var results = this.users.find({email: email});
        if (results.length > 0) {
            return true;
        }
        return false;
    }

    public checkUserAuth(email: string, password: string) {
        var results = this.users.find({email: email});
        if (results.length > 0) {
            var user : User = results[0];
            return user.checkPassword(password);
        }
        return false;
    }

    public getAllUsers() {
        return this.users.data;
    }

    public getSpecificUser(email: string) : User {
        var results = this.users.find({email: email});
        var user = null;
        if (results.length > 0) {
            user = results[0]
        }
        return user;
    }

    public getAllEvents() {
        return this.events.data;
    }

    public getAllEventsFromUser(userEmail: string) {
        let results = this.events.find({user: userEmail});
        return results;
    }

    public getAllEventsFromLastTimelapseInSeconds(seconds: number) {
        let d = new Date();
        let now = d.getTime();
        let from = now - (seconds * 1000)
        let results = this.events.find({created: { $gt: from }});
        return results;
    }



}