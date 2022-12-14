jest.mock('../axioscalls');
jest.spyOn(console, 'error').mockImplementation(() => {});

import Projects from '../pages/projectsPage';
import { fireEvent, getByText, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { getFiles, getFilesSort } from '../axioscalls';

const dummyProjects = [
	{
		id: '1',
		name: 'file4.jpg',
		fileType: 'jpg',
		language: 'C#',
	},
	{
		id: '2',
		name: 'file3.jpg',
		fileType: 'jpg',
		language: 'js',
	},
	{
		id: '3',
		name: 'file2.jpg',
		fileType: 'jpg',
		language: 'C#',
	},
	{
		id: '4',
		name: 'file1.jpg',
		fileType: 'jpg',
		language: 'js',
	},
];

const mockSortedProjects = [
	{
		id: '4',
		name: 'file1.jpg',
		fileType: 'jpg',
		language: 'js',
	},
	{
		id: '3',
		name: 'file2.jpg',
		fileType: 'jpg',
		language: 'js',
	},
	{
		id: '2',
		name: 'file3.jpg',
		fileType: 'jpg',
		language: 'js',
	},
	{
		id: '1',
		name: 'file4.jpg',
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

	test('sort by name button click event simulation {Sortby} will get triggered', async () => {
		const mockGetFilesSort = getFilesSort as jest.Mock;
		mockGetFilesSort.mockResolvedValue(mockSortedProjects);

		const screen = render(
			<BrowserRouter>
				<Projects />
			</BrowserRouter>
		);

		await new Promise((r) => setTimeout(r, 100));

		fireEvent.click(screen.getByText('Dropdown button'));
		fireEvent.click(screen.getByText('Sort By Name'));

		await new Promise((r) => setTimeout(r, 100));

		var firstChild = screen.getByTestId('hejs').children[1].children[0];

		expect(mockGetFilesSort).toHaveBeenCalledTimes(1);
		expect(firstChild.innerHTML).toBe('file1.jpg');
	});

	test('find button, click button simluation {FindLanguage} will get triggered', async () => {
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
		// expect(getByTestId('upload').className).not.toBe('authorized');
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
