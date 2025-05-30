// // Import with `import * as Sentry from "@sentry/node"` if you are using ESM
// import * as Sentry from "@sentry/node";

// Sentry.init({
//   dsn: "https://f182fcde2e92272e128d6d2db7eddade@o4509412731584512.ingest.us.sentry.io/4509412734468096",
  
  
//   integrations: [Sentry.mongooseIntegration()],
//   // Setting this option to true will send default PII data to Sentry.
//   // For example, automatic IP address collection on events
//   sendDefaultPii: true,
// });

// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://6fc93968083f73059ac70ea7ca1f206a@o4509412731584512.ingest.us.sentry.io/4509412777459712",

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});