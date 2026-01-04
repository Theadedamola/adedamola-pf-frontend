import { useState } from 'react';
import { z } from 'zod';
import { useLogin } from '../../../hooks/queries/useAuthQueries';
import { Input } from '../../../components/common/Input';
import { Button } from '../../../components/common/Button';
import { motion } from 'framer-motion';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<{ email?: string; password?: string }>({});
  
  const { mutate: login, isPending, error: apiError } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setValidationErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    login({ email, password });
  };

  const errorMessage = apiError 
    ? (apiError as any).response?.data?.message || 'Invalid credentials' 
    : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-thaloria mb-2">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Sign in to manage your portfolio</p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-lg">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              // Remove required to let Zod handle validation feedback if desired, 
              // or keep it for HTML5 validation. Let's keep HTML5 validation as a first layer 
              // but relies on Zod for custom messages if needed.
              // Actually, removing required allows demonstrating Zod validation.
            />
            {validationErrors.email && (
              <p className="mt-1 text-xs text-red-500">{validationErrors.email}</p>
            )}
          </div>
          
          <div>
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            {validationErrors.password && (
              <p className="mt-1 text-xs text-red-500">{validationErrors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3"
            disabled={isPending}
          >
            {isPending ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
