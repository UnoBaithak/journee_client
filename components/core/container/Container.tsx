import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { BaseContainerStyles } from './ContainerStyles'

export function FixedContainer({children, style}: {children: React.ReactNode, style?:StyleProp<ViewStyle>}) {
    return (
        <View style={[BaseContainerStyles.container, style]}>
            {children}
        </View>
    )
}