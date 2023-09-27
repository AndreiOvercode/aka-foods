import { Database as DB } from 'src/lib/database.types';

declare global {
  type Database = DB;

  type TRecipe = DB['public']['Tables']['recipes']['Row'];
}
