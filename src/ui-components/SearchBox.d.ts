/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SearchBoxOverridesProps = {
    SearchBox?: PrimitiveOverrideProps<ViewProps>;
    "Search Box"?: PrimitiveOverrideProps<ViewProps>;
} & EscapeHatchProps;
export declare type SearchBoxProps = React.PropsWithChildren<Partial<ViewProps> & {
    property1?: "Default" | "Variant2";
} & {
    overrides?: SearchBoxOverridesProps | undefined | null;
}>;
export default function SearchBox(props: SearchBoxProps): React.ReactElement;
