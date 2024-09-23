import { ReactNode } from 'react'

interface ListProp<T> {
	items: T[]
	render: (item: T) => ReactNode
}

const List = <T,>({ items, render }: ListProp<T>) => {
	return (
		<div>
			<ul>
				{items.map((item, i) => (
					<li key={i}> {render(item)} </li>
				))}
			</ul>
		</div>
	)
}

export default List
