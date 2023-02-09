import jsonwebtoken from "jsonwebtoken";

export default function generateAccessToken(username) {
    return jsonwebtoken.sign({username:username}, process.env.TOKEN_SECRET, { algorithm: 'HS256' });
}
