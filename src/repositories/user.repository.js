const BaseRepository = require('./base.respository');
let _user = null;

class UserRepository extends BaseRepository  {
    constructor({ User }){
        super(User);
        _user = User;
    }

    async getUserByUsername(username){
        return await _user.findOne({username});
    }
    
}

module.exports = UserRepository;