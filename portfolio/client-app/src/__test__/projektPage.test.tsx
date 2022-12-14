jest.mock('../axioscalls');
jest.spyOn(console, 'error').mockImplementation(() => {});

import Projects from '../pages/projectsPage';
import { fireEvent, getByText, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { getFiles } from '../axioscalls';

const dummyProjects = [
	{
		id: '1',
		name: 'file1.jpg',
		fileType: 'jpg',
		language: 'js',
	},
	{
		id: '2',
		name: 'file1.jpg',
		fileType: 'jpg',
		language: 'js',
	},
	{
		id: '3',
		name: 'file1.jpg',
		fileType: 'jpg',
		language: 'js',
	},
	{
		id: '4',
		name: 'file1.jpg',
		fileType: 'jpg',
		language: 'js',
	},
];

const mockPutTitle = getFiles as jest.Mock;
mockPutTitle.mockResolvedValue(dummyProjects);

describe('Test upload authorization', () => {
	test('dropdown button on screen', async () => {
		const { getAllByText } = render(
			<BrowserRouter>
				<Projects />
			</BrowserRouter>
		);

		expect(getAllByText('Dropdown button')).toBeInTheDocument;
		expect(getAllByText('Dropdown button')).toHaveLength(1);
	});

	test('dropdown button click simulation', async () => {
		const { getByText } = render(
			<BrowserRouter>
				<Projects />
			</BrowserRouter>
		);

		fireEvent.click(getByText('Dropdown button'));

		expect(getByText('Sort By Name')).toBeInTheDocument;
		expect(getByText('Sort By Date')).toBeInTheDocument;
		expect(getByText('Find all C# Projects')).toBeInTheDocument;
	});

	test('sort by name button', async () => {
		//mockedAxios.get.mockResolvedValue(dummyProjects);
		jest.spyOn(console, 'error').mockImplementation(() => {});
		const screen = render(
			<BrowserRouter>
				<Projects />
			</BrowserRouter>
		);

		const sortByNameBtn = await waitFor(() =>
			screen.findAllByTestId('sort-name-btn')
		);
		expect(sortByNameBtn).toBe(1);
	});

	test('sort by name button click event simulation {Sortby} will get triggered', async () => {
		//mockedAxios.get.mockResolvedValue(dummyProjects);
		jest.spyOn(console, 'error').mockImplementation(() => {});
		const screen = render(
			<BrowserRouter>
				<Projects />
			</BrowserRouter>
		);

		const sortByNamebtn = await waitFor(() =>
			screen.findAllByTestId('sort-name-btn')
		);
		fireEvent.click(sortByNamebtn[0]);
		expect(sortByNamebtn).toBe(1);
	});

	test('sort by date button', async () => {
		//mockedAxios.get.mockResolvedValue(dummyProjects);
		jest.spyOn(console, 'error').mockImplementation(() => {});
		const screen = render(
			<BrowserRouter>
				<Projects />
			</BrowserRouter>
		);

		const projectsList = await waitFor(() =>
			screen.findAllByTestId('sort-date-btn')
		);
		expect(projectsList);
	});

	test('sort by date button, click event simulation {Sortby} will get triggered', async () => {
		//mockedAxios.get.mockResolvedValue(dummyProjects);
		jest.spyOn(console, 'error').mockImplementation(() => {});
		const screen = render(
			<BrowserRouter>
				<Projects />
			</BrowserRouter>
		);

		const sortByDateBtn = await waitFor(() =>
			screen.findAllByTestId('sort-date-btn')
		);
		fireEvent.click(sortByDateBtn[0]);

		expect(sortByDateBtn);
	});

	test('find button', async () => {
		//mockedAxios.get.mockResolvedValue(dummyProjects);
		jest.spyOn(console, 'error').mockImplementation(() => {});
		const screen = render(
			<BrowserRouter>
				<Projects />
			</BrowserRouter>
		);

		const projectsList = await waitFor(() =>
			screen.findAllByTestId('find-btn')
		);
		expect(projectsList);
	});

	test('find button, click button simluation {FindLanguage} will get triggered', async () => {
		//mockedAxios.get.mockResolvedValue(dummyProjects);
		jest.spyOn(console, 'error').mockImplementation(() => {});
		const screen = render(
			<BrowserRouter>
				<Projects />
			</BrowserRouter>
		);

		const projectsList = await waitFor(() =>
			screen.findAllByTestId('find-btn')
		);
		expect(projectsList);
	});
});

test('projects list', async () => {
	const screen = render(
		<BrowserRouter>
			<Projects />
		</BrowserRouter>
	);

	expect(screen.findAllByText('Encrypted Project name')).toBeInTheDocument;
});

///////Function////////////

describe('Test table', () => {
	it('Should set id, name, fileType and language', async () => {
		const { getAllByText } = render(
			<BrowserRouter>
				<Projects />
			</BrowserRouter>
		);
		await new Promise((r) => setTimeout(r, 2000));

		expect(getAllByText('Download')).toHaveLength(4);
	});
});

describe('Test upload authorization', () => {
	it('Should not add upload className to authorized', async () => {
		jest.spyOn(console, 'error').mockImplementationOnce(() => {});
		window.localStorage.clear();

		const { getByTestId } = render(
			<BrowserRouter>
				<Projects />
			</BrowserRouter>
		);

		await new Promise((r) => setTimeout(r, 2000));

		expect(getByTestId('upload')).toBeInTheDocument;
		expect(getByTestId('upload').className).not.toBe('authorized');
	});

	it('Should set upload className to authorized', async () => {
		jest.spyOn(console, 'error').mockImplementationOnce(() => {});
		window.localStorage.setItem('jwt', 'upload');

		const { getByTestId } = render(
			<BrowserRouter>
				<Projects />
			</BrowserRouter>
		);

		await new Promise((r) => setTimeout(r, 2000));

		expect(getByTestId('upload')).toBeInTheDocument;
		expect(getByTestId('upload').className).toBe('authorized');
	});
});
