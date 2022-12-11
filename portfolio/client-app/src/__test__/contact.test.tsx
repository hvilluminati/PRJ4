import React from 'react';
import renderer from 'react-test-renderer';
import Contact from '../pages/contactPage';
import { fireEvent, render, screen } from '@testing-library/react';
import { JSDOM } from 'jsdom';

const dom = new JSDOM();
global.document = dom.window.document;

it('renders placeholdertext correctly'),
  () => {
    const { getByPlaceholderText } = render(<Contact />);

    expect(getByPlaceholderText('Your name')).toBeInTheDocument;
    expect(getByPlaceholderText('Your email')).toBeInTheDocument;
    expect(getByPlaceholderText('Your message')).toBeInTheDocument;
  };

// describe('href logos', () => {
//   it('href logos navigate correct', () => {
//     const { getByText, getByTitle } = render(<Contact />);

// const emailLink = screen.getByTitle('emailLink');
// const phoneLink = screen.getByTitle('phoneLink').closest('a');
// const skypeLink = screen.getByTitle('skypeLink').closest('a');
// const linkedinLink = screen.getByTitle('linkedinLink').closest('a');
// const fbLink = screen.getByTitle('fbLink').closest('a');
// const twitterLink = screen.getByTitle('twitterLink').closest('a');

// const emailLogo = getByAltText(/email logo/i);

// fireEvent.click(emailLink);
// fireEvent.click(phoneLink);
// fireEvent.click(skypeLink);
// fireEvent.click(linkedinLink);
// fireEvent.click(fbLink);
// fireEvent.click(twitterLink);

// expect(emailLink).toHaveAttribute('href', 'mailto:JohnDoe@email.com');
// expect(phoneLink).toHaveAttribute('href', 'tel:+4588888888');
// expect(skypeLink).toHaveAttribute('href', 'https://www.skype.com/en/');
// expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/');
// expect(fbLink).toHaveAttribute('href', 'https://www.facebook.com/');
// expect(twitterLink).toHaveAttribute('href', 'https://www.twitter.com/');
//   });
// });
