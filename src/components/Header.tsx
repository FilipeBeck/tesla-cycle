import 'vanilla-x/Object'
import React, { useCallback } from 'react'
import './Header.scss'

const downloadIcon = require('./assets/download-icon.svg')

export const Header: React.FunctionComponent<Header.Props> = props => {
	const handleChange = useCallback(function <T extends keyof Header.Fields>(key: T, value: Header.Fields[T]) {
		props.onChange(props.fields.xClone().xMutate(key as any, value))
	}, [props.fields, props.onChange])

	return <div className={Header.displayName}>
		<h1>Tesla Cycle</h1>
		<form>
			<div className="fields">
				<div className="base">
					<span>Base</span>
					<input type="number" minLength={2} maxLength={31} value={props.fields.base} onChange={event => handleChange('base', event.target.value)} />
				</div>
				<div className="multiplier">
					<span>Multiplicador</span>
					<input type="number" minLength={2} value={props.fields.multiplier} onChange={event => handleChange('multiplier', event.target.value)} />
				</div>
			</div>
			<button type="button" onClick={props.onDownload}>
				<img src={downloadIcon} alt="" />
			</button>
		</form>
	</div>
}
export declare namespace Header {
	export interface Props {
		fields: Fields
		onChange(fields: Fields): void
		onDownload(): void
	}

	export interface Fields {
		base: string
		multiplier: string
	}
}

Header.displayName = 'Header'