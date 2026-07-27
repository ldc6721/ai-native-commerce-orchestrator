import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useLogin } from '../hooks/useLogin';
import { loginSchema, type LoginValues } from '../schemas/loginSchema';

interface LoginFormProps {
  onSuccess: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const loginMutation = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const submit = handleSubmit(async (values) => {
    try {
      await loginMutation.mutateAsync(values);
      onSuccess();
    } catch {
      // 정규화된 오류는 폼 아래에 표시한다.
    }
  });

  return (
    <form className="mt-8 space-y-5" onSubmit={submit} noValidate>
      <div>
        <label className="block text-sm font-medium text-slate-800" htmlFor="email">
          이메일
        </label>
        <input
          className="mt-2 w-full border border-slate-300 bg-white px-3 py-2 text-slate-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          {...register('email')}
        />
        {errors.email ? <p className="mt-2 text-sm text-red-700">{errors.email.message}</p> : null}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-800" htmlFor="password">
          비밀번호
        </label>
        <input
          className="mt-2 w-full border border-slate-300 bg-white px-3 py-2 text-slate-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          id="password"
          type="password"
          autoComplete="current-password"
          aria-invalid={Boolean(errors.password)}
          {...register('password')}
        />
        {errors.password ? <p className="mt-2 text-sm text-red-700">{errors.password.message}</p> : null}
      </div>

      {loginMutation.error ? (
        <p className="border-l-4 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {loginMutation.error.message}
        </p>
      ) : null}

      <button
        className="w-full bg-emerald-700 px-4 py-2.5 font-medium text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        type="submit"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? '로그인 중' : '로그인'}
      </button>
    </form>
  );
}
