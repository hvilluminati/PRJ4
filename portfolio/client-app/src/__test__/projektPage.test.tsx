jest.mock('../axioscalls');
import Projects from '../pages/projectsPage';
import { fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { getFiles } from '../axioscalls';
import { Dropdown } from 'react-bootstrap';

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

	await new Promise((r) => setTimeout(r, 1000));

	fireEvent.click(getByText('Dropdown button'));

	await new Promise((r) => setTimeout(r, 1000));

	expect(getByText('Sort by name')).toBeInTheDocument;
});

test('projects list', async () => {
	const screen = render(
		<BrowserRouter>
			<Projects />
		</BrowserRouter>
	);

	const projectsList = await waitFor(() => screen.findAllByTestId('Titel'));
	expect(projectsList).toHaveLength(4);
});

test('download button', async () => {
	const screen = render(
		<BrowserRouter>
			<Projects />
		</BrowserRouter>
	);

	const projectsList = await waitFor(() =>
		screen.findAllByTestId('Download')
	);
	expect(projectsList);
});
