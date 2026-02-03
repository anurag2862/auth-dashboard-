import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function generateToken(userId) {
    return jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: '7d',
    });
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

export function getUserFromRequest(request) {
    try {
        const authHeader = request.headers.get('authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);

        return decoded ? decoded.userId : null;
    } catch (error) {
        return null;
    }
}
