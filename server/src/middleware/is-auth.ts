import jwt from "jsonwebtoken";

export = (req: any, _res: any, _next: any) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        req.isAuth = false;
        return _next();
    }
    const token = authHeader.split(" ")[1];
    if (!token || token === "") {
        req.isAuth = false;
        return _next();
    }
    let decodeToken: any;
    try {
        decodeToken = jwt.verify(token, "somesupersecretkey");
    } catch (err) {
        req.isAuth = false;
        return _next();
    }
    if (!decodeToken) {
        req.isAuth = false;
        return _next();
    }
    req.isAuth = true;
    req.userId = decodeToken.userId;
    return _next();
};
