import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  WEBHOOK_VERIFY_TOKEN: string;
  WHATSAPP_API_TOKEN: string;
  BUSINESS_PHONE_NUMBER_ID: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    WEBHOOK_VERIFY_TOKEN: joi.string().required(),
    WHATSAPP_API_TOKEN: joi.string().required(),
    BUSINESS_PHONE_NUMBER_ID: joi.string().required(),
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
    webhookVerifyToken: envVars.WEBHOOK_VERIFY_TOKEN,
    apiToken: envVars.WHATSAPP_API_TOKEN,
    businessPhoneNumberId: envVars.BUSINESS_PHONE_NUMBER_ID,
  },
});
