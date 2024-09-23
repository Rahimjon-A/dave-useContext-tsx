import Counter from './components/Counter'
import Heading from './components/Heading'
import List from './components/List'
import { CounterProvider, initState } from './context/CounterContext'

const App = () => {
	return (
		<>
			<Heading title='Hi Mom' />
			<List
				items={['coffee', 'code', 'happay']}
				render={(item: string) => <span className='bold'> {item} </span>}
			/>
			<CounterProvider
				counter={initState.counter}
				text={initState.text}
				color={initState.color}
				fontSize={initState.fontSize}
			>
				<Counter>{(num: number) => <>Current Count: {num}</>}</Counter>
			</CounterProvider>
		</>
	)
}

export default App
