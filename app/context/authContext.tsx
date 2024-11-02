"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import instance from "../api/axios";

// 로그인 상태와 관련된 타입 정의
interface AuthContextType {
  isLogin: boolean;
  userInfo: UserInfo | undefined;
  setUser: (info: any) => void;
  login: () => void;
  logout: () => void;
}

// userinfo type
interface UserInfo {
  userId: number;
  username: string;
  nickname: string;
  role: string;
}

// 기본 값 설정
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider의 Props 타입 정의
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider 컴포넌트 구현
export function AuthProvider({ children }: AuthProviderProps) {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  async function getUserInfo() {
    try {
      const response = await instance.get("/user");
      setUserInfo(response.data);
      setIsLogin(true);
    } catch (error) {
      setUserInfo(undefined);
      setIsLogin(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      getUserInfo();
    }
  }, []);

  const login = () => setIsLogin(true);
  const logout = () => setIsLogin(false);
  const setUser = (info: any) => {
    console.log("info : ", info);
    setUserInfo(info);
  };

  return <AuthContext.Provider value={{ isLogin, userInfo, setUser, login, logout }}>{children}</AuthContext.Provider>;
}

// AuthContext를 사용하기 위한 커스텀 훅
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
