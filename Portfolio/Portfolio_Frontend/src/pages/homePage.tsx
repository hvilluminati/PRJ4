import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<>
			<div id='home-wrapper'>
				<h1 id='welcome' data-testid='hej'>
					Welcome
				</h1>
				<div id='btns'>
					<div id='btn-wrapper'>
						<Link to='skills'>
							<button className='btn' id='skillsBtn'>
								Skills
							</button>
						</Link>
						<div className='border bottom' data-testid='border' />
						<div className='border left' />
						<div className='border right' />
						<div className='border topright' />
						<div className='border topleft' />
					</div>
					<div id='btn-wrapper'>
						<Link to='about'>
							<button className='btn' id='aboutBtn'>
								About me
							</button>
						</Link>
						<div className='border bottom'></div>
						<div className='border left'></div>
						<div className='border right'></div>
						<div className='border topright'></div>
						<div className='border topleft'></div>
					</div>
					<div id='btn-wrapper'>
						<Link to='Projects'>
							<button className='btn' id='ProjectsBtn'>
								Projects
							</button>
						</Link>
						<div className='border bottom'></div>
						<div className='border left'></div>
						<div className='border right'></div>
						<div className='border topright'></div>
						<div className='border topleft'></div>
					</div>
					<div id='btn-wrapper'>
						<Link to='contact'>
							<button className='btn' id='ContactBtn'>
								Contact
							</button>
						</Link>
						<div className='border bottom'></div>
						<div className='border left'></div>
						<div className='border right'></div>
						<div className='border topright'></div>
						<div className='border topleft'></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
