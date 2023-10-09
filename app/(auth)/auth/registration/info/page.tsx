'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronsUpDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  infoDefaultFields,
  infoDefaultValues,
  infoSchema,
  TInfoFormType,
} from 'src/entities/auth/model/infoFormData';
import { cn } from 'src/lib/utils';
import { Button } from 'src/shadcn/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from 'src/shadcn/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/shadcn/ui/form';
import { Input } from 'src/shadcn/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from 'src/shadcn/ui/popover';

const InfoPage = () => {
  const router = useRouter();

  const [openSelect, setOpenSelect] = useState<
    | {
        [key in keyof TInfoFormType]?: boolean;
      }
    | null
  >(null);

  const form = useForm<TInfoFormType>({
    resolver: zodResolver(infoSchema),
    defaultValues: infoDefaultValues,
  });

  function onSubmit(values: TInfoFormType) {
    router.replace('/auth/registration/info');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
        {infoDefaultFields.map((fieldValue, index) => (
          <FormField
            key={fieldValue.name}
            control={form.control}
            name={fieldValue.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldValue.label}</FormLabel>
                <FormControl>
                  {fieldValue.fieldType === 'input' ? (
                    <Input
                      placeholder={fieldValue.placeholder}
                      className="pr-12"
                      autoComplete={'on'}
                      {...field}
                      value={`${field.value}`}
                    />
                  ) : (
                    <Popover
                      open={!!openSelect?.[field.name]}
                      onOpenChange={() => {
                        setOpenSelect((prev) => ({
                          ...(prev ?? {}),
                          [field.name]: !prev?.[field.name],
                        }));
                      }}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="select"
                            size="select"
                            role="combobox"
                            className={cn(
                              'w-[500px]',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value
                              ? fieldValue.options.find(
                                  (option) => option.value === field.value,
                                )?.label
                              : fieldValue.placeholder}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[500px] p-0">
                        <Command>
                          <CommandInput
                            placeholder={fieldValue.searchPlaceholder}
                          />
                          <CommandEmpty>
                            {fieldValue.notFoundContent}
                          </CommandEmpty>
                          <CommandGroup className="max-h-[240px] overflow-y-auto">
                            {fieldValue.options.map((option) => (
                              <CommandItem
                                value={option.label}
                                key={option.value}
                                className={cn(
                                  option.value === field.value && 'bg-accent',
                                )}
                                onSelect={() => {
                                  const valueForSet =
                                    field.value === option.value
                                      ? ''
                                      : option.value;
                                  form.setValue(field.name, valueForSet);
                                  setOpenSelect(null);
                                }}
                              >
                                {option.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit" className="!mt-8 h-16 w-full">
          Next step
        </Button>
      </form>
    </Form>
  );
};

export default InfoPage;
