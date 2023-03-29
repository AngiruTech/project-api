import { secretKey } from '../../utils/tokenJwtUtil';
import { sign } from 'jsonwebtoken';
import { InternalServerError } from '../../utils/responseHandler';

const generateJwtToken = async (userEmail: string, userRole: string): Promise<string> => {
    const expiresIn = 20 * 60;

    const tokenJwt = sign(
        {
            role: `${userRole}`,
        },
        secretKey,
        {
            subject: `${userEmail}`,
            expiresIn: expiresIn,
            algorithm: 'HS256',
        }
    );

    if (!tokenJwt) throw new InternalServerError('Unable to create token JWT');

    return tokenJwt;
};

export default generateJwtToken;