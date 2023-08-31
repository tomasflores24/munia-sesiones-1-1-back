import { S3Client } from '@aws-sdk/client-s3';
import 'dotenv/config';

const { AWS_BUCKET_REGION, AWS_BUCKET_NAME, AWS_ACCESS_KEY, AWS_SECRET_KEY } =
  process.env;

export const s3Options = {
  bucket: AWS_BUCKET_NAME,
  region: AWS_BUCKET_REGION || '',
  accessKeyId: AWS_ACCESS_KEY || '',
  secretAccessKey: AWS_SECRET_KEY || '',
};

export const client = new S3Client({
  region: s3Options.region,
  credentials: {
    accessKeyId: s3Options.accessKeyId,
    secretAccessKey: s3Options.secretAccessKey,
  },
});
