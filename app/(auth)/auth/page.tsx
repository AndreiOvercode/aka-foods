import Link from 'next/link';
import { Button } from 'src/shadcn/ui/button';

const LoginPage = () => {
  return (
    <div className="mb-20 flex w-full grow flex-col items-center justify-center">
      <div className="max-w-[466px]">
        <h1 className="title ">Create company account</h1>
        <span className="mt-4 inline-block font-light">
          Enroll your company today to begin utilizing our application. Craft
          the ultimate experience in the food industry for your entire team
        </span>
      </div>
      <Button className="mt-8 h-16 w-full p-0 text-base">
        <Link
          href={'/auth/registration/create-account'}
          className="flex h-full w-full items-center justify-center"
        >
          Create account
        </Link>
      </Button>
    </div>
  );
};

export default LoginPage;
