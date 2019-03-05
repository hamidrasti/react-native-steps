// Type definitions for react-native-steps
// Project: https://github.com/hamraa/react-native-steps
// Definitions by: hamraa <https://github.com/hamraa>
// TypeScript Version: 3.2.1

import React from 'react';
import {TextStyle} from 'react-native';

interface StepsConfigs {
    /**
     * Size of step indicator circle
     *
     * @default 30
     * @type {number}
     * @memberof StepsConfigs
     */
    stepIndicatorSize?: number

    /**
     * Size of the current step indicator circle
     *
     * @default 40
     * @type {number}
     * @memberof StepsConfigs
     */
    currentStepIndicatorSize?: number

    /**
     * Stroke thickness of the separator between steps
     *
     * @default 2
     * @type {number}
     * @memberof StepsConfigs
     */
    separatorStrokeWidth?: number

    /**
     * Thickness of the stroke around each step
     *
     * @default 3
     * @type {number}
     * @memberof StepsConfigs
     */
    stepStrokeWidth?: number

    /**
     * Thickness of the stroke around the current step
     *
     * @default 3
     * @type {number}
     * @memberof StepsConfigs
     */
    currentStepStrokeWidth?: number

    /**
     * Stroke color for the current step
     *
     * @default '#fe7013'
     * @type {string}
     * @memberof StepsConfigs
     */
    stepStrokeCurrentColor?: string

    /**
     * Stroke color for finished steps
     *
     * @default '#fe7013'
     * @type {string}
     * @memberof StepsConfigs
     */
    stepStrokeFinishedColor?: string

    /**
     * Stroke color for unfinished steps
     *
     * @default '#aaaaaa'
     * @type {string}
     * @memberof StepsConfigs
     */
    stepStrokeUnFinishedColor?: string

    /**
     * Color of separator for finished items
     *
     * @default '#fe7013'
     * @type {string}
     * @memberof StepsConfigs
     */
    separatorFinishedColor?: string

    /**
     * Color of separator for unfinished items
     *
     * @default '#aaaaaa'
     * @type {string}
     * @memberof StepsConfigs
     */
    separatorUnFinishedColor?: string

    /**
     * Color of the circle for finished steps
     *
     * @default '#fe7013'
     * @type {string}
     * @memberof StepsConfigs
     */
    stepIndicatorFinishedColor?: string

    /**
     * Color of the circle for unfinished steps
     *
     * @default '#ffffff'
     * @type {string}
     * @memberof StepsConfigs
     */
    stepIndicatorUnFinishedColor?: string

    /**
     * Color of the circle for the current step
     *
     * @default '#ffffff'
     * @type {string}
     * @memberof StepsConfigs
     */
    stepIndicatorCurrentColor?: string

    /**
     * Font size of the number inside the circle for each step
     *
     * @default 15
     * @type {number}
     * @memberof StepsConfigs
     */
    stepIndicatorLabelFontSize?: number

    /**
     * Font size of the number inside the circle for the current step
     *
     * @default 15
     * @type {number}
     * @memberof StepsConfigs
     */
    currentStepIndicatorLabelFontSize?: number

    /**
     * Color of label for the current step
     *
     * @default '#ffffff'
     * @type {string}
     * @memberof StepsConfigs
     */
    stepIndicatorLabelCurrentColor?: string

    /**
     * Color of labels that their steps are finished
     *
     * @default '#ffffff'
     * @type {string}
     * @memberof StepsConfigs
     */
    stepIndicatorLabelFinishedColor?: string

    /**
     * Color of labels that their steps are unfinished
     *
     * @default 'rgba(255,255,255,0.5)'
     * @type {string}
     * @memberof StepsConfigs
     */
    stepIndicatorLabelUnFinishedColor?: string

    /**
     * Color of the label text
     *
     * @default '#000000'
     * @type {string}
     * @memberof StepsConfigs
     */
    labelColor?: string

    /**
     * Color of the current step label
     *
     * @default '#4aae4f'
     * @type {string}
     * @memberof StepsConfigs
     */
    currentStepLabelColor?: string

    /**
     * Font size for the labels
     *
     * @default 13
     * @type {number}
     * @memberof StepsConfigs
     */
    labelSize?: number

    /**
     * Label alignment
     *
     * @default 'center'
     * @type {string}
     * @memberof StepsConfigs
     *
     */
    labelAlign?: string

    /**
     * Label alignment
     *
     * @default {}
     * @type {TextStyle}
     * @memberof StepsConfigs
     *
     */
    labelStyle?: TextStyle
}

interface StepsProps {
    /**
     * Current step
     *
     * @default 0
     * @type {number}
     * @memberof StepsProps
     */
    current?: number

    /**
     * Number of steps
     *
     * @default 5
     * @type {number}
     * @memberof StepsProps
     */
    count?: number

    /**
     * Orientation of the Steps
     *
     * @default 'horizontal'
     * @type {('horizontal' | 'vertical')}
     * @memberof StepsProps
     */
    direction?: 'horizontal' | 'vertical'

    /**
     * Styles for the component
     *
     * @type {StepsConfigs}
     * @memberof StepsProps
     */
    configs?: StepsConfigs

    /**
     * Labels for each step
     *
     * @type {string[]}
     * @memberof StepsProps
     */
    labels?: string[]

    /**
     * Number of steps
     *
     * @default false
     * @type {boolean}
     * @memberof StepsProps
     */
    reversed?: boolean

    /**
     * Callback fired when tapping on a step
     *
     * @param {number} step
     *
     * @memberof StepsProps
     */
    onPress?(step: number): void
}

export default class Steps extends React.Component<StepsProps, {}> {
}
