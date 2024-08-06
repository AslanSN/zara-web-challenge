import { useCallback, useEffect, useState } from 'react'

type WindowWidthType = 'big' | 'medium' | 'small'

interface UseWindowWidthParamTypes {
	smallScreenBreakPoint?: number
	mediumScreenBreakPoint?: number
}
/**
 * Custom hook that returns the current window width and updates it on window resize.
 *
 * @param {UseWindowWidthParamTypes} options - Optional object containing the breakpoint values for small and medium screens.
 * @param {number} options.smallScreenBreakPoint - The width below which the window width is considered 'small'. Defaults to 500.
 * @param {number} options.mediumScreenBreakPoint - The width below which the window width is considered 'medium'. Defaults to 835.
 * @return {{ windowWidth: WindowWidthType }} - An object containing the current window width.
 */
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
