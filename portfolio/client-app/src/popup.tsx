import react from 'react';
import { putDescription, putTitle } from './axioscalls';
import { lang } from './pos';
import Popup from 'reactjs-popup';

export const AboutPopup = ({
	sender,
	func,
}: {
	sender: string;
	func: Function;
}) => {
	const [text, setText] = react.useState(
		document.getElementById(sender === 'title' ? 'aboutTitleText' : 't')!
			.innerHTML
	);

	function click() {
		if (sender === 'title') putTitle(text);
		else putDescription(text);

		func(text);
	}

	return (
		<div id='popupWrapper' className={sender + 'Wrapper'}>
			<textarea
				id={sender + 'Text'}
				onChange={(event) => setText(event.target.value)}
				placeholder={'Insert ' + sender}
			/>
			<div id='about-btn-wrapper'>
				<button onClick={click}>Set new {sender}</button>
				<div className='border bottom' />
				<div className='border left' />
				<div className='border right' />
				<div className='border topright' />
				<div className='border topleft' />
			</div>
		</div>
	);
};

export const SkillsPopup = () => {
	const [height, setHeight] = react.useState('1px');

	react.useEffect(() => {
		setHeight(lang.length * 35 + 'px');
	}, []);
	return (
		<div id='skillsWrapper' style={{ height: height }}>
			{lang.map((l, i) => (
				<Popup
					trigger={<button id={'skill'}>{l[1]}</button>}
					arrow={false}
					position={i % 2 === 0 ? 'left center' : 'right center'}>
					<SkillPopup skill={l} />
				</Popup>
			))}
		</div>
	);
};

const SkillPopup = ({ skill }: { skill: any }) => {
	return (
		<div id='skillWrapper'>
			<textarea value={skill[1]} />
			<textarea value={skill[2]} />
			<textarea value={skill[3]} />
		</div>
	);
};
