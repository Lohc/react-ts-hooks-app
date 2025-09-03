'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function UseRefExample() {
  // TODO: Implementa estos useRef
  const inputRef = useRef<HTMLInputElement>(null);
  const countRef = useRef(0);
  const [renderCount, setRenderCount] = useState(0);

  // TODO: Implementa esta función para enfocar el input
  const focusInput = () => {
    // Pista: usa inputRef.current?.focus()
  };

  // TODO: Implementa esta función para incrementar el contador sin re-renderizar
  const incrementWithoutRerender = () => {
    // Pista: incrementa countRef.current y muestra el valor con alert()
  };

  // TODO: Implementa esta función para forzar un re-render
  const forceRerender = () => {
    // Pista: usa setRenderCount con el valor actual + 1
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Referencia al DOM</CardTitle>
            <CardDescription>
              Usa useRef para acceder directamente a elementos del DOM
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input ref={inputRef} placeholder="Haz clic en el botón para enfocarme" />
            <Button onClick={focusInput} className="w-full">
              Enfocar Input
            </Button>
            <Badge variant="outline" className="text-xs">
              💡 Implementa focusInput() usando inputRef.current?.focus()
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Valor Persistente</CardTitle>
            <CardDescription>
              useRef mantiene valores entre renders sin causar re-renderizado
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Contador sin re-render:</p>
              <p className="text-2xl font-bold">{countRef.current}</p>
            </div>
            <Button
              onClick={incrementWithoutRerender}
              variant="outline"
              className="w-full bg-transparent"
            >
              Incrementar (sin re-render)
            </Button>
            <Button onClick={forceRerender} className="w-full">
              Forzar Re-render
            </Button>
            <Badge variant="secondary" className="text-xs">
              Renders: {renderCount}
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
            <strong>useRef vs useState:</strong> useRef no causa re-renderizado cuando cambia
          </p>
          <p>
            <strong>DOM refs:</strong> Acceso directo a elementos para focus, scroll, etc.
          </p>
          <p>
            <strong>Valores persistentes:</strong> Mantiene datos entre renders sin afectar el ciclo
            de vida
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
