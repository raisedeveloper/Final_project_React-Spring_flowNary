import emailjs from 'emailjs-com';
import { useState } from 'react';

function EmailButton() {
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [recipientEmail, setRecipientEmail] = useState('');

    const sendVerificationEmail = () => {
        const templateParams = {
            to_email: recipientEmail,
            from_name: 'FlowNary',
            message: '테스트입니다!!'
        };

        emailjs
            .send(
                'service_0fovj6m', // 서비스 ID
                'flownary-email', // 템플릿 ID
                templateParams,
                'YwSSGAZM_oSGP7UqC' // public-key
            )
            .then((response) => {
                console.log('이메일이 성공적으로 보내졌습니다:', response);
                setIsEmailSent(true);
            })
            .catch((error) => {
                console.error('이메일 보내기 실패:', error);
            });
    };

    const handleVerification = () => {
        if (recipientEmail) {
            sendVerificationEmail();
        } else {
            alert('이메일 주소를 입력해주세요.');
        }
    };

    return (
        <div>
            <h2>이메일 인증</h2>
            {isEmailSent ? (
                <p>인증 이메일이 성공적으로 발송되었습니다. 이메일을 확인해주세요!</p>
            ) : (
                <div>
                    <input
                        type="email"
                        placeholder="받는 사람 이메일"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                    />
                    <button onClick={handleVerification}>인증</button>
                </div>
            )}
        </div>
    );
}

export default EmailButton;
