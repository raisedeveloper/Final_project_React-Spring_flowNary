import React, { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    signOut(auth).then(() => {
      console.log('로그아웃 성공');
      localStorage.removeItem("uid");
      localStorage.removeItem("email");
      localStorage.removeItem("profile");
      navigate('/authentication/sign-in');
    })
    .catch((error) => {
      console.error('로그아웃 오류:', error);
    });
  }, [auth, navigate]);

  return <div>로그아웃 중...</div>;
};

export default Logout;
