import { Link } from 'react-router-dom';
import ButtonMailto from '../mailTo';
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

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
  };
  console.log(form.current);
  return (
    <>
      <div id='hej'>
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
              <div id='contactTextTitle'>
                <p id='emailTitle'>Email</p>
                <p id='phoneTitle'>Phone</p>
                <p id='skypeTitle'>Skype</p>
                <p id='linkedinTitle'>Linkedin</p>
                <p id='facebookTitle'>Facebook</p>
                <p id='twitterTitle'>Twitter</p>
              </div>
              <div id='email'>
                {' '}
                <ButtonMailto
                  mailto='JohnDoe@email.com'
                  label='JohnDoe@email.com'
                />
              </div>
              <div id='phone'>
                <a href='tel:+4588888888'> +45 88888888 </a>
              </div>
              <div id='skype'>
                <a href='https://www.skype.com/en/'>Call me</a>
              </div>
              <div id='linkedin'>
                {' '}
                <a href='https://www.linkedin.com/'>More information</a>
              </div>
              <div id='facebook'>
                {' '}
                <a href='https://www.facebook.com/'>Facebook</a>
              </div>
              <div id='twitter'>
                {' '}
                <a href='https://www.twitter.com/'>Follow me</a>
              </div>
            </div>
          </div>
        </div>
        <div className='contactContainer'>
          <form ref={form} onSubmit={sendEmail}>
            <label htmlFor='fname'>First Name</label>
            <input type={'text'} id='fname' name='user_name'></input>
            <label htmlFor='lname'>Email</label>
            <input type={'text'} id='lname' name='user_email'></input>
            <label htmlFor='fname'>Message</label>
            <textarea
              id='subject'
              name='message'
              style={{ height: '200px' }}
            ></textarea>
            <input type='submit' value='Send'></input>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
