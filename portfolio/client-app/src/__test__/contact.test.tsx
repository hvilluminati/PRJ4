jest.spyOn(console, 'error').mockImplementation(() => {});
import Contact from '../pages/contactPage';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

it('renders placeholdertext correctly', () => {
  const { getByPlaceholderText } = render(
    <BrowserRouter>
      <Contact />
    </BrowserRouter>
  );

  expect(getByPlaceholderText('Your name')).toBeInTheDocument;
  expect(getByPlaceholderText('Your email')).toBeInTheDocument;
  expect(getByPlaceholderText('Your message')).toBeInTheDocument;
});

describe('href logos', () => {
  it('href logos navigate correct', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

    const emailLink = getByTestId('emailLink');
    const phoneLink = getByTestId('phoneLink');
    const skypeLink = getByTestId('skypeLink');
    const linkedinLink = getByTestId('linkedinLink');
    const fbLink = getByTestId('fbLink');
    const twitterLink = getByTestId('twitterLink');

    expect(emailLink).toHaveAttribute('href', 'mailto:JohnDoe@email.com');
    expect(phoneLink).toHaveAttribute('href', 'tel:+4588888888');
    expect(skypeLink).toHaveAttribute('href', 'https://www.skype.com/en/');
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/');
    expect(fbLink).toHaveAttribute('href', 'https://www.facebook.com/');
    expect(twitterLink).toHaveAttribute('href', 'https://www.twitter.com/');
  });
});

it('Send form', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  const screen = render(
    <BrowserRouter>
      <Contact />
    </BrowserRouter>
  );
  const submitBtn = screen.getByPlaceholderText('Contact me');

  fireEvent.submit(submitBtn);

  expect(consoleSpy).toHaveBeenCalledWith('Trying to send email');
});
