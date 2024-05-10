import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import React, { useState } from "react";

// 이미지 클라우디너리에 업로드하는 함수
const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  // 이미지 업로드하기
  const uploadImage = async () => {
    setLoading(true);
    
    // 제출 데이터 생성
    const data = new FormData();
    data.append("file", image);
    data.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET // .env.local에 REACT_APP_CLOUDINARY_UPLOAD_PRESET= 적고
                                                    // cloudinary의 preset 입력하기
    );
    data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME); // 마찬가지로 env.local에 cloud name 입력
    data.append("folder", "Cloudinary-React");

    // 데이터에 맞게 Cloudinary에 이미지 업로드
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();
      setUrl(res.public_id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // 이미지 미리보기 하는 함수
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreview(reader.result);
    };
  };

  // 이미지 리셋
  const handleResetClick = () => {
    setPreview(null);
    setImage(null);
  };

  // 이미지 업로드 후 가져오는 함수
  const cld = new Cloudinary({
    cloud: {
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
    }
  });
  const myimage = cld.image(url); // url로 업로드된 이미지 가져오기

  return (
    <div className="h-screen sm:px-8 md:px-16 sm:py-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
          <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
            <span>Click on Upload a File</span>&nbsp;
          </p>
          <input
            id="hidden-input"
            type="file"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
          <label htmlFor="hidden-input" className="cursor-pointer">
            <div className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
              Upload a file
            </div>
          </label>

          <div className="flex justify-center items-center mt-5 mx-3 max-w-xs">
            {preview && <img src={preview} alt="preview" className="w-full" />}
          </div>
        </header>
        <div className="flex justify-end pb-8 pt-6 gap-4">
          <button
            onClick={uploadImage}
            className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none disabled:cursor-not-allowed"
            disabled={!image}
          >
            Upload now
          </button>
          <button
            onClick={handleResetClick}
            className="rounded-sm px-3 py-1 bg-red-700 hover:bg-red-500 text-white focus:shadow-outline focus:outline-none"
          >
            Reset
          </button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-6 w-6"></div>
            <span>Processing...</span>
          </div>
        ) : (
          url && (
            <div className="pb-8 pt-4">
              <AdvancedImage cldImg={myimage} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ImageUpload;