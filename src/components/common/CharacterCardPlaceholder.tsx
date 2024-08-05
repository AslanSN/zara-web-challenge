import styled from 'styled-components'

const ImagePlaceholderStyled = styled.div<{ width: number; height: number }>`
	position: relative;
	width: ${props => props.width}px;
	height: ${props => props.height}px;
	background-color: var(--light-grey);
	overflow: hidden;
	.activity {
		position: absolute;
		left: -45%;
		top: -50%;
		height: 200%;
		width: 45%;
		transform: rotate(45deg);
		background-image: linear-gradient(
			to left,
			rgba(251, 251, 251, 0.05),
			rgba(251, 251, 251, 0.3),
			rgba(251, 251, 251, 0.6),
			rgba(251, 251, 251, 0.3),
			rgba(251, 251, 251, 0.05)
		);
		background-image: -moz-linear-gradient(
			to left,
			rgba(251, 251, 251, 0.05),
			rgba(251, 251, 251, 0.3),
			rgba(251, 251, 251, 0.6),
			rgba(251, 251, 251, 0.3),
			rgba(251, 251, 251, 0.05)
		);
		background-image: -webkit-linear-gradient(
			to left,
			rgba(251, 251, 251, 0.05),
			rgba(251, 251, 251, 0.3),
			rgba(251, 251, 251, 0.6),
			rgba(251, 251, 251, 0.3),
			rgba(251, 251, 251, 0.05)
		);
		animation: loading 1s linear infinite;

		@keyframes loading {
			0% {
				left: -90%;
			}
			100% {
				left: 190%;
			}
		}
	}
`

const ImagePlaceholder = ({
	width,
	height,
}: {
	width: number
	height: number
}) => (
	<ImagePlaceholderStyled width={width} height={height}>
		<div className="activity" />
	</ImagePlaceholderStyled>
)

export default ImagePlaceholder
