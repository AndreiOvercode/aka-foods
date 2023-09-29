'use client';

import { FC, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { FormSteps } from 'src/features/auth/ui/form-steps';
import { Button } from 'src/shadcn/ui/button';

interface LoginLayoutProps {
  children: ReactNode;
}

const createAccountHref = '/auth/registration/create-account';
const infoHref = '/auth/registration/info';
const addMemberHref = '/auth/registration/add-member';

const titles = [
  {
    href: createAccountHref,
    title: 'Create account',
    subtitle:
      'Please enter your account details. This process will require under 2 minutes.',
  },
  {
    href: infoHref,
    title: 'Basic information',
    subtitle: 'Provide essential information and incorporate company details.',
  },
  {
    href: addMemberHref,
    title: 'Add Team members',
    subtitle:
      'You can add team members to your team now or do it later in the application',
    widget: 'Optional',
  },
];

const LoginLayout: FC<LoginLayoutProps> = ({ children }) => {
  const router = useRouter();

  const pathname = usePathname();

  const isActiveStep = (pathnamesList: string[]) =>
    pathnamesList.some((path) => pathname.startsWith(path));

  const stepsData = [
    {
      active: isActiveStep([createAccountHref, infoHref, addMemberHref]),
      href: createAccountHref,
    },
    {
      active: isActiveStep([infoHref, addMemberHref]),
      href: infoHref,
    },
    {
      active: isActiveStep([addMemberHref]),
      href: addMemberHref,
    },
  ];

  const { title, subtitle, widget } =
    titles.find(({ href }) => pathname.startsWith(href)) || {};

  return (
    <div>
      <Button onClick={router.back} variant={'link'} className="relative mt-4">
        <ChevronLeft className="absolute -left-1" width={16} height={16} /> Go
        Back
      </Button>
      <div className="mt-8">
        <FormSteps stepsData={stepsData} />
      </div>

      <div className="mt-6 max-w-[320px]">
        <p className="title">{title}</p>
        <p className="mt-2 font-light">{subtitle}</p>
      </div>
      {children}
    </div>
  );
};

export default LoginLayout;
