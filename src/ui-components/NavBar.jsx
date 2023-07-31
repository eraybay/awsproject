/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Text, View } from "@aws-amplify/ui-react";
import SearchBox from "./SearchBox";
export default function NavBar(props) {
  const { overrides, ...rest } = props;
  return (
    <View
      width="1280px"
      height="157px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      overflow="hidden"
      position="relative"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(222,151,0,0.24)"
      {...getOverrideProps(overrides, "NavBar")}
      {...rest}
    >
      <Flex
        gap="30px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="center"
        position="absolute"
        top="66px"
        left="1084px"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Search + Login Button")}
      >
        <Flex
          gap="10px"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="center"
          alignItems="center"
          shrink="0"
          position="relative"
          boxShadow="0px 5px 10px rgba(1, 0.6804981231689453, 0, 0.25999999046325684)"
          borderRadius="8px"
          padding="14px 24px 14px 24px"
          backgroundColor="rgba(255,255,255,1)"
          {...getOverrideProps(overrides, "Frame 29")}
        >
          <Text
            fontFamily="Font Awesome 5 Free"
            fontSize="18px"
            fontWeight="900"
            lineHeight="18px"
            textAlign="center"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="user"
            {...getOverrideProps(overrides, "user")}
          ></Text>
          <Text
            fontFamily="Source Sans Pro"
            fontSize="18px"
            fontWeight="700"
            lineHeight="18px"
            textAlign="center"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Hesap"
            {...getOverrideProps(overrides, "Hesap")}
          ></Text>
        </Flex>
      </Flex>
      <SearchBox
        width="357px"
        height="48px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="80px"
        left="461px"
        padding="0px 0px 0px 0px"
        property1="Default"
        {...getOverrideProps(overrides, "Search Box")}
      ></SearchBox>
      <Flex
        gap="8px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        top="94px"
        left="573px"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 39")}
      >
        <Text
          fontFamily="Font Awesome 5 Free"
          fontSize="18px"
          fontWeight="900"
          color="rgba(242,160,139,1)"
          lineHeight="18px"
          textAlign="center"
          display="block"
          direction="column"
          justifyContent="unset"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Search"
          {...getOverrideProps(overrides, "Search")}
        ></Text>
        <Text
          fontFamily="Source Sans Pro"
          fontSize="18px"
          fontWeight="700"
          color="rgba(71,70,71,1)"
          lineHeight="18px"
          textAlign="center"
          display="block"
          direction="column"
          justifyContent="unset"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Restoran ara"
          {...getOverrideProps(overrides, "Restoran ara")}
        ></Text>
      </Flex>
      <View
        width="470px"
        height="25px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="15px"
        left="405px"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 71")}
      >
        <Flex
          gap="9px"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="center"
          position="absolute"
          top="0px"
          left="0px"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Frame 61")}
        >
          <Text
            fontFamily="Font Awesome 5 Free"
            fontSize="18px"
            fontWeight="900"
            color="rgba(0,128,0,1)"
            lineHeight="25.19999885559082px"
            textAlign="center"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="map-marker-alt"
            {...getOverrideProps(overrides, "map-marker-alt")}
          ></Text>
          <Flex
            gap="4px"
            direction="row"
            width="unset"
            height="unset"
            justifyContent="flex-start"
            alignItems="flex-start"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "Frame 63")}
          >
            <Text
              fontFamily="Open Sans"
              fontSize="18px"
              fontWeight="400"
              color="rgba(66,66,66,1)"
              lineHeight="25.19999885559082px"
              textAlign="center"
              display="block"
              direction="column"
              justifyContent="unset"
              width="unset"
              height="unset"
              gap="unset"
              alignItems="unset"
              shrink="0"
              position="relative"
              padding="0px 0px 0px 0px"
              whiteSpace="pre-wrap"
              children="Current Location"
              {...getOverrideProps(overrides, "Current Location")}
            ></Text>
            <Text
              fontFamily="Open Sans"
              fontSize="18px"
              fontWeight="700"
              color="rgba(71,70,71,1)"
              lineHeight="25.19999885559082px"
              textAlign="center"
              display="block"
              direction="column"
              justifyContent="unset"
              width="unset"
              height="unset"
              gap="unset"
              alignItems="unset"
              shrink="0"
              position="relative"
              padding="0px 0px 0px 0px"
              whiteSpace="pre-wrap"
              children="Mohammadpur Bus Stand, Dhaka"
              {...getOverrideProps(overrides, "Mohammadpur Bus Stand, Dhaka")}
            ></Text>
          </Flex>
        </Flex>
      </View>
      <Text
        fontFamily="Source Sans Pro"
        fontSize="18px"
        fontWeight="700"
        color="rgba(71,70,71,1)"
        lineHeight="18px"
        textAlign="center"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="25px"
        left="1060px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Ana Sayfa | Hakkımızda"
        {...getOverrideProps(overrides, "Ana Sayfa | Hakk\u0131m\u0131zda")}
      ></Text>
      <Text
        fontFamily="Source Sans Pro"
        fontSize="30px"
        fontWeight="600"
        color="rgba(0,0,0,1)"
        lineHeight="20px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="59px"
        left="164px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Bir tıkla lezzetin &#xA;peşine düş"
        {...getOverrideProps(
          overrides,
          "Bir t\u0131kla lezzetin pe\u015Fine d\u00FC\u015F"
        )}
      ></Text>
    </View>
  );
}
