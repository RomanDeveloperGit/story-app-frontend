import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, PasswordInput, TextInput } from '@mantine/core';

import { useUnit } from 'effector-react';

import { UnauthorizedLayout } from '@/layouts/unauthorized-layout';

import { logIn, logInFx } from '../model/log-in';
import { LogInSchema, logInSchema } from '../model/log-in-schema';

import styles from './log-in-page.module.css';

export const LogInPage = () => {
  const isPending = useUnit(logInFx.pending);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LogInSchema>({
    resolver: zodResolver(logInSchema),
  });

  const onSubmit = handleSubmit((data) => {
    logIn(data);
  });

  return (
    <UnauthorizedLayout>
      <form className={styles.form} onSubmit={onSubmit}>
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
        <Button type="submit" loading={isPending}>
          Log In
        </Button>
      </form>
    </UnauthorizedLayout>
  );
};
