import Skills from '../pages/skillsPage';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { getSkills, code } from '../axioscalls';
import { lang } from '../pos';
import MockAdapter from 'axios-mock-adapter';
import axios, { AxiosResponse } from 'axios';

describe('Skills page tests', () => {
  const mockFakeSkills = [
    {
      skillID: 1,
      skillName: 'React',
      skillLevel: 7,
      monthsOfExperience: 3,
    },
    {
      skillID: 2,
      skillName: 'SQL',
      skillLevel: 9,
      monthsOfExperience: 14,
    },
  ];
  jest.mock('axios', () => {
    return {
      ...(jest.requireActual('axios') as object),
      create: jest.fn().mockReturnValue(jest.requireActual('axios')),
    };
  });
  const mock = new MockAdapter(axios);
  var pos = [
    [0.105, 0.135],
    [0.805, 0.826],
    [0.111, 0.731],
    [0.823, 0.169],
    [0.409, 0.135],
    [0.368, 0.657],
    [0.173, 0.467],
    [0.269, 0.851],
    [0.772, 0.537],
    [0.555, 0.784],
    [0.182, 0.206],
    [0.577, 0.537],
  ];
  it('Skills page is rendering correct elements', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Skills />
      </BrowserRouter>
    );
    //   expect(getByTestId('codeBoxTest')).toBeInTheDocument;
    //   expect(getByTestId('codeBoxFillTest')).toBeInTheDocument;
    //   expect(getByTestId('skillText1Test')).toBeInTheDocument;
    //   expect(getByTestId('skillText2Test')).toBeInTheDocument;
    //   expect(getByTestId('skillMonthsTest')).toBeInTheDocument;
    expect(getByTestId('skillsTitle')).toBeInTheDocument;
  });

  it('Code function is changing elements correct', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const screen = render(
      <>
        <BrowserRouter>
          <Skills />
        </BrowserRouter>
        <div id='langs' data-testid='langsTest'></div>
      </>
    );

    var result: string[][] = getSkills(pos);
    await new Promise((r) => setTimeout(r, 2000));
    const skillsLanguage = screen.getByTestId('langsTest').children[0];

    fireEvent.click(skillsLanguage);

    expect(consoleSpy).toHaveBeenCalledWith('Showing skills');
  });

  it('Skills renders without crashing', () => {
    render(
      <BrowserRouter>
        <Skills />
      </BrowserRouter>
    );
  });
});
