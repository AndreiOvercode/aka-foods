import * as z from 'zod';

export const infoSchema = z.object({
  companyName: z.string().min(1, { message: 'Company name required' }),
  country: z.string().min(1, 'Country required'),
  state: z.string().optional(),
  city: z.string().optional(),
});

export type TInfoFormType = z.infer<typeof infoSchema>;

export type InfoSelectItem = {
  label: string;
  value: string;
};

export type TInfoDefaultFieldItem = {
  label: string;
  name: keyof TInfoFormType;
  placeholder: string;
};

export type TInfoSelectFieldItem = TInfoDefaultFieldItem & {
  fieldType: 'select';
  notFoundContent: string;
  searchPlaceholder: string;
  options: InfoSelectItem[];
};

export type TInfoFieldItem = TInfoDefaultFieldItem & {
  fieldType: 'input';
};

export const infoDefaultValues: TInfoFormType = {
  companyName: '',
  country: '',
  state: '',
  city: '',
};

export const infoDefaultFields: (TInfoSelectFieldItem | TInfoFieldItem)[] = [
  {
    label: 'Company name',
    name: 'companyName',
    placeholder: 'Enter Company name',
    fieldType: 'input',
  },
  {
    label: 'Country',
    name: 'country',
    placeholder: 'Choose Country',
    fieldType: 'select',
    notFoundContent: 'No countries found',
    searchPlaceholder: 'Search country',
    options: [
      { label: 'Israel', value: 'israel' },
      { label: 'India', value: 'india' },
      { label: 'USA', value: 'usa' },
      { label: 'UK', value: 'uk' },
    ],
  },
  {
    label: 'State (Optional)',
    name: 'state',
    placeholder: 'Choose State',
    fieldType: 'select',
    notFoundContent: 'No states found',
    searchPlaceholder: 'Search state',
    options: [
      { label: 'Tel Aviv', value: 'tel-aviv' },
      { label: 'Jerusalem', value: 'jerusalem' },
      { label: 'Haifa', value: 'haifa' },
      { label: 'Rishon Lezion', value: 'rishon-lezion' },
    ],
  },
  {
    label: 'City (Optional)',
    name: 'city',
    placeholder: 'Choose City',
    fieldType: 'select',
    notFoundContent: 'No cities found',
    searchPlaceholder: 'Search city',
    options: [
      { label: 'Tel Aviv', value: 'tel-aviv' },
      { label: 'Jerusalem', value: 'jerusalem' },
      { label: 'Haifa', value: 'haifa' },
      { label: 'Rishon Lezion', value: 'rishon-lezion' },
    ],
  },
];
