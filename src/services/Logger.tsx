// contoh

type LogLevel = "debug" | "info" | "warn" | "error";

const isProd = import.meta.env.PROD; // true kalau di build production

function log(level: LogLevel, message: string, ...optional: any[]) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}]: ${message}`;

  if (!isProd) {
    // Development → tampilkan di console
    switch (level) {
      case "debug":
        console.debug(logMessage, ...optional);
        break;
      case "info":
        console.info(logMessage, ...optional);
        break;
      case "warn":
        console.warn(logMessage, ...optional);
        break;
      case "error":
        console.error(logMessage, ...optional);
        break;
    }
  } else {
    // Production → bisa kirim ke server logging
    // contoh: fetch('/api/logs', { method: 'POST', body: JSON.stringify({ level, message, data: optional }) })
    console.log(logMessage, ...optional);
  }
}

export const Logger = {
  debug: (msg: string, ...opt: any[]) => log("debug", msg, ...opt),
  info: (msg: string, ...opt: any[]) => log("info", msg, ...opt),
  warn: (msg: string, ...opt: any[]) => log("warn", msg, ...opt),
  error: (msg: string, ...opt: any[]) => log("error", msg, ...opt),
};