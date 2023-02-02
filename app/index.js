const { google } = require("googleapis");

const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(
  "463293992706-m787g68dp9fnnh26vb69j1q1sded09rg.apps.googleusercontent.com ",
  "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"
);
oAuth2Client.setCredentials({
  refresh_token:
    "1//04sH1zr_luYS8CgYIARAAGAQSNwF-L9Ir-SKJG8oaFEgAnEoG6fB0O3qw6B4Ziy_j0MPtEuG8msTzdswWK8UQiOmffWudMmB0pC8",
});

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

const eventStartTime = new Date();
eventStartTime.setDate(eventStartTime.getDay() + 2);

const eventEndTime = new Date();
eventEndTime.setDate(eventEndTime.getDay() + 2);
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);

const event = {
  summary: "Test Event",
  location: "800 Howard St., San Francisco, CA 94103",
  description: "Test Event",
  start: {
    dateTime: eventStartTime,
    timeZone: "America/Los_Angeles",
  },
  end: {
    dateTime: eventEndTime,
    timeZone: "America/Los_Angeles",
  },
  attendees: [
    { email: "joannethorpe@school.mail" },
    { email: "billbob@school.mail" },
  ],
  reminders: {
    useDefault: false,
    overrides: [
      { method: "email", minutes: 24 * 60 },
      { method: "popup", minutes: 10 },
    ],
  },
};
