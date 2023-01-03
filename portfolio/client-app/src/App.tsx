import { useEffect, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import useState from 'react-usestateref';
import './App.css';
import WebFont from 'webfontloader';
import Home from './pages/homePage';
import About from './pages/aboutPage';
import Skills from './pages/skillsPage';
import Login from './pages/loginPage';
import { posSetter } from './pos';
import Spinner from './pages/spinner';
import Projects from './pages/projectsPage';
import Upload from './pages/UploadprojectPage';
import Contact from './pages/contactPage';

declare const window: any;

function App() {
	// eslint-disable-next-line
	const [coords, setCoords, coordsRef] = useState<number[]>(() => [0, 0]);
	var gyro = null;

	useEffect(() => {
		var expire = window.localStorage.getItem('expire');
		if (expire && new Date().getTime().toString() > expire) {
			window.localStorage.removeItem('jwt');
			window.localStorage.removeItem('expire');
		}
		WebFont.load({
			google: {
				families: ['La Belle Aurore', 'Open Sans'],
			},
		});

		var coolHeight = document.documentElement.clientHeight + 'px';
		document.getElementById('root')!.style.height = coolHeight;

		posSetter();
		if (window.innerWidth > 640) {
			document.onmousemove = function (e) {
				posSetter(e);
			};
		} else {
			try {
				// eslint-disable-next-line
				gyro = new window.Gyroscope({ frequency: 60 });
				gyro.addEventListener('reading', (e: any) => {
					setCoords((p) => [p[0] + e.target.y, p[1] + e.target.x]);

					posSetter(coordsRef.current);
				});

				gyro.addEventListener('error', (e: any) => {
					console.error(`Gyroscope encounted error ${e}`);
				});

				gyro.start();
			} catch (error) {
				console.error(error);
			}
		}

		window.addEventListener('resize', () => {
			coolHeight = document.documentElement.clientHeight + 'px';
			document.getElementById('root')!.style.height = coolHeight;
			posSetter();
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Suspense fallback={<Spinner />}>
				<HashRouter>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/about' element={<About />} />
						<Route path='/skills' element={<Skills />} />
						<Route path='/login' element={<Login />} />
						<Route path='/spintest' element={<Spinner />} />
						<Route path='/projects' element={<Projects />} />
						<Route path='/UploadProject' element={<Upload />} />
						<Route path='/contact' element={<Contact />} />
					</Routes>
				</HashRouter>
			</Suspense>
			<div id='langs' data-testid='langs'></div>
		</>
	);
}

export default App;
