import type { FC } from 'react';
import Link from 'next/link';
import { cn } from 'src/lib/utils';
import { Button } from 'src/shadcn/ui/button';

interface FormStepsProps {
  stepsData: {
    active: boolean;
    href?: string;
    action?: () => void;
  }[];
}

const FormSteps: FC<FormStepsProps> = ({ stepsData }) => {
  const lastStepIndex = stepsData.length - 1;

  return (
    <div className="-ml-1 flex">
      {stepsData.map((step, index) => (
        <div key={index} className="flex items-center">
          <Button
            onClick={step.action && step.action}
            className={cn(
              'mx-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#A66A93] font-medium shadow-none hover:bg-[#A66A93]/90',
              {
                'p-0': step.href,
                'bg-[#F8F9FC] border border-[#A4B2C7] text-[#A4B2C7] hover:bg-[#F8F9FC] pointer-events-none':
                  !step.active,
              },
            )}
          >
            {step.href ? (
              <Link
                href={step.href}
                className="flex h-full w-full items-center justify-center"
              >
                {index + 1}
              </Link>
            ) : (
              index + 1
            )}
          </Button>

          {index !== lastStepIndex && (
            <div
              className={cn('w-16 border-[0.5px] border-[#A66A93]', {
                'border-dashed border-[#A4B2C7]': !stepsData[index + 1]?.active,
              })}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FormSteps;
