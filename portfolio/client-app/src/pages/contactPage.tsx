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
        },
        (error) => {
          console.log(error.text);
        }
      );
    alert('Message sent');
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
            <div id='contactText'>
              <ul id='listLogo'>
                <div id='email'>
                  {/* <ButtonMailto
                      mailto='JohnDoe@email.com'
                      label='JohnDoe@email.com'
                    /> */}
                  <a href='mailto:JohnDoe@email.com'>
                    {' '}
                    <img id='emaillogo' src={emaillogo} />{' '}
                  </a>{' '}
                </div>

                <div id='phone'>
                  <a href='tel:+4588888888'>
                    {' '}
                    <img id='phonelogo' src={phonelogo} />{' '}
                  </a>
                </div>

                <div id='skype'>
                  <a href='https://www.skype.com/en/'>
                    <img id='skypelogo' src={skypelogo} />
                  </a>
                </div>

                <div id='linkedin'>
                  {' '}
                  <a href='https://www.linkedin.com/'>
                    <img id='linkedinlogo' src={linkedinlogo} />
                  </a>
                </div>

                <div id='facebook'>
                  {' '}
                  <a href='https://www.facebook.com/'>
                    <img id='facebooklogo' src={facebooklogo} />
                  </a>
                </div>

                <div id='twitter'>
                  {' '}
                  <a href='https://www.twitter.com/'>
                    <img id='twitterlogo' src={twitterlogo} />
                  </a>
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div className='contactContainer'>
          <form ref={form} onSubmit={sendEmail}>
            <label htmlFor='fname'>First Name</label>
            <input
              type={'text'}
              id='fname'
              name='user_name'
              className='AskeIsADummy'
            ></input>
            <label htmlFor='lname'>Email</label>
            <input
              type={'text'}
              id='lname'
              name='user_email'
              className='AskeIsADummy'
            ></input>
            <label htmlFor='fname'>Message</label>
            <textarea
              className='AskeIsADummy'
              id='subject'
              name='message'
              style={{ height: '200px' }}
            ></textarea>
            <input
              className='AskeIsADummy'
              type='submit'
              value='Contact me'
            ></input>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
