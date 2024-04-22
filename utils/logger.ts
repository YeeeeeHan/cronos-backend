import dayjs from 'dayjs';
import logger from 'pino';

// Logger configuration
export const log = logger({
  prettyPrint: true,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});
