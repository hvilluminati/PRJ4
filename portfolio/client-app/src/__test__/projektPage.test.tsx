jest.mock('../axioscalls');
import Projects from '../pages/projectsPage';
import { fireEvent, screen } from '@testing-library/react';
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

test('projects list', async () => {
	const screen = render(
		<BrowserRouter>
			<Projects />
		</BrowserRouter>
	);

	expect(screen.findAllByText('Encrypted Project name')).toBeInTheDocument;
});

test('download button', async () => {
	const screen = render(
		<BrowserRouter>
			<Projects />
		</BrowserRouter>
	);

	expect(screen.findAllByTestId('Download'));
});
