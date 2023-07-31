/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ImageProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MapsZoomLevels2CityOverridesProps = {
    MapsZoomLevels2City?: PrimitiveOverrideProps<ViewProps>;
    "Map of Birmingham (City)"?: PrimitiveOverrideProps<ImageProps>;
} & EscapeHatchProps;
export declare type MapsZoomLevels2CityProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: MapsZoomLevels2CityOverridesProps | undefined | null;
}>;
export default function MapsZoomLevels2City(props: MapsZoomLevels2CityProps): React.ReactElement;
