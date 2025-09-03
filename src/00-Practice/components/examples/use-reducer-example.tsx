'use client';

import { useReducer } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Minus } from 'lucide-react';

// TODO: Define los tipos de acciones
type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number };

type CounterAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET_VALUE'; payload: number };

// TODO: Define el estado inicial para todos
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  nextId: number;
}

const initialTodoState: TodoState = {
  todos: [],
  nextId: 1,
};

const initialCounterState = { count: 0 };

// TODO: Implementa el reducer para todos
function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      // Pista: agrega un nuevo todo con id: state.nextId, text: action.payload, completed: false
      return state; // Reemplaza esto
    case 'TOGGLE_TODO':
      // Pista: cambia el completed del todo con id === action.payload
      return state; // Reemplaza esto
    case 'DELETE_TODO':
      // Pista: filtra los todos para excluir el que tiene id === action.payload
      return state; // Reemplaza esto
    default:
      return state;
  }
}

// TODO: Implementa el reducer para contador
function counterReducer(state: { count: number }, action: CounterAction) {
  switch (action.type) {
    case 'INCREMENT':
      // Pista: retorna { count: state.count + 1 }
      return state; // Reemplaza esto
    case 'DECREMENT':
      // Pista: retorna { count: state.count - 1 }
      return state; // Reemplaza esto
    case 'RESET':
      // Pista: retorna { count: 0 }
      return state; // Reemplaza esto
    case 'SET_VALUE':
      // Pista: retorna { count: action.payload }
      return state; // Reemplaza esto
    default:
      return state;
  }
}

export function UseReducerExample() {
  // TODO: Implementa los useReducer
  const [todoState, todoDispatch] = useReducer(todoReducer, initialTodoState);
  const [counterState, counterDispatch] = useReducer(counterReducer, initialCounterState);

  // TODO: Implementa estas funciones
  const addTodo = (text: string) => {
    if (text.trim()) {
      // Pista: dispatch({ type: 'ADD_TODO', payload: text })
    }
  };

  const toggleTodo = (id: number) => {
    // Pista: dispatch({ type: 'TOGGLE_TODO', payload: id })
  };

  const deleteTodo = (id: number) => {
    // Pista: dispatch({ type: 'DELETE_TODO', payload: id })
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contador con useReducer</CardTitle>
            <CardDescription>Maneja estado complejo con acciones definidas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <p className="text-3xl font-bold">{counterState.count}</p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => counterDispatch({ type: 'DECREMENT' })}
                variant="outline"
                size="icon"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => counterDispatch({ type: 'INCREMENT' })}
                variant="outline"
                size="icon"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => counterDispatch({ type: 'RESET' })}
                variant="destructive"
                className="flex-1"
              >
                Reset
              </Button>
            </div>
            <Input
              type="number"
              placeholder="Establecer valor específico"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const value = Number.parseInt(e.currentTarget.value);
                  if (!isNaN(value)) {
                    counterDispatch({ type: 'SET_VALUE', payload: value });
                    e.currentTarget.value = '';
                  }
                }
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lista de Tareas</CardTitle>
            <CardDescription>Estado complejo con múltiples acciones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Nueva tarea..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addTodo(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
            />
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {todoState.todos.map((todo) => (
                <div key={todo.id} className="flex items-center gap-2 p-2 border rounded">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="rounded"
                  />
                  <span
                    className={`flex-1 ${
                      todo.completed ? 'line-through text-muted-foreground' : ''
                    }`}
                  >
                    {todo.text}
                  </span>
                  <Button onClick={() => deleteTodo(todo.id)} variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Badge variant="secondary">
              Total: {todoState.todos.length} | Completadas:{' '}
              {todoState.todos.filter((t) => t.completed).length}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-base">📚 Conceptos Clave</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>
            <strong>Reducer:</strong> Función pura que toma (state, action) y retorna nuevo state
          </p>
          <p>
            <strong>Actions:</strong> Objetos con 'type' y opcionalmente 'payload'
          </p>
          <p>
            <strong>Cuándo usar:</strong> Estado complejo, múltiples sub-valores, lógica de
            actualización compleja
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
