import React, {JSX} from "react";
import {Text, View, StyleSheet, StyleProp, TextStyle} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import stylesDebtorDetails from "../views/debtor-details/StylesDebtorDetails";
import stylesDebtCard from "../views/debtor-details/StylesDebtCard";


interface Props {
    width: number;
    text: string;
    styleText: StyleProp<TextStyle>
    endGradient?: number;
}

export const FadedText = ({width, text, styleText, endGradient}: Props) => {
  return (
    <View style={[styles.container, { width }]}>
      <MaskedView
        style={{ width: width}}
        maskElement={
          <LinearGradient
            colors={["black", "black", "transparent"]}
            locations={[0, 0.8, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: endGradient || 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        }
      >
        <Text style={styleText}>{text}</Text>
      </MaskedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden", // importante para que no se desborde
  },
});