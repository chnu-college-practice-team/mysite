declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string
    DATABASE_URL: string
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    GITHUB_ID: string
    GITHUB_SECRET: string
    EMAIL_SERVER_HOST: string
    EMAIL_SERVER_PORT: string
    EMAIL_SERVER_PASSWORD: string
    EMAIL_SERVER_USER: string
    EMAIL_FROM: string
  }
}
