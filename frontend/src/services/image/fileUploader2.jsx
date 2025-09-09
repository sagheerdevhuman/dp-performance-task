// import AWS from 'aws-sdk';

// export const uploadFile = async (file,setFile) => {
//   const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
//   const bucket = import.meta.env.VITE_BUCKET_NAME
//   const region = import.meta.env.VITE_REGION
//   const id = import.meta.env.VITE_ACCESS_KEY
//   const secretKey = import.meta.env.VITE_SECRET_KEY

//   // S3 Credentials
//   AWS.config.update({
//     accessKeyId: id,
//     secretAccessKey: secretKey,
//   });
//   const s3 = new AWS.S3({
//     params: { Bucket: bucket },
//     region: region,
//   });

//   // Files Parameters

//   const params = {
//     Bucket: bucket,
//     Key: file.name,
//     Body: file,
//   };

//   // Uploading file to s3

//   await s3.upload(params, function(err, data) {
//     if (err) {
//         throw err;
//     }
//     let link = "https://d1yh21d3dzz97r.cloudfront.net/" + data.Location.split("/")[3]
//     setFile(link);
//   });
// };
//  