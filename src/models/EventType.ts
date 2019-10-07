
export class EventType {

    private type : string;
    private created: number;
    private user: string;

    constructor(type:string, user:string) {
        this.type = type
        let d = new Date();
        this.created = d.getTime();
        this.user = user
    }

    public isLogin(): boolean {
        return (this.type == "LOGIN");
    }

    get Type() {
        return this.type;
    }

    get Created() {
        return this.created;
    }

    get User() {
        return this.user;
    }

    public checkValidity() : boolean {
        if (this.type.length > 0) {
            return true;
        }
        return false;
    }

}