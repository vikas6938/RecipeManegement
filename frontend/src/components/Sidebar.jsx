import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, PlusIcon, BookmarkIcon, HeartIcon, UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'; 

const Sidebar = () => {
  return (
    <div className="d-flex flex-column bg-white shadow text-white vh-100 p-3 shadow-lg position-fixed " style={{ width: '16rem' }}>
      <div className="text-center mb-5">
        {/* Logo or Header */}
        <h1 className="display-6 fw-bold text-dark">Recipe Manager</h1>
      </div>
      
      {/* Navigation Menu */}
      <nav className="nav flex-column">
        <Link to="/" className="nav-link text-dark d-flex align-items-center p-2 mb-3 rounded hover-effect">
          <HomeIcon className="me-2" style={{ width: '1.5rem', height: '1.5rem' }} />
          Home
        </Link>
        <Link to="/add" className="nav-link text-dark align-items-center p-2 mb-3 rounded hover-effect">
          <PlusIcon className="me-2" style={{ width: '1.5rem', height: '1.5rem' }} />
          Add Recipe
        </Link>
        <Link to="/my-recipes" className="nav-link text-dark d-flex align-items-center p-2 mb-3 rounded hover-effect">
          <BookmarkIcon className="me-2" style={{ width: '1.5rem', height: '1.5rem' }} />
          My Recipes
        </Link>
        <Link to="/favorites" className="nav-link text-dark d-flex align-items-center p-2 mb-3 rounded hover-effect">
          <HeartIcon className="me-2" style={{ width: '1.5rem', height: '1.5rem' }} />
          Favorites
        </Link>
        <Link to="/profile" className="nav-link text-dark d-flex align-items-center p-2 mb-3 rounded hover-effect">
          <UserIcon className="me-2" style={{ width: '1.5rem', height: '1.5rem' }} />
          Profile
        </Link>
        <Link to="/login" className="nav-link text-dark d-flex align-items-center p-2 mb-3 rounded hover-effect">
          <ArrowRightOnRectangleIcon className="me-2" style={{ width: '1.5rem', height: '1.5rem' }} />
          Login
        </Link>
        <Link to="/register" className="nav-link text-dark d-flex align-items-center p-2 mb-3 rounded hover-effect">
          <ArrowRightOnRectangleIcon className="me-2" style={{ width: '1.5rem', height: '1.5rem' }} />
          Register
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
