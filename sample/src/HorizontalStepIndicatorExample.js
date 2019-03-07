import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ViewPager} from 'rn-viewpager';
// import Steps from 'react-native-steps';
import Steps from '../../steps-test';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const PAGES = ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'];

const firstIndicatorConfigs = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 5,
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
    labelColor: '#666666',
    labelSize: 12,
    currentStepLabelColor: '#4aae4f',
};

const secondIndicatorConfigs = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    separatorStrokeFinishedWidth: 4,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013',
};

const thirdIndicatorConfigs = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#7eaec4',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#7eaec4',
    stepStrokeUnFinishedColor: '#dedede',
    separatorFinishedColor: '#7eaec4',
    separatorUnFinishedColor: '#dedede',
    stepIndicatorFinishedColor: '#7eaec4',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    stepIndicatorLabelCurrentColor: 'transparent',
    stepIndicatorLabelFinishedColor: 'transparent',
    stepIndicatorLabelUnFinishedColor: 'transparent',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#7eaec4'
};

const getStepIndicatorIconConfig = ({position, stepStatus}) => {
    const iconConfig = {
        name: 'feed',
        color: stepStatus === 'finished' ? '#ffffff' : '#fe7013',
        size: 15
    };
    switch (position) {
        case 0: {
            iconConfig.name = 'shopping-cart';
            break
        }
        case 1: {
            iconConfig.name = 'location-on';
            break
        }
        case 2: {
            iconConfig.name = 'assessment';
            break
        }
        case 3: {
            iconConfig.name = 'payment';
            break
        }
        case 4: {
            iconConfig.name = 'track-changes';
            break
        }
        default: {
            break
        }
    }
    return iconConfig
};

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextState.currentPage !== this.state.currentPage) {
            if (this.viewPager) {
                this.viewPager.setPage(nextState.currentPage)
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.stepIndicator}>
                    <Steps
                        configs={firstIndicatorConfigs}
                        current={this.state.currentPage}
                        reversed={true}
                        labels={['Account', 'Profile', 'Band', 'Membership', 'Dashboard']}
                    />
                </View>
                <View style={styles.stepIndicator}>
                    <Steps
                        renderStepIndicator={this.renderStepIndicator}
                        configs={secondIndicatorConfigs}
                        current={this.state.currentPage}
                        labels={[
                            'Cart',
                            'Delivery Address',
                            'Order Summary',
                            'Payment Method',
                            'Track'
                        ]}
                    />
                </View>
                <View style={styles.stepIndicator}>
                    <Steps
                        count={4}
                        configs={thirdIndicatorConfigs}
                        current={this.state.currentPage}
                        labels={['Approval', 'Processing', 'Shipping', 'Delivery']}
                    />
                </View>
                <ViewPager
                    style={{flexGrow: 1}}
                    ref={viewPager => {
                        this.viewPager = viewPager
                    }}
                    onPageSelected={page => {
                        this.setState({currentPage: page.position})
                    }}
                >
                    {PAGES.map((page, index) => this.renderViewPagerPage(page, index))}
                </ViewPager>
            </View>
        )
    }

    renderViewPagerPage = (data, index) => {
        return (
            <View style={styles.page} key={index}>
                <Text>{data}</Text>
            </View>
        )
    };

    renderStepIndicator = params => (
        <MaterialIcon {...getStepIndicatorIconConfig(params)} />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    stepIndicator: {
        marginVertical: 50
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
