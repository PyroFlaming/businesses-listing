import React from 'react';

import style from './contact.module.scss';

/* eslint-disable-next-line */
export interface ContactProps {
  contact: {
    phone: string,
    email: string,
  }
}

export function Contact({ contact }: ContactProps) {

  return (
    <div className={style.contact}>
      <div>
        <a href="tel:{contact.phone}">{contact.phone}</a>
      </div>
      <div>
        {contact.email}
      </div>
    </div>
  );
}

export default Contact;
