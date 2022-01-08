/**
 * 腾讯 cos上传
 */
import COS from 'cos-js-sdk-v5'

const config = {
  Bucket: 'qingshu-1301045682',
  Region: 'ap-beijing',
  SecretId: 'AKIDoQntkKdfRwCCwPbW9WdT2LOAgwwg9LIy',
  SecretKey: 'QbXCagbKmxsXw4vWquhEUEl12mFQL4Wi'
}

const cos = new COS({
  SecretId: config.SecretId,
  SecretKey: config.SecretKey
})

export default function(file: File) {
  return new Promise((resolve, reject) => {
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: `upload/` + file.name, // 存储的路径
        Body: file // 上传对象
      },
      (err, data) => {
        console.log(err, data)
        if (data?.statusCode === 200) {
          resolve(`https://${data.Location}`)
        } else {
          reject(err)
        }
      }
    )
  })
}
