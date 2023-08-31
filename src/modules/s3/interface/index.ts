import {
  GetObjectCommandOutput,
  ListObjectsCommandOutput,
} from '@aws-sdk/client-s3';

export type UploadFileS3 = (
  filename: string,
  bucketName: string,
  userId: string,
  folder: string
) => any;

export type GetFileS3 = (
  filename: string,
  folder: string
) => Promise<GetObjectCommandOutput>;

export type getFilesS3 = () => Promise<ListObjectsCommandOutput>;
