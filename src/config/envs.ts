import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  WHATSAPP_API_VERSION: string;
  WHATSAPP_API_VERIFY_TOKEN: string;
  DATABASE_URL: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    WHATSAPP_API_VERSION: joi.string().required(),
    WHATSAPP_API_VERIFY_TOKEN: joi.string().required(),
    DATABASE_URL: joi.string().uri().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Invalid environment variables: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = Object.freeze({
  port: envVars.PORT,
  whatsappCloudApi: {
    version: envVars.WHATSAPP_API_VERSION,
    verifyToken: envVars.WHATSAPP_API_VERIFY_TOKEN,
  },
  database: {
    url: envVars.DATABASE_URL,
  },
});
