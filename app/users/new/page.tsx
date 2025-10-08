import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../../lib/auth';
import { NewUserForm } from './new-user-form';

export default async function NewUserPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <section style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}>
      <NewUserForm />
    </section>
  );
}
