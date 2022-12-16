import { Link } from 'react-router-dom';
import ButtonMailto from '../mailTo';
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import emaillogo from '../logoContactPage/emaillogo.png';
import facebooklogo from '../logoContactPage/facebooklogo.png';
import linkedinlogo from '../logoContactPage/linkedinlogo.png';
import phonelogo from '../logoContactPage/phonelogo.png';
import skypelogo from '../logoContactPage/skypelogo.png';
import twitterlogo from '../logoContactPage/twitterlogo.png';

function Contact() {
  const form = useRef<HTMLFormElement>(null!);

  const sendEmail = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log('Trying to send email');
    emailjs
      .sendForm(
        'service_8nakf3g',
        'template_99uif1d',
        form.current,
        '5ljdZ00aN6vQuKHKv'
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log('Email successfully sent!');
          alert('Message sent');
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <>
      <div id='halloj'>
        <Link to='/'>
          <button className='button button1'>
            <span>Home</span>
          </button>{' '}
        </Link>
        <div id='contact'>
          <div id='contactTitle'>
            <h1>Contact Me</h1>
          </div>
          <div id='contactInformationBox'>
            <ul id='listLogo'>
              <li id='email'>
                <a href='mailto:JohnDoe@email.com' data-testid='emailLink'>
                  {' '}
                  <img id='emaillogo' src={emaillogo} />{' '}
                </a>{' '}
              </li>

              <li id='phone'>
                <a href='tel:+4588888888' data-testid='phoneLink'>
                  {' '}
                  <img id='phonelogo' src={phonelogo} />{' '}
                </a>
              </li>

              <li id='skype'>
                <a href='https://www.skype.com/en/' data-testid='skypeLink'>
                  <img id='skypelogo' src={skypelogo} />
                </a>
              </li>

              <li id='linkedin'>
                {' '}
                <a href='https://www.linkedin.com/' data-testid='linkedinLink'>
                  <img id='linkedinlogo' src={linkedinlogo} />
                </a>
              </li>

              <li id='facebook'>
                {' '}
                <a href='https://www.facebook.com/' data-testid='fbLink'>
                  <img id='facebooklogo' src={facebooklogo} />
                </a>
              </li>

              <li id='twitter'>
                {' '}
                <a href='https://www.twitter.com/' data-testid='twitterLink'>
                  <img id='twitterlogo' src={twitterlogo} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='contactContainer'>
          <form ref={form} onSubmit={sendEmail} data-testid='form'>
            <label htmlFor='fname'>Name</label>
            <input
              type={'text'}
              id='fname'
              name='user_name'
              className='AskeIsADummy'
              placeholder='Your name'
            ></input>
            <label htmlFor='lname'>Email</label>
            <input
              type={'text'}
              id='lname'
              name='user_email'
              className='AskeIsADummy'
              placeholder='Your email'
            ></input>
            <label htmlFor='fname'>Message</label>
            <textarea
              className='AskeIsADummy'
              id='subject'
              name='message'
              style={{ height: '200px' }}
              placeholder='Your message'
            ></textarea>
            <input
              className='AskeIsADummy'
              type='submit'
              value='Contact me'
              placeholder='Contact me'
            ></input>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
//hje
