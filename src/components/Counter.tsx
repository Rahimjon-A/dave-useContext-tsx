import { ReactNode } from 'react'
import {
	useCounter,
	useFont,
	useStyle,
	useText,
} from '../context/CounterContext'

type ChildrenType = {
	children: (num: number) => ReactNode
}

const Counter = ({ children }: ChildrenType) => {
	const { counter, increment, decrement } = useCounter()
	const { text, inputVal } = useText()
	const { color, changeColor } = useStyle()
	const { fontSize, fontsize } = useFont()

	return (
		<>
			<input onChange={inputVal} type='text' />
			<input onChange={fontsize} type='number' />
			<p style={{ color: color, fontSize: `${fontSize}px` }}>
				my name is {text}
			</p>
			<p> {children(counter)} </p>
			<button onClick={increment}>+</button>
			<button onClick={decrement}>-</button>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '2rem',
					marginTop: '2rem',
				}}
			>
				<span
					onClick={() => changeColor('black')}
					style={{
						width: '20px',
						height: '20px',
						borderRadius: '50%',
						backgroundColor: 'black',
					}}
				></span>
				<span
					onClick={() => changeColor('red')}
					style={{
						width: '20px',
						height: '20px',
						borderRadius: '50%',
						backgroundColor: 'red',
					}}
				></span>
				<span
					onClick={() => changeColor('green')}
					style={{
						width: '20px',
						height: '20px',
						borderRadius: '50%',
						backgroundColor: 'green',
					}}
				></span>
				<span
					onClick={() => changeColor('yellow')}
					style={{
						width: '20px',
						height: '20px',
						borderRadius: '50%',
						backgroundColor: 'yellow',
					}}
				></span>
				<span
					onClick={() => changeColor('blue')}
					style={{
						display: 'block',
						width: '20px',
						height: '20px',
						borderRadius: '50%',
						backgroundColor: 'blue',
					}}
				></span>
			</div>
		</>
	)
}

export default Counter
