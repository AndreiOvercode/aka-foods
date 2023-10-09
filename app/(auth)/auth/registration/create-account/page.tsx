'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Eye, EyeOffIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  createAccountDefaultFields,
  createAccountDefaultValues,
  createAccountSchema,
  TCreateAccountDefaultFieldItem,
  TCreateAccountFormType,
  validPassList,
} from 'src/entities/auth/model/createAccountFormData';
import { cn } from 'src/lib/utils';
import { Button } from 'src/shadcn/ui/button';
import { Checkbox } from 'src/shadcn/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/shadcn/ui/form';
import { Input } from 'src/shadcn/ui/input';

const CreateAccountPage = () => {
  const router = useRouter();

  const [fieldsList, setFieldList] = useState<TCreateAccountDefaultFieldItem[]>(
    createAccountDefaultFields,
  );

  const form = useForm<TCreateAccountFormType>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: createAccountDefaultValues,
  });

  const {
    watch,
    formState: { isValid, errors, isSubmitted },
  } = form;

  const handleChangePassType = useCallback(
    (name: 'password' | 'confirmPassword') => () => {
      setFieldList((prev) =>
        prev.map((item) => {
          if (item.name !== name) return item;
          return {
            ...item,
            type: item.type === 'password' ? 'text' : 'password',
          };
        }),
      );
    },
    [],
  );

  function onSubmit(values: TCreateAccountFormType) {
    router.replace('/auth/registration/info');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
        {fieldsList.map((fieldValue, index) => (
          <FormField
            key={fieldValue.name}
            control={form.control}
            name={fieldValue.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldValue.label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={fieldValue.placeholder}
                    className="pr-12"
                    type={fieldValue.type}
                    autoComplete={'on'}
                    {...field}
                    value={`${field.value}`}
                  />
                </FormControl>

                {(field.name === 'password' ||
                  field.name === 'confirmPassword') && (
                  <div
                    className="absolute right-6 top-10 cursor-pointer text-[#525A6A]"
                    onClick={handleChangePassType(field.name)}
                  >
                    {fieldValue.type === 'password' ? (
                      <Eye width={18} height={18} />
                    ) : (
                      <EyeOffIcon width={18} height={18} />
                    )}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <div className="!mt-6 flex flex-col gap-y-3">
          {validPassList.map((item, index) => {
            const isValid =
              isSubmitted &&
              item.validation(watch('password'), watch('confirmPassword'));

            return (
              <div
                key={index}
                className={cn('flex items-center', {
                  'text-destructive': isSubmitted && !isValid,
                })}
              >
                <CheckCircle2
                  className={cn('mr-2 h-4 w-4 rounded-full', {
                    'bg-[#62CBA5]': isValid,
                    'text-white': isValid,
                  })}
                />
                <span className="text-sm font-light">{item.text}</span>
              </div>
            );
          })}
          <FormField
            control={form.control}
            name={'policy'}
            render={({ field }) => (
              <FormItem>
                <div className="mt-2 flex flex-nowrap items-center gap-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>
                    I agree with{' '}
                    <Link href={'#'} className="underline">
                      Terms and Conditions
                    </Link>{' '}
                    and the{' '}
                    <Link href={'#'} className="underline">
                      Privacy Policy
                    </Link>
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="!mt-8 h-16 w-full">
          Next step
        </Button>
      </form>
    </Form>
  );
};

export default CreateAccountPage;
