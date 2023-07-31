/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ControlsGoogleLogoWhiteOverridesProps = {
    ControlsGoogleLogoWhite?: PrimitiveOverrideProps<ViewProps>;
    "Maps / Controls / Google Logo / White"?: PrimitiveOverrideProps<ViewProps>;
} & EscapeHatchProps;
export declare type ControlsGoogleLogoWhiteProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: ControlsGoogleLogoWhiteOverridesProps | undefined | null;
}>;
export default function ControlsGoogleLogoWhite(props: ControlsGoogleLogoWhiteProps): React.ReactElement;
