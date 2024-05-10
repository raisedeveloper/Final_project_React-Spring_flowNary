import React, { useState } from "react";
import axios from 'axios';

export default function React_to_Spring() {
    const [id, Setid] = useState();
    const [title, SetTitle] = useState("");
    const [num, setNum] = useState(1);

    const submit = () => {
        /*
            Spring으로 데이터 보내주는 과정
        */
        axios.get('http://localhost:8090/board/insert', // http://localhost:8090/board/insert 주소를 호출
        {
            params: { // 파라메터 설정하기
                id: id,
                title: title
            }
            // 위와 같이 하면 정확한 주소의 형태는
            // http://localhost:8090/board/insert/{id}/{title} 과 비슷한 형태가 되며
            // 넣어둔 파라메터의 처리는 Spring에서 진행됨
        })
        .then(res => {setNum(res.data)})
        .catch(function() {
            console.log('fail');
        })
    }


    return (
        <>
            <input onChange={(e) => {
                Setid(e.target.value)
            }} />
            <input onChange={(e) => {
                SetTitle(e.target.value)
            }} />
            <button onClick={submit}>전송</button>

            <div>
                {num}
            </div>
        </>
    );
}
