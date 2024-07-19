import { Link } from 'react-router-dom';
import logo from '../logo.svg';

const Navbar = () => {
  return (
    <nav className="border-gray-200 light:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-6">
        <Link to="/" className="flex items-center">
          <img src={logo} className="h-10 md:h-28 dark:invert" alt="logo" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;