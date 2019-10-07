
export class User { 

    private email : string;
    private password : string; 
    private phone : string; 
  
    constructor(email:string, password:string, phone:string) { 
       this.email = email
       this.password = password
       this.phone = phone
    }  

    get Email() {
        return this.email;
    }

    get Password() {
        return this.password;
    }

    get Phone() {
        return this.phone;
    }

    set Phone(val) {
        this.phone = val;
    }

    public checkPassword(password: string) : boolean {
        return (this.password == password);
    }

    public checkValidity() : boolean {
        let valid = true;
        let re_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ( !re_email.test(this.email.toLowerCase()) ) {
            return false
        }
        let re_phone = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
        if ( !re_phone.test(this.phone) ) {
            return false
        }
        return true;
    }

 }
