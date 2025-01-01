export interface User {
  email: string;
  id: number;
  name: string;
  surname: string;
  created_at: string;
}

export interface HomeProps {
  users: User[];
}
