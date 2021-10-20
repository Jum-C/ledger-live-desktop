// @flow

import React from "react";
import styled, { css } from "styled-components";
import { ThemedComponent } from "~/renderer/styles/StyleProvider";
import { Text, Button } from "@ledgerhq/react-ui";
import { useTranslation } from "react-i18next";

const DeviceIllustrationContainer = styled.div`
  transition: transform ease-out 150ms;
  will-change: transform;
  display: flex;
`;

const bkgColor = p => p.theme.colors.palette.neutral.c00;
const bkgColorHover = p => p.theme.colors.palette.neutral.c20;
const borderColorHover = p => p.theme.colors.palette.neutral.c40;

const borderCSS = css`
  ${p => (p.isFirst ? "" : `border-left: 1px solid ${bkgColor(p)};`)}
  ${p => (p.isLast ? "" : `border-right: 1px solid ${bkgColor(p)};`)}
  &:hover {
    ${p => (p.isFirst ? "" : `border-left: 1px solid ${borderColorHover(p)};`)}
    ${p => (p.isLast ? "" : `border-right: 1px solid ${borderColorHover(p)};`)}
  }
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: center;
  transition: background border 200ms;
  background-color: ${bkgColor};
  &:hover {
    background-color: ${bkgColorHover};
  }
  &:hover ${DeviceIllustrationContainer} {
    transform: translateY(20px);
  }
  ${borderCSS}
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  align-self: center;
`;

interface DeviceSelectOptionProps {
  label: string;
  Illu: React.ReactNode;
  onClick: () => void;
  id: string;
  isFirst: boolean;
  isLast: boolean;
}

export function DeviceSelectorOption({
  id,
  label,
  Illu,
  onClick,
  isFirst,
  isLast,
}: DeviceSelectOptionProps) {
  const { t } = useTranslation();
  return (
    <Container {...{ id, isFirst, isLast }}>
      <ContentContainer>
        <DeviceIllustrationContainer>{Illu}</DeviceIllustrationContainer>
        <Text mt={"32px"} color="palette.text.shade100" ff="Inter|SemiBold" fontSize={"22px"}>
          {label}
        </Text>
        <Button onClick={onClick}>{t("v3.onboarding.screens.selectDevice.selectLabel")}</Button>
      </ContentContainer>
    </Container>
  );
}