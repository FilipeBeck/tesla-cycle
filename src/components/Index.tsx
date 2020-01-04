import React, { useState } from 'react'
import { Header } from './Header'
import './Index.scss'
import { Paint } from './Paint'

export const Index: React.FunctionComponent = props => {
	const [headerFields, setHeaderFields] = useState<Header.Fields>({ base: '10', multiplier: '2' })

	return <div className={Index.displayName}>
		<Header
			fields={headerFields}
			onChange={setHeaderFields}
			onDownload={() => alert('onDownload')}
		/>
		<Paint fields={headerFields}/>
	</div>
}

Index.displayName = 'Index'