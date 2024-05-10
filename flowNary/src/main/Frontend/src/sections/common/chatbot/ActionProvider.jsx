
import React, { useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const [activeGroup, setActiveGroup] = useState(null); // 현재 활성화된 기능 그룹 상태
    const [featureButtons, setFeatureButtons] = useState([]);

    // 챗봇 채팅 관련 함수
    function handleTalkChatbot() {
        const botMessage = createChatBotMessage('저랑 대화하실려구요? 반가워요! ^^')
        setState(({ messages: [botMessage] }));
    }
    
    const handleHello = () => {
        // 무작위로 선택될 메시지들의 배열
        const messageHello = [
            '네! 만나서 반갑습니다!',
            '안녕하세요! 어떻게 도와드릴까요?',
            '반갑습니다! 궁금한 것이 있으면 물어보세요.'
        ];

        // 랜덤 인덱스를 사용하여 배열에서 하나의 메시지를 선택
        const randomIndex = Math.floor(Math.random() * messageHello.length);
        const botMessage = createChatBotMessage(messageHello[randomIndex]);

        // 상태 업데이트 함수에서 새 메시지를 기존 메시지 배열에 추가
        setState(prev => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    const handleUnknownMessage = () => {
        const botMessage = createChatBotMessage('죄송합니다ㅠㅠ 무슨 말씀인지 모르겠습니다.');

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    const handleEasterEgg = () => {
        const botMessage = createChatBotMessage('이스터에그를 발견하셨어요!! 축하해요.');
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));

        // 1초 후에 두 번째 메시지를 보냅니다.
        setTimeout(() => {
            const secondMessage = createChatBotMessage(
                '우리 FlowNary 팀원을 소개할게요^^'
            );
            setState(prev => ({ ...prev, messages: [...prev.messages, secondMessage] }));
        }, 2000);

        setTimeout(() => {
            const thirdMessage = createChatBotMessage(
                'PPT 기획안 디자인 구현 파일 컨펌 부장 : 프론트엔드, 백엔드 기술구현 된거 보고 종합의견 및 컨펌 외 팀원관리, 발표준비 하고 죙일 기록만해 이윤주'
            );
            setState(prev => ({ ...prev, messages: [...prev.messages, thirdMessage] }));
        }, 3500);

        setTimeout(() => {
            const fourthMessage = createChatBotMessage(
                '백, 프론트 기술 자문 교육 및 파일 정리 부장 : 앉지 말고 돌아다니면서 말만해 안순현'
            );
            setState(prev => ({ ...prev, messages: [...prev.messages, fourthMessage] }));
        }, 6500);

        setTimeout(() => {
            const fifthMessage = createChatBotMessage(
                '백엔드 구현 부장 : 앉아서 개발 그만 잘해.. 이병학'
            );
            setState(prev => ({ ...prev, messages: [...prev.messages, fifthMessage] }));
        }, 8500);

        setTimeout(() => {
            const sixthMessage = createChatBotMessage(
                '백엔드 보조 및 프론트엔드 구현 부장 : 하루 종일 머리박고 디자인을 아름답게하고 교육자문 호출만 해 정성한 '
            );
            setState(prev => ({ ...prev, messages: [...prev.messages, sixthMessage] }));
        }, 10500);

        setTimeout(() => {
            const seventhMessage = createChatBotMessage(
                '데이터베이스 스프링 관리 부장 : 앉아서 스프링이랑 데이터를 연결하고 관리하는 곽주영'
            );
            setState(prev => ({ ...prev, messages: [...prev.messages, seventhMessage] }));
        }, 12500);

        setTimeout(() => {
            const eighthMessage = createChatBotMessage(
                '데이터베이스 자료 조사 부장 : 말없이 조용히 데이터 추가 및 수정 하는 윤영준'
            );
            setState(prev => ({ ...prev, messages: [...prev.messages, eighthMessage] }));
        }, 9500);
    };


    // 게시글 관련 함수들
    function handleCreatePost() {
        const firstMessage = createChatBotMessage('게시글 작성 방법에 대해 안내합니다.');
        setState(prev => ({ ...prev, messages: [...prev.messages, firstMessage] }));

        // 1초 후에 두 번째 메시지를 보냅니다.
        setTimeout(() => {
            const secondMessage = createChatBotMessage(
                `옆 칸을 보시면 글쓰기가 있을거에요! 글쓰기 혹은 아이콘을 클릭하시면 당신의 글을 작성할 수 있습니다.`
            );
            setState(prev => ({ ...prev, messages: [...prev.messages, secondMessage] }));
        }, 1000); // 1000 밀리초 = 1초
    }

    function handleEditPost() {
        const botMessage = createChatBotMessage('게시글 수정 방법을 설명드립니다.');
        setState(prev => ({ ...prev, messages: [...prev.messages, botMessage] }));

        // 1초 후에 두 번째 메시지를 보냅니다.
        setTimeout(() => {
            const secondMessage = createChatBotMessage(
                `게시글 수정 방법입니다!`
            );
            setState(prev => ({ ...prev, messages: [...prev.messages, secondMessage] }));
        }, 1000); // 1000 밀리초 = 1초
    }

    function handleDeletePost() {
        const botMessage = createChatBotMessage('게시글 삭제 방법을 안내합니다.');
        setState(prev => ({ ...prev, messages: [...prev.messages, botMessage] }));
    }

    function handleSharePost() {
        const botMessage = createChatBotMessage('게시글 공유하는 방법을 설명합니다.');
        setState(prev => ({ ...prev, messages: [...prev.messages, botMessage] }));
    }

    function handleLikePost() {
        const botMessage = createChatBotMessage('게시글에 좋아요를 누르는 방법입니다.');
        setState(prev => ({ ...prev, messages: [...prev.messages, botMessage] }));
    }


    // 유저 관련 함수들
    function handleEditUserInfo() {
        const botMessage = createChatBotMessage('개인정보 수정 방법을 안내합니다.');
        setState(prev => ({ ...prev, messages: [...prev.messages, botMessage] }));
    }

    function handleChangeProfilePicture() {
        const botMessage = createChatBotMessage('프로필 사진 변경 방법을 설명합니다.');
        setState(prev => ({ ...prev, messages: [...prev.messages, botMessage] }));
    }

    function handleChangePassword() {
        const botMessage = createChatBotMessage('비밀번호 변경 방법을 안내합니다.');
        setState(prev => ({ ...prev, messages: [...prev.messages, botMessage] }));
    }

    function handleDomainInfo() {
        const botMessage = createChatBotMessage('도메인 정보에 대해 설명드립니다.');
        setState(prev => ({ ...prev, messages: [...prev.messages, botMessage] }));
    }

    function handleDeactivateAccount() {
        const botMessage = createChatBotMessage('계정 비활성화 방법을 안내합니다.');
        setState(prev => ({ ...prev, messages: [...prev.messages, botMessage] }));
    }


    // 채팅 관련 함수들
    function handleStartChat() {
        const botMessage = createChatBotMessage('친구와 채팅을 시작하는 방법입니다.');
        setState(prev => ({ ...prev, messages: [...prev.messages, botMessage] }));
    }

    function handleStopChat() {
        const botMessage = createChatBotMessage('채팅을 중지하는 방법을 설명합니다.');
        setState(prev => ({ ...prev, messages: [...prev.messages, botMessage] }));
    }

    function handleBlockUser() {
        const botMessage = createChatBotMessage('사용자를 차단하는 방법을 안내합니다.');
        setState(prev => ({
            ...prev,
            messages: [...prev.messages, botMessage]
        }));
    }

    const setGroup = (group) => {
        setActiveGroup(group);
        setFeatureButtons(features[group]);
        const botMessage = createChatBotMessage(`${group}을(를) 선택하셨습니다. 무엇이 궁금하신가요?`);
        setState(({
            messages: [botMessage]
        }));
    };

    const features = {
        챗봇: [
            { name: "챗봇과 대화시작.", handler: handleTalkChatbot },
        ],

        게시글: [
            { name: "게시글 작성 방법", handler: handleCreatePost },
            { name: "게시글 수정 방법", handler: handleEditPost },
            { name: "게시글 삭제 방법", handler: handleDeletePost },
            { name: "게시글 공유 방법", handler: handleSharePost },
            { name: "게시글 좋아요 방법", handler: handleLikePost }
        ],
        유저: [
            { name: "개인정보 수정 방법", handler: handleEditUserInfo },
            { name: "프로필 사진 변경 방법", handler: handleChangeProfilePicture },
            { name: "비밀번호 변경 방법", handler: handleChangePassword },
            { name: "도메인 정보 확인 방법", handler: handleDomainInfo },
            { name: "계정 비활성화 방법", handler: handleDeactivateAccount }
        ],
        채팅: [
            { name: "채팅 시작 방법", handler: handleStartChat },
            { name: "채팅 중지 방법", handler: handleStopChat },
            { name: "사용자 차단 방법", handler: handleBlockUser }
        ]
    };

    return (
        <div>
            <button className="help-btn" onClick={() => setGroup('챗봇')}>챗봇과 대화하기</button>
            <button className="help-btn" onClick={() => setGroup('게시글')}>게시글 관련 문의</button>
            <button className="help-btn" onClick={() => setGroup('유저')}>유저 관련 문의</button>
            <button className="help-btn" onClick={() => setGroup('채팅')}>채팅 관련 문의</button>

            {featureButtons.map(feature => (
                <button className='board-btn' key={feature.name} onClick={feature.handler}>{feature.name}</button>
            ))}

            {React.Children.map(children, child => {
                return React.cloneElement(child, {
                    actions: {
                        // 챗봇과 대화 
                        handleTalkChatbot, handleHello, handleUnknownMessage,
                        // 이스터에그
                        handleEasterEgg,

                        // 포스팅 문의
                        handleCreatePost, handleEditPost, handleDeletePost, handleSharePost, handleLikePost,

                        // 유저문의
                        handleEditUserInfo, handleChangeProfilePicture, handleChangePassword, handleDomainInfo,
                        handleDeactivateAccount,

                        // 채팅문의
                        handleStartChat, handleStopChat, handleBlockUser
                    }
                });
            })}
        </div>
    );
};

export default ActionProvider;