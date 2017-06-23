import * as React from 'react';

import {Link} from 'office-ui-fabric-react/lib/Link';

import './Footer.css';

const Footer = () => (
  <div className="footer-container">
    {'© MACIF 2017. '}
    {' -- Made with '}
    <span className="text-red">♥</span>
    {' by '}
    <Link href="http://gitlab-02.dev.macif.fr:280/office-365/vip-dashboard">Alexandre GIRARD {'<@agirard>'}</Link>    
  </div>
);

export default Footer;