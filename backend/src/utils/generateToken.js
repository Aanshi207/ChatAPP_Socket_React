import jwt from "jsonwebtoken";

export const generateToken = (id,res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })

    res.cookie('token', token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,     // Prevents XSS attacks
        secure: true,       // Required for sameSite: 'none' (works on HTTPS)
        sameSite: 'none',   // Allows cookie to be sent from Vercel to Render
        path: '/'
    })


}

