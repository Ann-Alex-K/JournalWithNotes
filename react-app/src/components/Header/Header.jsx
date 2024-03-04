import SelectUser from '../SelectUser/SelectUser';
import Button from '../Button/Button';
import { useCallback, useState } from 'react';
import Logo from '../Logo/Logo';

const logos = ['/logo.svg', '/vite.svg'];
function Header() {
  const [logoIds, setLogoIds] = useState(0);

  const toggleLogo = useCallback(() => {
    setLogoIds(state => Number(!state));
  }, []);

  return (
    <>
      <Logo image={logos[logoIds]} />
      <SelectUser />
      <Button onClick={toggleLogo}>Сменить лого</Button>
    </>
  );
}

export default Header;
