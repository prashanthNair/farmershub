
import awsSDK from 'aws-sdk';
import * as FileSystem from 'expo-file-system';

export async function uploadFile(filename, fileDirectoryPath) {
    awsSDK.config.update({
        accessKeyId: 'AKIA5CMPPPU7A6NDRTIG', secretAccessKey: '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'
        , region: 'ap-south-1'
    });
    const s3 = new awsSDK.S3();

    let access = { level: "protected", contentType: "image/jpeg" };
    let imageData = await fetch(fileDirectoryPath);
    let blobData = await imageData.blob();

    await s3.putObject({
        Bucket: 'farmadsimagesbucket', //'' + process.env.S3_BUCKET_NAME,
        Key: filename,
        Body: blobData,
        ACL: 'public-read'
    }, function (err, data) {
        if (err)
            console.log(err)
    });

}
