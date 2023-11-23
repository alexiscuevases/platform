const APP_PORT = process.env.NEXT_PUBLIC_APP_PORT || "3000";
const APP_HOST = process.env.NEXT_PUBLIC_APP_HOST || "localhost.test:3000";
const APP_PROTOCOL = process.env.NEXT_PUBLIC_APP_PROTOCOL || "http";

export const ApplicationSettings = {
  host: APP_HOST,
  port: APP_PORT,
  protocol: APP_PROTOCOL,
  cookies: {
    authentication: {
      name: "connection.sscid"
    },
    language: {
      name: "_lang"
    }
  },
  URLs: {
    www: `${APP_PROTOCOL}://www.${APP_HOST}`,
    blog: `${APP_PROTOCOL}://blog.${APP_HOST}`,
    app: `${APP_PROTOCOL}://app.${APP_HOST}`,
    api: `${APP_PROTOCOL}://api.${APP_HOST}`
  },
  mails: {
    noReply: `no-reply@${process.env.NODE_ENV === "development" ? APP_HOST.replace(`:${APP_PORT}`, "") : APP_HOST}`
  }
};
