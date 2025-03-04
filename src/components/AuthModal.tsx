import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

// 🔹 Define props
type AuthModalProps = {
  initialView?: 'login' | 'signup';
  onAuthSuccess: (user: { id: string; email: string; name?: string }) => void;
};

const AuthModal: React.FC<AuthModalProps> = ({ initialView = 'login', onAuthSuccess }) => {
  const [view, setView] = useState<'login' | 'signup'>(initialView);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { toast } = useToast();

  const onSubmit = async (data: Record<string, any>) => {
    setLoading(true);
    const endpoint = view === 'login' 
      ? 'http://localhost:5000/api/context/login' 
      : 'http://localhost:5000/api/context/register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Something went wrong');

      toast({ title: 'Success', description: `You have successfully ${view}ed!` });

      // ✅ Fetch user details after login/signup
      const userRes = await fetch("http://localhost:5000/api/context/user", { credentials: "include" });
      const userData = await userRes.json();
      if (userRes.ok) {
        onAuthSuccess(userData); // ✅ Update state in App
      }

      reset();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-center">{view === 'login' ? 'Log in' : 'Sign up'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Email</Label>
          <Input {...register('email', { required: true })} type="email" />
        </div>
        <div>
          <Label>Password</Label>
          <Input {...register('password', { required: true })} type="password" />
        </div>
        {view === 'signup' && (
          <div>
            <Label>Name</Label>
            <Input {...register('name', { required: true })} type="text" />
          </div>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Processing...' : view === 'login' ? 'Log in' : 'Sign up'}
        </Button>
      </form>
      <p className="text-center text-sm">
        {view === 'login' ? "Don't have an account? " : 'Already have an account? '}
        <button
          type="button"
          className="text-primary underline"
          onClick={() => setView(view === 'login' ? 'signup' : 'login')}
        >
          {view === 'login' ? 'Sign up' : 'Log in'}
        </button>
      </p>
    </div>
  );
};

export default AuthModal;
