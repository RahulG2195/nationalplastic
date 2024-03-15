import express from "express";
import cors from "cors";
const app = express();

// Allow requests from your Next.js domain
app.use(
  cors({
    origin:
      "https://65f3c3d8ec00e6036ff3d2eb--incandescent-sfogliatella-3ba504.netlify.app/",
  })
);

// Other routes and middleware...

const AuthUser = async (req) => {
  const token = req.headers.get("Authentication")?.split(" ")[1];
  if (!token) {
    console.log("No Token");
    return false;
  }
  console.log(token);

  try {
    // const extractAuthUserInfo = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    // console.log("extract :", extractAuthUserInfo);
    // if (extractAuthUserInfo) return extractAuthUserInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default AuthUser;
