import About from '../pages/aboutPage';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

beforeEach(() => {
	jest.resetAllMocks();
});

describe('Test description and title text', () => {
	it('Should set description and title', async () => {
		jest.spyOn(console, 'error').mockImplementation(() => {});

		const { getByTestId } = render(
			<BrowserRouter>
				<About />
			</BrowserRouter>
		);

		await new Promise((r) => setTimeout(r, 2000));

		expect(getByTestId('title')).toBeInTheDocument;
		expect(getByTestId('description')).toBeInTheDocument;
		expect(getByTestId('title').innerHTML).not.toBe('');
		expect(getByTestId('description').innerHTML).not.toBe('');
	});
});

describe('Test description and title authorization', () => {
	it('Should not add description and title className to authorized', () => {
		jest.spyOn(console, 'error').mockImplementationOnce(() => {});
		window.localStorage.clear();

		const { getByTestId } = render(
			<BrowserRouter>
				<About />
			</BrowserRouter>
		);

		expect(getByTestId('aboutTitle')).toBeInTheDocument;
		expect(getByTestId('desc')).toBeInTheDocument;
		expect(getByTestId('aboutTitle').className).not.toBe('authorized');
		expect(getByTestId('desc').className).not.toBe('authorized');
	});

	it('Should set description and title className to authorized', () => {
		jest.spyOn(console, 'error').mockImplementationOnce(() => {});
		window.localStorage.setItem('jwt', 'aabbcc112233');

		const { getByTestId } = render(
			<BrowserRouter>
				<About />
			</BrowserRouter>
		);

		expect(getByTestId('aboutTitle')).toBeInTheDocument;
		expect(getByTestId('desc')).toBeInTheDocument;
		expect(getByTestId('aboutTitle').className).toBe('authorized');
		expect(getByTestId('desc').className).toBe('authorized');
	});
});

describe('Test jwt and expire keys', () => {
	it('Should remove jwt and expire keys', () => {
		window.localStorage.setItem('jwt', 'aabbcc112233');
		window.localStorage.setItem(
			'expire',
			(new Date().getTime() - 1000).toString()
		);
		const {} = render(
			<BrowserRouter>
				<About />
			</BrowserRouter>
		);

		expect(window.localStorage.getItem('jwt')).toBe(undefined);
		expect(window.localStorage.getItem('expire')).toBe(undefined);
	});

	it('Should not remove jwt and expire keys', () => {
		window.localStorage.setItem('jwt', 'aabbcc112233');
		window.localStorage.setItem(
			'expire',
			(new Date().getTime() + 1000).toString()
		);
		const {} = render(
			<BrowserRouter>
				<About />
			</BrowserRouter>
		);

		expect(window.localStorage.getItem('jwt')).not.toBe(undefined);
		expect(window.localStorage.getItem('expire')).not.toBe(undefined);
	});
});

describe('Test admin buttons state', () => {
	it('Should enable admin buttons', () => {
		window.localStorage.setItem('jwt', 'aabbcc112233');
		window.localStorage.setItem(
			'expire',
			(new Date().getTime() + 1000).toString()
		);
		const { getAllByTestId } = render(
			<BrowserRouter>
				<About />
			</BrowserRouter>
		);
		expect(getAllByTestId('butt')[0].closest('button')).not.toBeDisabled;
		expect(getAllByTestId('butt')[1].closest('button')).not.toBeDisabled;
	});

	it('Should not remove jwt and expire keys', () => {
		window.localStorage.clear();

		const { getAllByTestId } = render(
			<BrowserRouter>
				<About />
			</BrowserRouter>
		);

		expect(getAllByTestId('butt')[0].closest('button')).toBeDisabled;
		expect(getAllByTestId('butt')[1].closest('button')).toBeDisabled;
	});
});
