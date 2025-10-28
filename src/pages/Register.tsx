import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      await register({ email, username, password });
      toast.success('Konto opprettet!');
      navigate('/account');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Kunne ikke opprette konto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md glass-card rounded-2xl p-8 border border-border/60">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-foreground">
            <span className="text-primary">Profit</span>Cruiser
          </h1>
          <p className="text-muted-foreground text-sm mt-2">Opprett en konto for å kjøpe scripts og følge bestillinger.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">E-post</label>
            <Input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="deg@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Brukernavn</label>
            <Input
              type="text"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="ProfitCruiserFan"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Passord</label>
            <Input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? 'Oppretter...' : 'Registrer deg'}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Har du allerede en konto?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Logg inn
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
