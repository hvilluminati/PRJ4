window.localStorage.setItem('jwt', 'Wrong key');
jest.mock('../axioscalls');
jest.mock('../pos', () => ({
	lang: [
		['1', 'react', '7', '3'],
		['2', 'SQL', '9', '14'],
	],
}));
import { AboutPopup, SkillsPopup } from '../popup';
import { fireEvent, render } from '@testing-library/react';
import {
	putDescription,
	putTitle,
	putSkill,
	deleteSkill,
	postSkill,
	getSkills,
} from '../axioscalls';
import { lang } from '../pos';
import Skills from '../pages/skillsPage';
import { BrowserRouter } from 'react-router-dom';

describe('AboutPopup', () => {
	describe('Test that AboutPopup renders correct textare, button and wrapper class', () => {
		const mockGetElementById = jest.fn();
		mockGetElementById.mockImplementation((id) => {
			if (id === 'aboutTitleText') {
				return {
					innerHTML: 'testTitle',
				};
			} else if (id === 't') {
				return {
					innerHTML: 'testDesc',
				};
			}
		});
		document.getElementById = mockGetElementById;
		it('Should set textare, button and wrapper class to title', () => {
			const { getByPlaceholderText, getByText } = render(
				<AboutPopup
					sender='title'
					func={() => {
						console.log('From title');
					}}
				/>
			);

			expect(getByPlaceholderText('Insert title')).toBeInTheDocument;
			expect(getByText('Set new title')).toBeInTheDocument;
			expect(
				getByPlaceholderText('Insert title').parentElement?.className
			).toBe('titleWrapper');
		});

		it('Should set textare, button and wrapper class to description', () => {
			const { getByPlaceholderText, getByText } = render(
				<AboutPopup
					sender='description'
					func={() => {
						console.log('From description');
					}}
				/>
			);

			expect(getByPlaceholderText('Insert description'))
				.toBeInTheDocument;
			expect(getByText('Set new description')).toBeInTheDocument;
			expect(
				getByPlaceholderText('Insert description').parentElement
					?.className
			).toBe('descriptionWrapper');
		});
	});

	describe('Test calls the correct axios function depending on sender', () => {
		const mockGetElementById = jest.fn();
		mockGetElementById.mockImplementation((id) => {
			if (id === 'aboutTitleText') {
				return {
					innerHTML: 'testTitle',
				};
			} else if (id === 't') {
				return {
					innerHTML: 'testDesc',
				};
			}
		});
		document.getElementById = mockGetElementById;

		const mockPutTitle = putTitle as jest.Mock;
		mockPutTitle.mockImplementation(() => {});

		const mockPutDescription = putDescription as jest.Mock;
		mockPutDescription.mockImplementation(() => {});

		const mockFn = jest.fn().mockImplementation(() => {});

		beforeEach(() => {
			jest.clearAllMocks();
		});
		it('Should call putTitle', async () => {
			const { getByText } = render(
				<AboutPopup sender='title' func={mockFn} />
			);

			fireEvent.click(getByText('Set new title'));

			expect(mockPutTitle).toBeCalledTimes(1);
			expect(mockPutTitle).toHaveBeenCalledWith('testTitle');
			expect(mockFn).toBeCalledTimes(1);
			expect(mockPutDescription).toBeCalledTimes(0);
		});

		it('Should call putDescription', async () => {
			const { getByText } = render(
				<AboutPopup sender='description' func={mockFn} />
			);

			fireEvent.click(getByText('Set new description'));

			expect(mockPutDescription).toBeCalledTimes(1);
			expect(mockPutDescription).toHaveBeenCalledWith('testDesc');
			expect(mockFn).toBeCalledTimes(1);
			expect(mockPutTitle).toBeCalledTimes(0);
		});
	});
});

describe('SkillsPopup', () => {
	const mockGetSkills = getSkills as jest.Mock;
	mockGetSkills.mockImplementation(() => {
		return [
			['1', 'react', '7', '3'],
			['2', 'SQL', '9', '14'],
		];
	});
	it('Should render correctly based on children', () => {
		const { getByTestId } = render(<SkillsPopup />);

		expect(getByTestId('wrap').children.length).toBe(3); // Because an extra div for SkillPopup button will always be there
		expect(window.getComputedStyle(getByTestId('wrap')).height).toEqual(
			'120px' // lang.length * 40 + 40
		);
	});
});
