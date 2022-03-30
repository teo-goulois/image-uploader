import aws from 'aws-sdk'

export default async function handler(req, res) {
  const s3 = new aws.S3({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    signatureVersion: 'v4',
  })

  const imageName = req.query.file;

  const params = ({
    Bucket: process.env.BUCKET_NAME,
    Key: imageName,
    Expires: 60
  })

  const uploadUrl = await s3.getSignedUrlPromise('putObject', params)

  res.status(200).json({url: uploadUrl});
}