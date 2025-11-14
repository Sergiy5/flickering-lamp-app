import { View } from "react-native";

interface ContainerProps {
    children: React.ReactNode
    className?: string
}
export const Container: React.FC<ContainerProps> = ({ children, className }) => {
    return <View className={`w-full py-2 px-4 ${className}`}>{ children }</View>;
};