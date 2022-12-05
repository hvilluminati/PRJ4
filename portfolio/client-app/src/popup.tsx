import react, { useState, useEffect } from 'react';
import { putDescription, putTitle, putSkill } from './axioscalls';
import { lang } from './pos';
import Popup from 'reactjs-popup';

export const AboutPopup = ({
	sender,
	func,
}: {
	sender: string;
	func: Function;
}) => {
	const [text, setText] = useState(
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
	const [height, setHeight] = useState('1px');

	useEffect(() => {
		setHeight(lang.length * 35 + 'px');
	}, []);
	return (
		<div id='skillsWrapper' style={{ height: height }}>
			{lang.map((l, i) => (
				<Popup
					trigger={<button id={'skill'}>{l[1]}</button>}
					arrow={false}
					position={i % 2 === 0 ? 'left center' : 'right center'}
					key={i}>
					<SkillPopup skill={l} />
				</Popup>
			))}
		</div>
	);
};

const SkillPopup = ({ skill }: { skill: any }) => {
	const [skillName, setSkillName] = useState(skill[1]);
	const [skillLevel, setSkillLevel] = useState(skill[2]);
	const [monthsOfExperience, setMonthsOfExperience] = useState(skill[3]);

	function click() {
		putSkill({
			skillID: skill[0],
			skillName: skillName,
			skillLevel: skillLevel,
			monthsOfExperience: monthsOfExperience,
		});
	}

	return (
		<div id='skillWrapper'>
			<textarea
				id='skillAtt'
				placeholder={skillName}
				onChange={(event) => setSkillName(event.target.value)}
			/>
			<textarea
				id='skillAtt'
				placeholder={skillLevel}
				onChange={(event) => setSkillLevel(event.target.value)}
			/>
			<textarea
				id='skillAtt'
				placeholder={monthsOfExperience}
				onChange={(event) => setMonthsOfExperience(event.target.value)}
			/>
			<div id='skill-btn-wrapper'>
				<button onClick={click}>Change skill</button>
				<div className='border bottom' />
				<div className='border left' />
				<div className='border right' />
				<div className='border topright' />
				<div className='border topleft' />
			</div>
		</div>
	);
};
