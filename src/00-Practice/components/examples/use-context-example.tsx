'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Moon, Sun } from 'lucide-react';

// TODO: Define los tipos del contexto
interface User {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// TODO: Crea los contextos
const UserContext = createContext<UserContextType | undefined>(undefined);
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// TODO: Implementa el UserProvider
function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (newUser: User) => {
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

// TODO: Implementa el ThemeProvider
function LocalThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'dark' ? 'dark' : ''}>{children}</div>
    </ThemeContext.Provider>
  );
}

// TODO: Implementa los custom hooks
function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Componentes que usan el contexto
function LoginForm() {
  const { login } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    if (name && email) {
      login({ name, email, role: 'user' });
      setName('');
      setEmail('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Iniciar Sesión
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleLogin} className="w-full">
          Entrar
        </Button>
      </CardContent>
    </Card>
  );
}

function UserProfile() {
  const { user, logout, updateUser } = useUser();
  const [newName, setNewName] = useState('');

  if (!user) {
    return <LoginForm />;
  }

  const handleUpdateName = () => {
    if (newName.trim()) {
      updateUser({ name: newName });
      setNewName('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Perfil de Usuario
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>{user.role}</Badge>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Nuevo nombre"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Button onClick={handleUpdateName} variant="outline">
            Actualizar
          </Button>
        </div>
        <Button onClick={logout} variant="destructive" className="w-full">
          Cerrar Sesión
        </Button>
      </CardContent>
    </Card>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V6a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v4c0 6 8 10 8 10z"></path>
            <polyline points="12 2 19 21 12 17 5 21 12 2"></polyline>
          </svg>
          Configuración de Tema
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={toggleTheme} variant="outline" className="w-full bg-transparent">
          {theme === 'light' ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
          Cambiar a {theme === 'light' ? 'Oscuro' : 'Claro'}
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Tema actual: <Badge variant="outline">{theme}</Badge>
        </p>
      </CardContent>
    </Card>
  );
}

export function UseContextExample() {
  return (
    <LocalThemeProvider>
      <UserProvider>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <UserProfile />
            <ThemeToggle />
          </div>

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base">📚 Conceptos Clave</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                <strong>Context:</strong> Comparte datos entre componentes sin prop drilling
              </p>
              <p>
                <strong>Provider:</strong> Componente que provee el valor del contexto
              </p>
              <p>
                <strong>Custom Hooks:</strong> Encapsula la lógica de useContext para mejor DX
              </p>
              <p>
                <strong>Cuándo usar:</strong> Temas, autenticación, configuración global
              </p>
            </CardContent>
          </Card>
        </div>
      </UserProvider>
    </LocalThemeProvider>
  );
}
