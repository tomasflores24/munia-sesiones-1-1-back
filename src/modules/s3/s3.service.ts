import {
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { client, s3Options } from '../../config/s3.config';
import { updateUserInDB } from '../user/user.service';
import { handleError } from '../../common/errorResponse';
import { DIRECTORY_UPLOADS } from '../../common/deleteImage';
import { User } from '../../models';
import { GetFileS3, UploadFileS3 } from './interface';

const getFileS3: GetFileS3 = async (filename, folder) => {
  const fullname = `${folder}/${filename}`;

  const command = new GetObjectCommand({ Bucket: s3Options.bucket, Key: fullname });
  return await client.send(command);
};

const getFilesS3 = async () => {
  const command = new ListObjectsCommand({ Bucket: s3Options.bucket });
  return await client.send(command);
};

const uploadFileS3: UploadFileS3 = async (filename, bucketName, userId, folder) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    // TODO => Key De prueba<
    const key = folder + '/' + userId + '/' + filename;
    // const key = folder + '/' + filename;
    const path = DIRECTORY_UPLOADS + '/' + filename;

    const uploadParams = {
      Bucket: bucketName,
      Key: key,
      Body: path,
    };
    const command = new PutObjectCommand(uploadParams);
    await client.send(command);

    const url = `https://${bucketName}.s3.amazonaws.com/${folder}/${filename}`;

    const newDataUser = { profilePic: url };

    return await updateUserInDB(userId, newDataUser as any);
  } catch (error) {
    handleError(error, 'Upload file failed');
  }
};

export { uploadFileS3, getFileS3, getFilesS3 };
