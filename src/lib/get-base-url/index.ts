export const getBaseUrl = () =>
  process.env.NODE_ENV === 'production'
    ? `https://aka-food-demo.vercel.app`
    : `http://localhost:${process.env.PORT ?? 3000}`;

export default getBaseUrl;
