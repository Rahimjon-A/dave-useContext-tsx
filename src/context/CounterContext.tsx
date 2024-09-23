import {
	ChangeEvent,
	createContext,
	ReactElement,
	useCallback,
	useContext,
	useReducer,
} from 'react'

type stateType = {
	counter: number
	text: string
	color: string
	fontSize: string
}

export const initState: stateType = {
	counter: 0,
	text: '',
	color: 'black',
	fontSize: '18',
}

const enum REDUCER_ACTION_TYPES {
	INCREMENT,
	DECREMENT,
	NEW_INPUT,
	COLOR,
	FONTSIZE,
}

type ReducerAction = {
	type: REDUCER_ACTION_TYPES
	payload?: string
}

const reducer = (state: stateType, action: ReducerAction): stateType => {
	switch (action.type) {
		case REDUCER_ACTION_TYPES.INCREMENT:
			return { ...state, counter: state.counter + 1 }
		case REDUCER_ACTION_TYPES.DECREMENT:
			return { ...state, counter: state.counter - 1 }
		case REDUCER_ACTION_TYPES.NEW_INPUT:
			return { ...state, text: action.payload ?? '' }
		case REDUCER_ACTION_TYPES.COLOR:
			return { ...state, color: action.payload ?? 'black' }
		case REDUCER_ACTION_TYPES.FONTSIZE:
			return { ...state, fontSize: action.payload ?? '18' }
		default:
			throw new Error()
	}
}

const useCounterContext = (initState: stateType) => {
	const [state, dispatch] = useReducer(reducer, initState)

	const increment = useCallback(
		() => dispatch({ type: REDUCER_ACTION_TYPES.INCREMENT }),
		[]
	)
	const decrement = useCallback(
		() => dispatch({ type: REDUCER_ACTION_TYPES.DECREMENT }),
		[]
	)

	const inputVal = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: REDUCER_ACTION_TYPES.NEW_INPUT, payload: e.target.value })
	}, [])

	const fontsize = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: REDUCER_ACTION_TYPES.FONTSIZE, payload: e.target.value })
	}, [])

	const changeColor = useCallback((color: string) => {
		dispatch({ type: REDUCER_ACTION_TYPES.COLOR, payload: color })
	}, [])

	return { state, increment, decrement, fontsize, changeColor, inputVal }
}

type UseCounterContextType = ReturnType<typeof useCounterContext>

const initContextState: UseCounterContextType = {
	state: initState,
	increment: () => {},
	decrement: () => {},
	inputVal: (e: ChangeEvent<HTMLInputElement>) => {},
	fontsize: (e: ChangeEvent<HTMLInputElement>) => {},
	changeColor: (color: string) => {},
}

export const CounterContext =
	createContext<UseCounterContextType>(initContextState)

type ChildrenType = {
	children: ReactElement
}

export const CounterProvider = ({
	children,
	...initState
}: ChildrenType & stateType): ReactElement => {
	return (
		<CounterContext.Provider value={useCounterContext(initState)}>
			{children}
		</CounterContext.Provider>
	)
}

type useCounterHookType = {
	counter: number
	increment: () => void
	decrement: () => void
}

export const useCounter = (): useCounterHookType => {
	const {
		state: { counter },
		increment,
		decrement,
	} = useContext(CounterContext)

	return { counter, increment, decrement }
}

type useTextHookType = {
	text: string
	inputVal: (e: ChangeEvent<HTMLInputElement>) => void
}

export const useText = (): useTextHookType => {
	const {
		state: { text },
		inputVal,
	} = useContext(CounterContext)

	return { text, inputVal }
}

type useStypeHookType = {
	color: string
	changeColor: (color: string) => void
}

export const useStyle = (): useStyleHookType => {
	const {
		state: { color },
		changeColor,
	} = useContext(CounterContext)

	return { color, changeColor }
}

type useFontHookType = {
	fontSize: string
	fontsize: (e: ChangeEvent<HTMLInputElement>) => void
}

export const useFont = (): useFontHookType => {
	const {
		state: { fontSize },
		fontsize,
	} = useContext(CounterContext)

	return { fontSize, fontsize }
}
