import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, PasswordInput, TextInput } from '@mantine/core';

import { useUnit } from 'effector-react';

import { $createAccountError, createAccount, createAccountFx } from '../model/create-account';
import { CreateAccountSchema, createAccountSchema } from '../model/create-account-schema';

import styles from './sign-up.module.css';

export const SignUpPage = () => {
  const isPending = useUnit(createAccountFx.pending);
  const error = useUnit($createAccountError);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<CreateAccountSchema>({
    resolver: zodResolver(createAccountSchema),
  });

  const onSubmit = handleSubmit((data) => {
    createAccount(data);
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

  return (
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
  );
};
