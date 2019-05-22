import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

const STEP_STATUS = {
	CURRENT: 'current',
	FINISHED: 'finished',
	UNFINISHED: 'unfinished',
};

export default class Steps extends Component {
	constructor(props) {
		super(props);

		const defaultConfigs = {
			stepIndicatorSize: 30,
			currentStepIndicatorSize: 40,
			separatorStrokeWidth: 3,
			separatorStrokeUnfinishedWidth: 0,
			separatorStrokeFinishedWidth: 0,
			currentStepStrokeWidth: 5,
			stepStrokeWidth: 0,
			stepStrokeCurrentColor: '#4aae4f',
			stepStrokeFinishedColor: '#4aae4f',
			stepStrokeUnFinishedColor: '#4aae4f',
			separatorFinishedColor: '#4aae4f',
			separatorUnFinishedColor: '#a4d4a5',
			stepIndicatorFinishedColor: '#4aae4f',
			stepIndicatorUnFinishedColor: '#a4d4a5',
			stepIndicatorCurrentColor: '#ffffff',
			stepIndicatorLabelFontSize: 15,
			currentStepIndicatorLabelFontSize: 15,
			stepIndicatorLabelCurrentColor: '#000000',
			stepIndicatorLabelFinishedColor: '#ffffff',
			stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
			labelColor: '#000000',
			labelSize: 13,
			labelAlign: 'center',
			labelStyle: {},
			subLabelStyle: {},
			currentStepLabelColor: '#4aae4f',
		};
		const configs = Object.assign(defaultConfigs, props.configs);

		this.state = {
			width: 0,
			height: 0,
			progressBarSize: 0,
			configs,
		};

		this.progressAnim = new Animated.Value(0);
		this.sizeAnim = new Animated.Value(this.state.configs.stepIndicatorSize);
		this.borderRadiusAnim = new Animated.Value(this.state.configs.stepIndicatorSize / 2);
	}

	stepPressed(position) {
		if (this.props.onPress) {
			this.props.onPress(position);
		}
	}

	render() {
		const { labels, direction, reversed } = this.props;
		return (
			<View
				style={[
					styles.container,
					direction === 'vertical'
						? {
								flexDirection: 'row',
								flex: 1,
						  }
						: { flexDirection: 'column' },
				]}
			>
				{this.state.width !== 0 && this.renderProgressBarBackground()}
				<View style={reversed ? { transform: [{ rotate: '180deg' }] } : {}}>
					{this.state.width !== 0 && this.renderProgressBar()}
				</View>
				{this.renderStepIndicator()}
				{labels && this.renderStepLabels()}
			</View>
		);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.configs !== this.props.configs) {
			this.setState(state => ({
				configs: Object.assign(state.configs, nextProps.configs),
			}));
		}
		if (nextProps.current !== this.props.current) {
			this.onCurrentPositionChanged(nextProps.current);
		}
	}

	renderProgressBarBackground = () => {
		const { count, direction } = this.props;
		let progressBarBackgroundStyle;
		if (direction === 'vertical') {
			progressBarBackgroundStyle = {
				backgroundColor: this.state.configs.separatorUnFinishedColor,
				position: 'absolute',
				top: this.state.height / (2 * count),
				bottom: this.state.height / (2 * count),
				left: (this.state.width - this.state.configs.separatorStrokeWidth) / 2,
				width:
					this.state.configs.separatorStrokeUnfinishedWidth === 0
						? this.state.configs.separatorStrokeWidth
						: this.state.configs.separatorStrokeUnfinishedWidth,
			};
		} else {
			progressBarBackgroundStyle = {
				backgroundColor: this.state.configs.separatorUnFinishedColor,
				position: 'absolute',
				left: this.state.width / (2 * count),
				right: this.state.width / (2 * count),
				top: (this.state.height - this.state.configs.separatorStrokeWidth) / 2,
				height:
					this.state.configs.separatorStrokeUnfinishedWidth === 0
						? this.state.configs.separatorStrokeWidth
						: this.state.configs.separatorStrokeUnfinishedWidth,
			};
		}
		return (
			<View
				onLayout={event => {
					if (direction === 'vertical') {
						this.setState({ progressBarSize: event.nativeEvent.layout.height }, () => {
							this.onCurrentPositionChanged(this.props.current);
						});
					} else {
						this.setState({ progressBarSize: event.nativeEvent.layout.width }, () => {
							this.onCurrentPositionChanged(this.props.current);
						});
					}
				}}
				style={progressBarBackgroundStyle}
			/>
		);
	};

	renderProgressBar = () => {
		const { count, direction, reversed } = this.props;
		let progressBarStyle;
		if (direction === 'vertical') {
			progressBarStyle = {
				backgroundColor: this.state.configs.separatorFinishedColor,
				position: 'absolute',
				top: this.state.height / (2 * count),
				bottom: this.state.height / (2 * count),
				width:
					this.state.configs.separatorStrokeFinishedWidth === 0
						? this.state.configs.separatorStrokeWidth
						: this.state.configs.separatorStrokeFinishedWidth,
				height: this.progressAnim,
			};
			if (reversed) {
				progressBarStyle.right = (this.state.width - this.state.configs.separatorStrokeWidth) / 2;
			} else {
				progressBarStyle.left = (this.state.width - this.state.configs.separatorStrokeWidth) / 2;
			}
		} else {
			progressBarStyle = {
				backgroundColor: this.state.configs.separatorFinishedColor,
				position: 'absolute',
				left: this.state.width / (2 * count),
				right: this.state.width / (2 * count),
				height:
					this.state.configs.separatorStrokeFinishedWidth === 0
						? this.state.configs.separatorStrokeWidth
						: this.state.configs.separatorStrokeFinishedWidth,
				width: this.progressAnim,
			};

			if (reversed) {
				progressBarStyle.bottom = (this.state.height - this.state.configs.separatorStrokeWidth) / 2;
			} else {
				progressBarStyle.top = (this.state.height - this.state.configs.separatorStrokeWidth) / 2;
			}
		}
		return <Animated.View style={progressBarStyle} />;
	};

	renderStepIndicator = () => {
		let steps = [];
		const { count, direction, reversed } = this.props;
		for (let position = 0; position < count; position++) {
			steps.push(
				<TouchableWithoutFeedback key={position} onPress={() => this.stepPressed(position)}>
					<View
						style={[
							styles.stepContainer,
							direction === 'vertical' ? { flexDirection: 'column' } : { flexDirection: 'row' },
						]}
					>
						{this.renderStep(position)}
					</View>
				</TouchableWithoutFeedback>
			);
		}
		return (
			<View
				onLayout={event =>
					this.setState({
						width: event.nativeEvent.layout.width,
						height: event.nativeEvent.layout.height,
					})
				}
				style={[
					styles.stepIndicatorContainer,
					direction === 'vertical'
						? {
								flexDirection: reversed ? 'column-reverse' : 'column',
								width: this.state.configs.currentStepIndicatorSize,
						  }
						: {
								flexDirection: reversed ? 'row-reverse' : 'row',
								height: this.state.configs.currentStepIndicatorSize,
						  },
				]}
			>
				{steps}
			</View>
		);
	};

	renderStepLabels = () => {
		const { labels, direction, current, reversed } = this.props;
		// console.log('labels ', labels)
		const labelViews = labels.map((label, index) => {
			const selectedStepLabelStyle =
				index === current
					? { color: this.state.configs.currentStepLabelColor }
					: { color: this.state.configs.labelColor };
			return (
				<TouchableWithoutFeedback
					key={index}
					style={styles.stepLabelItem}
					onPress={() => this.stepPressed(index)}
				>
					<View style={styles.stepLabelItem}>
						<Text
							style={[
								styles.stepLabel,
								selectedStepLabelStyle,
								{ fontSize: this.state.configs.labelSize, ...this.state.configs.labelStyle },
							]}
						>
							{label.label}
						</Text>
						<Text
							style={[
								styles.stepLabel,
								selectedStepLabelStyle,
								{ fontSize: this.state.configs.labelSize, ...this.state.configs.subLabelStyle },
							]}
						>
							{label.sublabel}
						</Text>
					</View>
				</TouchableWithoutFeedback>
			);
		});

		return (
			<View
				style={[
					styles.stepLabelsContainer,
					direction === 'vertical'
						? {
								flexDirection: reversed ? 'column-reverse' : 'column',
								paddingHorizontal: 4,
						  }
						: {
								flexDirection: reversed ? 'row-reverse' : 'row',
								paddingVertical: 4,
						  },
					{ alignItems: this.state.configs.labelAlign },
				]}
			>
				{labelViews}
			</View>
		);
	};

	renderStep = position => {
		const { direction, renderStepIndicator } = this.props;
		let stepStyle;
		let indicatorLabelStyle;
		// noinspection JSSuspiciousNameCombination
		const separatorStyle =
			direction === 'vertical'
				? {
						width: this.state.configs.separatorStrokeWidth,
						zIndex: 10,
				  }
				: { height: this.state.configs.separatorStrokeWidth };
		switch (this.getStepStatus(position)) {
			case STEP_STATUS.CURRENT: {
				stepStyle = {
					backgroundColor: this.state.configs.stepIndicatorCurrentColor,
					borderWidth: this.state.configs.currentStepStrokeWidth,
					borderColor: this.state.configs.stepStrokeCurrentColor,
					height: this.sizeAnim,
					width: this.sizeAnim,
					borderRadius: this.borderRadiusAnim,
				};
				indicatorLabelStyle = {
					fontSize: this.state.configs.currentStepIndicatorLabelFontSize,
					color: this.state.configs.stepIndicatorLabelCurrentColor,
				};

				break;
			}
			case STEP_STATUS.FINISHED: {
				stepStyle = {
					backgroundColor: this.state.configs.stepIndicatorFinishedColor,
					borderWidth: this.state.configs.stepStrokeWidth,
					borderColor: this.state.configs.stepStrokeFinishedColor,
					height: this.state.configs.stepIndicatorSize,
					width: this.state.configs.stepIndicatorSize,
					borderRadius: this.state.configs.stepIndicatorSize / 2,
				};
				indicatorLabelStyle = {
					fontSize: this.state.configs.stepIndicatorLabelFontSize,
					color: this.state.configs.stepIndicatorLabelFinishedColor,
				};
				break;
			}

			case STEP_STATUS.UNFINISHED: {
				stepStyle = {
					backgroundColor: this.state.configs.stepIndicatorUnFinishedColor,
					borderWidth: this.state.configs.stepStrokeWidth,
					borderColor: this.state.configs.stepStrokeUnFinishedColor,
					height: this.state.configs.stepIndicatorSize,
					width: this.state.configs.stepIndicatorSize,
					borderRadius: this.state.configs.stepIndicatorSize / 2,
				};
				indicatorLabelStyle = {
					overflow: 'hidden',
					fontSize: this.state.configs.stepIndicatorLabelFontSize,
					color: this.state.configs.stepIndicatorLabelUnFinishedColor,
				};
				break;
			}
			default:
		}

		return (
			<Animated.View key={'step-indicator'} style={[styles.step, stepStyle]}>
				{renderStepIndicator ? (
					renderStepIndicator({
						position,
						stepStatus: this.getStepStatus(position),
					})
				) : (
					<Text style={indicatorLabelStyle}>{`${position + 1}`}</Text>
				)}
			</Animated.View>
		);
	};

	getStepStatus = stepPosition => {
		const { current } = this.props;
		if (stepPosition === current) {
			return STEP_STATUS.CURRENT;
		} else if (stepPosition < current) {
			return STEP_STATUS.FINISHED;
		} else {
			return STEP_STATUS.UNFINISHED;
		}
	};

	onCurrentPositionChanged = position => {
		let { count } = this.props;
		if (position > count - 1) {
			position = count - 1;
		}
		const animateToPosition = (this.state.progressBarSize / (count - 1)) * position;
		this.sizeAnim.setValue(this.state.configs.stepIndicatorSize);
		this.borderRadiusAnim.setValue(this.state.configs.stepIndicatorSize / 2);
		Animated.sequence([
			Animated.timing(this.progressAnim, { toValue: animateToPosition, duration: 200 }),
			Animated.parallel([
				Animated.timing(this.sizeAnim, { toValue: this.state.configs.currentStepIndicatorSize, duration: 100 }),
				Animated.timing(this.borderRadiusAnim, {
					toValue: this.state.configs.currentStepIndicatorSize / 2,
					duration: 100,
				}),
			]),
		]).start();
	};
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'transparent',
	},
	stepIndicatorContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		backgroundColor: 'transparent',
	},
	stepLabelsContainer: {
		justifyContent: 'space-around',
	},
	step: {
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 2,
	},
	stepContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	stepLabel: {
		fontSize: 12,
		textAlign: 'center',
		fontWeight: '500',
	},
	stepLabelItem: {
		flex: 1,
		// alignItems: 'center',
		justifyContent: 'center',
		top: 10,
	},
});

Steps.propTypes = {
	current: PropTypes.number,
	count: PropTypes.number,
	configs: PropTypes.object,
	direction: PropTypes.oneOf(['vertical', 'horizontal']),
	labels: PropTypes.array,
	onPress: PropTypes.func,
	renderStepIndicator: PropTypes.func,
	reversed: PropTypes.bool,
};

Steps.defaultProps = {
	current: 0,
	count: 5,
	configs: {},
	direction: 'horizontal',
	reversed: false,
};
