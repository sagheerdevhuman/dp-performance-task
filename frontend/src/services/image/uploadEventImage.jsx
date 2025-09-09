import axios from "axios";

export async function uploadEventImageApi(
  fileName,
  fileType,
  selectedImage,
  uploadUrl
) {
  // return console.log({ fileName, fileType, selectedImage, uploadUrl });
  const header = fileType === "jpg" || "jpeg" ? "image/jpeg" : "image/png";

  const result = await axios({
    method: "PUT",
    data: selectedImage,
    url: uploadUrl,
    headers: { "Content-Type": header },
  }).then((res) => {
    return res;
  });
  return result;
}
