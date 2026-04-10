import { Client, ClientOptions } from "minio";
import { AppError } from './errors/error';
import { promisify } from 'util';
import fs from 'fs';
import stream from 'stream';

export const minioClient = new Client({
    endPoint: process.env.MINIO_END_POINT as string,
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY as string,
    secretKey: process.env.MINIO_SECRET_KEY as string
});

// Separate client for generating presigned URLs with the public hostname.
// The AWS4 signature includes the 'host' header, so the client used for
// URL generation must use the same hostname the browser will request from.
const _publicUrl = new URL(process.env.MINIO_PUBLIC_URL || `http://${process.env.MINIO_END_POINT}:9000`);
const minioUrlClient = new Client({
    endPoint: _publicUrl.hostname,
    port: _publicUrl.port ? parseInt(_publicUrl.port) : (_publicUrl.protocol === 'https:' ? 443 : 80),
    useSSL: _publicUrl.protocol === 'https:',
    accessKey: process.env.MINIO_ACCESS_KEY as string,
    secretKey: process.env.MINIO_SECRET_KEY as string
});

export const getPresignedUrl = async (
    method: 'GET' | 'PUT',
    bucket: string,
    objectName: string,
    expiry: number
): Promise<string> => {
    return minioUrlClient.presignedUrl(method, bucket, objectName, expiry);
};

import * as path from 'path';

export const uploadToMinio = async (bucketName: string, objectName: string, filePath: string) => {
    try {
        const ext = path.extname(filePath).toLowerCase();
        let contentType;

        switch (ext) {
            case '.jpeg':
            case '.jpg':
                contentType = 'image/jpeg';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.pdf':
                contentType = 'application/pdf';
                break;
            default:
                contentType = 'application/octet-stream'; 
                break;
        }

        await minioClient.fPutObject(bucketName, objectName, filePath, {
            'Content-Type': contentType,
        });

        return `File uploaded successfully.`;
    } catch (error) {
        throw new AppError(`Error uploading file: ${error}`);
    }
};
