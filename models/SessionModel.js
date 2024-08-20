import Session from './definitions/Session.js';
class SessionModel{
    static async getSessionByTokenAndUserId(token, userId) {
        const session = await Session.findOne({
            where: {
                token: token,
                userId: userId
            }
        });
        return session;
    }
    static async createSession(token, userId , expiredAt) {
        const session = await Session.create({
            token: token,
            userId: userId,
            expiredAt: expiredAt
        });
        return session;
    }
    static async deleteSession(userId,token){
       const result = await Session.destroy({
           where:{
               userId: userId,
               token: token
           }
       });
       return result;
    }
    
}
export default SessionModel;