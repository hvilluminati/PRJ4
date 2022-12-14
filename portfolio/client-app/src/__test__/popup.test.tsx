window.localStorage.setItem('jwt', 'Wrong key');
jest.mock('../axioscalls');
jest.mock('../pos', () => ({
	lang: [
		['1', 'react', '7', '3'],
		['2', 'SQL', '9', '14'],
	],
}));
import { AboutPopup, SkillsPopup, SkillPopup } from '../popup';
import { fireEvent, render } from '@testing-library/react';
import {
	putDescription,
	putTitle,
	getSkills,
	postSkill,
	deleteSkill,
	putSkill,
} from '../axioscalls';
import { lang } from '../pos';

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

describe('SkillPopup', () => {
	describe('Render with different parameters', () => {
		it('Should render correctly with no skill parameter', async () => {
			const { getByPlaceholderText, getByText, queryByText } = render(
				<SkillPopup />
			);

			expect(getByPlaceholderText('Skill name')).toBeInTheDocument;
			expect(getByPlaceholderText('Skill level')).toBeInTheDocument;
			expect(getByPlaceholderText('Experience')).toBeInTheDocument;
			expect(getByText('Add skill')).toBeInTheDocument;
			expect(queryByText('Delete skill')).toBeNull;
		});

		it('Should render correctly with mock skill', async () => {
			const { getByPlaceholderText, getByText } = render(
				<SkillPopup skill={['1', 'react', '7', '3']} />
			);

			expect(getByPlaceholderText('react')).toBeInTheDocument;
			expect(getByPlaceholderText('7')).toBeInTheDocument;
			expect(getByPlaceholderText('3')).toBeInTheDocument;
			expect(getByText('Change skill')).toBeInTheDocument;
			expect(getByText('Delete skill')).toBeInTheDocument;
		});
	});

	describe('Events', () => {
		describe('onChange event', () => {
			it('Should change placeholders on event trigger', async () => {
				const { getByPlaceholderText } = render(<SkillPopup />);

				fireEvent.change(getByPlaceholderText('Skill name'), {
					target: { value: 'new name' },
				});
				fireEvent.change(getByPlaceholderText('Skill level'), {
					target: { value: 'new level' },
				});
				fireEvent.change(getByPlaceholderText('Experience'), {
					target: { value: 'new experience' },
				});

				expect(getByPlaceholderText('new name')).toBeInTheDocument;
				expect(getByPlaceholderText('new level')).toBeInTheDocument;
				expect(getByPlaceholderText('new experience'))
					.toBeInTheDocument;
			});
		});

		describe('onClick event', () => {
			jest.spyOn(console, 'log').mockImplementationOnce(() => {});
			it('Should call the editSkill function', () => {
				const mockPutSkill = putSkill as jest.Mock;
				mockPutSkill.mockImplementation(() => {});
				const { getByText } = render(
					<SkillPopup skill={['1', 'react', '7', '3']} />
				);

				fireEvent.click(getByText('Change skill'));

				expect(mockPutSkill).toHaveBeenCalledTimes(1);
			});

			it('Should call the addSkill function', () => {
				const mockPostSkill = postSkill as jest.Mock;
				mockPostSkill.mockImplementation(() => {});
				const { getByText } = render(<SkillPopup />);

				fireEvent.click(getByText('Add skill'));

				expect(mockPostSkill).toHaveBeenCalledTimes(1);
			});

			it('Should call the delSkill function', () => {
				const mockDeleteSkill = deleteSkill as jest.Mock;
				mockDeleteSkill.mockImplementation(() => {});
				const { getByText } = render(
					<SkillPopup skill={['1', 'react', '7', '3']} />
				);

				fireEvent.click(getByText('Delete skill'));

				expect(mockDeleteSkill).toHaveBeenCalledTimes(1);
			});
		});
	});
});
