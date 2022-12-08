import { Link } from 'react-router-dom';
import ButtonMailto from '../mailTo';

function Contact() {
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
            <div id='contactText1'>
              I'm here to answer any question you may have, reach out to me and
              I will respond as soon as I can.
            </div>
            <div id='contactText2'>
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
          <form action='action_page.php'>
            <label htmlFor='fname'>First Name</label>
            <input
              type={'text'}
              id='fname'
              name='firstname'
              placeholder='Your name'
            ></input>

            <label htmlFor='lname'>Last Name</label>
            <input
              type={'text'}
              id='lname'
              name='lastname'
              placeholder='Your last name'
            ></input>

            <label htmlFor='fname'>First Name</label>
            <textarea
              id='subject'
              name='subject'
              placeholder='Write something'
              style={{ height: '200px' }}
            ></textarea>
            <input type='submit' value='Submit'></input>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
