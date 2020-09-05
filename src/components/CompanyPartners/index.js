import React from 'react';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';

function CompanyPartners() {
  return (
    <div>
      <section className="section is-white">
        <Heading>Company Partners</Heading>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(CompanyPartners);
