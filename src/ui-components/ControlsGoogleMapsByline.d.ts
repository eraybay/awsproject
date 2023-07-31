/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ControlsGoogleMapsBylineOverridesProps = {
    ControlsGoogleMapsByline?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 3"?: PrimitiveOverrideProps<ViewProps>;
    "Map data @2019 Google"?: PrimitiveOverrideProps<TextProps>;
    "Rectangle 3.1"?: PrimitiveOverrideProps<ViewProps>;
    "Terms of Use"?: PrimitiveOverrideProps<TextProps>;
    "Rectangle 3.2"?: PrimitiveOverrideProps<ViewProps>;
    "Report a map error"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type ControlsGoogleMapsBylineProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: ControlsGoogleMapsBylineOverridesProps | undefined | null;
}>;
export default function ControlsGoogleMapsByline(props: ControlsGoogleMapsBylineProps): React.ReactElement;
