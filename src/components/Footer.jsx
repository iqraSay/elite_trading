import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-yellow-300 text-yellow-900 py-5 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center space-x-5">
        <div className="text-center  mb-4 md:mb-0">
          <p>Contact for more details on WhatsApp: +9172202849 or Email: <a href="mailto:ershadali@hotmail.com" className="underline">ershadali@hotmail.com </a></p>
        </div>
        <div className="flex space-x-4">
          <a href="https://m.facebook.com/EliteTradingPune/" target="_blank" rel="noopener noreferrer" className="text-brown-900 hover:text-brown-700">
            <FontAwesomeIcon icon={faFacebook} className="text-2xl" />
          </a>
          <a href="https://www.instagram.com/ershadali11" target="_blank" rel="noopener noreferrer" className="text-brown-900 hover:text-brown-700">
            <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
          </a>
        </div>
      </div>
        <br />
        <p className='text-center'>© 2024 Elite Trading. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
