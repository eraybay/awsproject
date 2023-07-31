/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
import { SearchBoxProps } from "./SearchBox";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NavBarOverridesProps = {
    NavBar?: PrimitiveOverrideProps<ViewProps>;
    "Search + Login Button"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 29"?: PrimitiveOverrideProps<FlexProps>;
    user?: PrimitiveOverrideProps<TextProps>;
    Hesap?: PrimitiveOverrideProps<TextProps>;
    "Search Box"?: SearchBoxProps;
    "Frame 39"?: PrimitiveOverrideProps<FlexProps>;
    Search?: PrimitiveOverrideProps<TextProps>;
    "Restoran ara"?: PrimitiveOverrideProps<TextProps>;
    "Frame 71"?: PrimitiveOverrideProps<ViewProps>;
    "Frame 61"?: PrimitiveOverrideProps<FlexProps>;
    "map-marker-alt"?: PrimitiveOverrideProps<TextProps>;
    "Frame 63"?: PrimitiveOverrideProps<FlexProps>;
    "Current Location"?: PrimitiveOverrideProps<TextProps>;
    "Mohammadpur Bus Stand, Dhaka"?: PrimitiveOverrideProps<TextProps>;
    "Ana Sayfa | Hakk\u0131m\u0131zda"?: PrimitiveOverrideProps<TextProps>;
    "Bir t\u0131kla lezzetin pe\u015Fine d\u00FC\u015F"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type NavBarProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: NavBarOverridesProps | undefined | null;
}>;
export default function NavBar(props: NavBarProps): React.ReactElement;
