
export class User {
    constructor(
        public email: string, 
        public id: string,
        private _token: string, 
        private _tokenExpiratinoDate: Date ) {}
    
        get token() {
            // check if token expired
            if (this._tokenExpiratinoDate || new Date() > this._tokenExpiratinoDate) {
                return null;
            }
            return this._token;
        }

    
}