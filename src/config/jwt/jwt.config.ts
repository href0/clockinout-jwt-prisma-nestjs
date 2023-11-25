export enum JwtExpired {
  ACCESS = '1h',
  REFRESH = '1d'
}

export const jwtConfig = {
  secret : 'superr',
  expired : JwtExpired.ACCESS
}

