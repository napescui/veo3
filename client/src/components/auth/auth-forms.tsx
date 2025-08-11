import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, signupSchema, type LoginData, type SignupData } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export function AuthForms() {
  const { login, signup, isLoginLoading, isSignupLoading } = useAuth();
  const { toast } = useToast();
  
  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      firstName: "",
      lastName: "",
    },
  });

  const onLogin = async (data: LoginData) => {
    try {
      await login(data);
      toast({
        title: "Login berhasil",
        description: "Selamat datang kembali!",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login gagal",
        description: error.message || "Email atau password salah",
      });
    }
  };

  const onSignup = async (data: SignupData) => {
    try {
      await signup(data);
      toast({
        title: "Registrasi berhasil",
        description: "Akun Anda telah dibuat!",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registrasi gagal",
        description: error.message || "Terjadi kesalahan saat membuat akun",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2" data-testid="auth-tabs">
          <TabsTrigger value="login" data-testid="tab-login">Login</TabsTrigger>
          <TabsTrigger value="signup" data-testid="tab-signup">Daftar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Masuk ke akun VideoAI Anda
              </CardDescription>
            </CardHeader>
            <form onSubmit={loginForm.handleSubmit(onLogin)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="nama@email.com"
                    {...loginForm.register("email")}
                    data-testid="input-login-email"
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-sm text-red-600" data-testid="error-login-email">
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Password Anda"
                    {...loginForm.register("password")}
                    data-testid="input-login-password"
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-sm text-red-600" data-testid="error-login-password">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoginLoading}
                  data-testid="button-login-submit"
                >
                  {isLoginLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Masuk
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Akun</CardTitle>
              <CardDescription>
                Buat akun VideoAI baru
              </CardDescription>
            </CardHeader>
            <form onSubmit={signupForm.handleSubmit(onSignup)}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-firstname">Nama Depan</Label>
                    <Input
                      id="signup-firstname"
                      placeholder="Nama depan"
                      {...signupForm.register("firstName")}
                      data-testid="input-signup-firstname"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-lastname">Nama Belakang</Label>
                    <Input
                      id="signup-lastname"
                      placeholder="Nama belakang"
                      {...signupForm.register("lastName")}
                      data-testid="input-signup-lastname"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-username">Username (opsional)</Label>
                  <Input
                    id="signup-username"
                    placeholder="Username unik"
                    {...signupForm.register("username")}
                    data-testid="input-signup-username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="nama@email.com"
                    {...signupForm.register("email")}
                    data-testid="input-signup-email"
                  />
                  {signupForm.formState.errors.email && (
                    <p className="text-sm text-red-600" data-testid="error-signup-email">
                      {signupForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Minimal 6 karakter"
                    {...signupForm.register("password")}
                    data-testid="input-signup-password"
                  />
                  {signupForm.formState.errors.password && (
                    <p className="text-sm text-red-600" data-testid="error-signup-password">
                      {signupForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSignupLoading}
                  data-testid="button-signup-submit"
                >
                  {isSignupLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Daftar
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}