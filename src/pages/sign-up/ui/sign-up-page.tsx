import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, PasswordInput, TextInput } from '@mantine/core';

import { useUnit } from 'effector-react';

import { UnauthorizedLayout } from '@/layouts/unauthorized-layout';

import { $signUpError, resetSignUpError, signUp, signUpFx } from '../model/sign-up';
import { SignUpSchema, signUpSchema } from '../model/sign-up-schema';

import styles from './sign-up-page.module.css';

export const SignUpPage = () => {
  const isPending = useUnit(signUpFx.pending);
  const error = useUnit($signUpError);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = handleSubmit((data) => {
    signUp(data);
  });

  useEffect(() => {
    setError(
      'email',
      {
        message: error ?? undefined,
      },
      { shouldFocus: true },
    );
  }, [error, setError]);

  useEffect(() => {
    return () => {
      resetSignUpError();
    };
  }, []);

  return (
    <UnauthorizedLayout>
      <form className={styles.form} onSubmit={onSubmit}>
        <TextInput
          {...register('firstName')}
          label="First name"
          error={errors.firstName?.message}
          disabled={isPending}
        />
        <TextInput
          {...register('lastName')}
          label="Last name"
          error={errors.lastName?.message}
          disabled={isPending}
        />
        <TextInput
          {...register('email')}
          label="Email"
          error={errors.email?.message}
          disabled={isPending}
        />
        <PasswordInput
          {...register('password')}
          label="Password"
          error={errors.password?.message}
          disabled={isPending}
        />
        <PasswordInput
          {...register('confirmPassword')}
          label="Confirm password"
          error={errors.confirmPassword?.message}
          disabled={isPending}
        />
        <Button type="submit" loading={isPending}>
          Create Account
        </Button>
      </form>
    </UnauthorizedLayout>
  );
};
