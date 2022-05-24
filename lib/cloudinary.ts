import cloudinary, { UploadApiResponse } from 'cloudinary'

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env

cloudinary.v2.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
})

export async function uploadToCloudinary(
  blob: Blob,
  folder: string,
  timestamp: string | Blob,
  signature: string
): Promise<UploadApiResponse> {
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
  const formData = new FormData()

  formData.append('file', blob)
  formData.append('folder', folder)
  formData.append('signature', signature)
  formData.append('timestamp', timestamp)
  formData.append('api_key', CLOUDINARY_API_KEY)

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

export default cloudinary
