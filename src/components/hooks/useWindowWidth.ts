import { useCallback, useEffect, useState } from 'react'

type WindowWidthType = 'big' | 'medium' | 'small'

interface UseWindowWidthParamTypes {
	smallScreenBreakPoint?: number
	mediumScreenBreakPoint?: number
}
const useWindowWidth = ({
	smallScreenBreakPoint = 500,
	mediumScreenBreakPoint = 835,
}: UseWindowWidthParamTypes = {}): {
	windowWidth: WindowWidthType
} => {
	const [windowWidth, setWindowWidth] = useState<WindowWidthType>('big')

	const updateWindowWidth = useCallback(() => {
		setWindowWidth(prevWidth => {
			switch (true) {
				case window.innerWidth <= smallScreenBreakPoint:
					return prevWidth !== 'small' ? 'small' : prevWidth
				case window.innerWidth <= mediumScreenBreakPoint:
					return prevWidth !== 'medium' ? 'medium' : prevWidth
				default:
					return prevWidth !== 'big' ? 'big' : prevWidth
			}
		})
	}, [mediumScreenBreakPoint, smallScreenBreakPoint])

	useEffect(() => {
		updateWindowWidth()

		window.addEventListener('resize', updateWindowWidth)

		return () => {
			window.removeEventListener('resize', updateWindowWidth)
		}
	})

	return { windowWidth }
}

export default useWindowWidth
