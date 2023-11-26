// import { env } from "process";

export enum JwtExpired {
  ACCESS = '1h',
  REFRESH = '30d'
}

export const jwtConfig = {
  accessTokenSecret : process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret : process.env.REFRESH_TOKEN_SECRET,
  expired : JwtExpired.ACCESS
}

