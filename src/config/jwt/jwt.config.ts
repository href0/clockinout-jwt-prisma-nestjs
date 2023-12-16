// import { env } from "process";

export enum JwtExpired {
  ACCESS = '1h', // 1 jam
  REFRESH = '30d' // 30 hari
}

export const jwtConfig = {
  accessTokenSecret : process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret : process.env.REFRESH_TOKEN_SECRET,
  expired : JwtExpired.ACCESS
}

