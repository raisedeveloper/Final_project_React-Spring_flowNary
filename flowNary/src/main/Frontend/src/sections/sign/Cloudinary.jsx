import React from 'react'
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";

// Cloudinary에 저장해둔 이미지 보여주기
export default function Cloudinary2() {

    // Cloudinary 데이터 설정
    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dpye75bdu' // 본인 Cloudinary 계정이나 사용할 계정의 Cloud name을 입력해야 함
        }
    });


    const myImage = cld.image('cat2');
    // 좌측의 Programmable Media → Media Explorer로 접속하여 사진의 public id 입력
    // public id 대신 해당 이미지의 url을 입력해도 작동

    myImage.resize(fill().width(250).height(250)); // 사진 크기 설정

    return (
        <div>
            <AdvancedImage cldImg={myImage} /> {/* 사진 보여주기 */}
        </div>
    )
}