jest.spyOn(console, 'error').mockImplementation(() => {});
import App from '../App';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

beforeEach(() => {
	jest.resetAllMocks();
});

Object.defineProperty(document.documentElement, 'clientHeight', {
	writable: true,
	configurable: true,
	value: 1080,
});
Object.defineProperty(window, 'innerWidth', {
	writable: true,
	configurable: true,
	value: 1920,
});
Object.defineProperty(window, 'innerHeight', {
	value: 1080,
});

describe('Test jwt and expire keys', () => {
	it('Should remove jwt and expire keys', () => {
		window.localStorage.setItem('jwt', 'aabbcc112233');
		window.localStorage.setItem(
			'expire',
			(new Date().getTime() - 1000).toString()
		);
		const {} = render(
			<div id='root' data-testid='root'>
				<App />
			</div>
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
			<div id='root'>
				<App />
			</div>
		);

		expect(window.localStorage.getItem('jwt')).not.toBe(undefined);
		expect(window.localStorage.getItem('expire')).not.toBe(undefined);
	});
});

describe('Test root height set', () => {
	it('Should change root height to 150px', () => {
		const { getByTestId } = render(
			<div id='root' data-testid='root'>
				<App />
			</div>
		);

		expect(getByTestId('root').style.height).toBe('1080px');
	});
});

describe('Test posSetter function', () => {
	it('Should set new margins on mouse move', async () => {
		const { getByTestId } = render(
			<div id='root' data-testid='root'>
				<App />
			</div>
		);

		await new Promise((r) => setTimeout(r, 2000));

		fireEvent.mouseMove(document, { clientX: 0, clientY: 0 });

		const startStyles = window.getComputedStyle(
			getByTestId('langs').children[0]
		);
		const startMarginLeft = startStyles.marginLeft;
		const startMarginTop = startStyles.marginTop;

		fireEvent.mouseMove(document, { clientX: 100, clientY: 100 });

		const endStyles = window.getComputedStyle(
			getByTestId('langs').children[0]
		);
		const endMarginLeft = endStyles.marginLeft;
		const endMarginTop = endStyles.marginTop;

		expect(startMarginLeft).not.toEqual(endMarginLeft);
		expect(startMarginTop).not.toEqual(endMarginTop);
	});
});

describe('Test resize event', () => {
	it('Should set new root height', async () => {
		const { getByTestId } = render(
			<div id='root' data-testid='root'>
				<App />
			</div>
		);

		await new Promise((r) => setTimeout(r, 1000));

		Object.defineProperty(document.documentElement, 'clientHeight', {
			value: 600,
		});

		fireEvent.resize(window);

		expect(getByTestId('root').style.height).toBe('600px');
	});

	it('Should change position of lang children', async () => {
		const { getByTestId } = render(
			<div id='root' data-testid='root'>
				<App />
			</div>
		);

		await new Promise((r) => setTimeout(r, 2000));

		fireEvent.resize(window);

		Object.defineProperty(document.documentElement, 'clientHeight', {
			value: 600,
		});
		Object.defineProperty(window, 'innerWidth', {
			value: 1520,
		});

		const startStyles = window.getComputedStyle(
			getByTestId('langs').children[0]
		);
		const startMarginLeft = startStyles.marginLeft;
		const startMarginTop = startStyles.marginTop;

		fireEvent.resize(window);

		const endStyles = window.getComputedStyle(
			getByTestId('langs').children[0]
		);
		const endMarginLeft = endStyles.marginLeft;
		const endMarginTop = endStyles.marginTop;

		expect(startMarginLeft).not.toEqual(endMarginLeft);
		expect(startMarginTop).not.toEqual(endMarginTop);
	});
});
