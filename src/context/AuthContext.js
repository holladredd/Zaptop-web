import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const AuthContext = createContext(null);
const users = [];

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');
      if (token && storedUser) {
        setCurrentUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email,
      phone: '08012345678',
      points: 1250,
      profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg',
    };
    
    setCurrentUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('authToken', 'mock-token');
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    await Swal.fire({
      icon: 'success',
      title: 'Welcome back!',
      timer: 1500,
      showConfirmButton: false
    });
    
    router.push('/dashboard');
  };

  const register = async (name, email, phone, password) => {
    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      Swal.fire({ icon: 'error', title: 'User already exists!' });
      throw new Error('User exists');
    }

    const newUser = {
      id: (users.length + 1).toString(),
      name, email, phone, password,
      points: 0,
      profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
    };

    users.push(newUser);
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('authToken', 'mock-token');
    localStorage.setItem('user', JSON.stringify(newUser));
    
    await Swal.fire({
      icon: 'success',
      title: 'Account Created!',
      timer: 1500,
      showConfirmButton: false
    });
    
    router.push('/dashboard');
  };

  const logout = () => {
    Swal.fire({
      title: 'Logout?',
      text: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout'
    }).then((result) => {
      if (result.isConfirmed) {
        setCurrentUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        router.push('/login');
      }
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, isLoading, login, register, logout, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
