
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  showAdminLink?: boolean;
  title?: string;
}

const Header: FC<HeaderProps> = ({ 
  showAdminLink = false,
  title = "Office of the University Registrar - USTP CDO"
}) => {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">{title}</h1>
        {showAdminLink && (
          <Link 
            to="/admin/dashboard" 
            className="text-sm hover:underline"
          >
            Admin Dashboard
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
