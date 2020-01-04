import React, { useRef, useLayoutEffect, useEffect, useCallback } from 'react'
import { Header } from './Header'
import './Paint.scss'

export const Paint: React.FC<Paint.Props> = props => {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	const getCycle = useCallback((base: number, multiplier: number) => {
		if (base <= 1 || base > 31 || multiplier <= 1) {
			return []
		}

		const output = [1]
		let product = multiplier

		while (1) {
			let reduced = product

			while (reduced >= base) {
				const digits = reduced.toString(base).split('').map(d => parseInt(d, base))
				reduced = digits.reduce((px, cx) => px + cx, 0)
			}

			output.push(reduced)

			const mid = output.length / 2;
			const v1 = output.slice(0, mid)
			const v2 = output.slice(mid)

			if (v1.every((item, index) => item == v2[index]))
				break

			product *= multiplier

			if (product == Infinity) {
				console.error('Não me perguntes onde fica o Alegrete...')
				return []
			}
		}

		return output.slice(0, output.length / 2)
	}, [])

	const handleResize = useCallback(() => {
		const canvas = canvasRef.current

		if (canvas) {
			canvas.width = canvas.offsetWidth
			canvas.height = canvas.offsetHeight
		}

		handlePaint()
	}, [canvasRef.current, props.fields])

	const handlePaint = useCallback(() => {
		const canvas = canvasRef.current

		if (canvas) {
			const context = canvas.getContext('2d')!
			const { width, height } = canvas
			const midWidth = width / 2
			const midHeight = height / 2
			const minSize = Math.min(midWidth, midHeight) - 5
			const base = parseInt(props.fields.base)
			const multiplier = parseInt(props.fields.multiplier)
			const count = base - 1

			context.clearRect(0, 0, width, height)
			context.translate(midWidth, midHeight)
			context.rotate(-Math.PI / 2)

			context.beginPath()
			context.strokeStyle = 'rgba(100,125,140, 0.5)'
			context.lineWidth = 5
			context.ellipse(0, 0, minSize, minSize, 0, 0, Math.PI * 2)
			context.closePath()
			context.stroke()

			context.beginPath()
			context.strokeStyle = 'rgba(0,0,0, 0.1)'
			context.lineWidth = 1

			for (let i = 0; i < count; i++) {
				const angle = Math.PI * 2 / count * i
				context.moveTo(0, 0)
				context.lineTo(Math.cos(angle) * minSize, Math.sin(angle) * minSize)
			}

			context.moveTo(0, 0)
			context.closePath()
			context.stroke()

			const cycle = getCycle(base, multiplier)
			
			if (cycle.length >= 2) {
				const firstValue = cycle.shift()!
				const firstAngle = Math.PI * 2 / count * firstValue

				context.beginPath()
				context.strokeStyle = 'rgb(0,150,140)'
				context.fillStyle = 'rgba(0,150,140, 0.33)'
				context.moveTo(Math.cos(firstAngle) * minSize, Math.sin(firstAngle) * minSize)

				for (const value of getCycle(base, multiplier)) {
					const angle = Math.PI * 2 / count * value
					context.lineTo(Math.cos(angle) * minSize, Math.sin(angle) * minSize)
				}

				context.closePath()
				context.stroke()
				context.fill('evenodd')
			}

			context.setTransform(1, 0, 0, 1, 0, 0)
		}
	}, [canvasRef.current, props.fields])

	useEffect(() => {
		handlePaint()
	}, [handlePaint])

	useLayoutEffect(() => {
		handleResize()
	}, [handleResize])

	useLayoutEffect(() => {
		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, [handleResize])

	return <div className={Paint.displayName}>
		<canvas ref={canvasRef}></canvas>
	</div>
}
export declare namespace Paint {
	export interface Props {
		fields: Header.Fields
	}
}

Paint.displayName = 'Paint'