'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UseRefExample } from '@/00-Practice/components/examples/use-ref-example';
import { UseReducerExample } from '@/00-Practice/components/examples/use-reducer-example';
import { UseContextExample } from '@/00-Practice/components/examples/use-context-example';

export default function ReactHooksTutorial() {
  return (
    <div>
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-balance">Tutorial de React Hooks</h1>
            <p className="text-muted-foreground text-lg">
              Aprende useRef, useReducer y useContext con ejemplos prácticos
            </p>
          </div>

          <Tabs defaultValue="useref" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="useref">useRef</TabsTrigger>
              <TabsTrigger value="usereducer">useReducer</TabsTrigger>
              <TabsTrigger value="usecontext">useContext</TabsTrigger>
            </TabsList>

            <TabsContent value="useref" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>useRef Hook</CardTitle>
                  <CardDescription>
                    useRef te permite referenciar un valor que no es necesario para el renderizado.
                    También se usa para acceder directamente a elementos del DOM.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UseRefExample />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="usereducer" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>useReducer Hook</CardTitle>
                  <CardDescription>
                    useReducer es una alternativa a useState para manejar estado complejo. Es útil
                    cuando el próximo estado depende del anterior.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UseReducerExample />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="usecontext" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>useContext Hook</CardTitle>
                  <CardDescription>
                    useContext te permite leer y suscribirte a un contexto desde tu componente.
                    Evita el "prop drilling" compartiendo datos entre componentes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UseContextExample />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
