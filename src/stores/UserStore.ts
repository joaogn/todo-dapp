import create from 'zustand';
import Router from 'next/router'

interface User {
  account: string;
}

interface UserStoreState {
  user: User | null;
  setUser: (user:User) => void;
  removeUser: () => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  setUser: (user) => {
    localStorage.setItem("todo:user",JSON.stringify(user));
    set(state => ({user}))
    Router.push('dashboard')
  },
  removeUser: () => {
    localStorage.removeItem("todo:user");
    set(state => ({user:null}))
    Router.push('/')
  }
}))