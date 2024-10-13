"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// 로그인 상태와 관련된 타입 정의
interface AuthContextType {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
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

  const login = () => setIsLogin(true);
  const logout = () => setIsLogin(false);

  return <AuthContext.Provider value={{ isLogin, login, logout }}>{children}</AuthContext.Provider>;
}

// AuthContext를 사용하기 위한 커스텀 훅
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
