import { ReactElement } from 'react'

type HeadingType = {
	title: string
}

const Heading = ({ title }: HeadingType): ReactElement => {
	return <h1>{title} </h1>
}

export default Heading
