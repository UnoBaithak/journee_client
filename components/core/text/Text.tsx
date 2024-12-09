import { StyleProp, Text, TextStyle } from "react-native"
import { BaseTextStyles } from "./TextStyles"

interface TextProps {
    children: React.ReactNode,
    style?: StyleProp<TextStyle>
}

const NormalText = ({children, style}: {children: React.ReactNode, style?: StyleProp<TextStyle>}) => (
    <Text style={[BaseTextStyles.text, style]}>
        {children}
    </Text>
)

const BoldText = ({children, style}: TextProps) => (
    <NormalText style={[ {fontWeight: "bold"},  style]}>
        {children}
    </NormalText>
)

const ItalicText = ({children, style}: TextProps) => (
    <NormalText style={[{fontStyle: "italic"}, style]}>
        {children}
    </NormalText>
)


export {
    NormalText,
    BoldText,
    ItalicText
}