import React, { useCallback, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { ThemedComponent } from "~/renderer/styles/StyleProvider";
import styled from "styled-components";
import { openURL } from "~/renderer/linking";
import LangSwitcher from "~/renderer/components/Onboarding/LangSwitcher";
import Carousel from "~/renderer/components/Onboarding/Screens/Welcome/Carousel";
import { urls } from "~/config/urls";
import { Log, Text, Button, Logos, Icons } from "@ledgerhq/react-ui";

import accessCrypto from "./assets/access-crypto.svg";
import ownPrivateKey from "./assets/own-private-key.svg";
import setupNano from "./assets/setup-nano.svg";
import stayOffline from "./assets/stay-offline.svg";
import validateTransactions from "./assets/validate-transactions.svg";

import { registerAssets } from "~/renderer/components/Onboarding/preloadAssets";

const stepLogos = [accessCrypto, ownPrivateKey, stayOffline, validateTransactions, setupNano]
registerAssets(stepLogos);

const Link = styled(Text)`
  text-decoration: underline;
  cursor: pointer;
`;

const WelcomeContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const LeftContainer = styled.div`
  width: 386px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px;
  z-index: 999;
`;

const Presentation = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductHighlight = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4px;
`;

const NoDevice = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 24px;
`;

const RightContainer = styled.div`
  height: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  background-color:  ${p => p.theme.colors.palette.primary.c60};
`;

const CarouselTopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 40px;
  width: 100%;
`;

const Description = styled(Text)`
  white-space: pre-line;
`;

type Props = {
  sendEvent: (event: string) => void;
  onboardingRelaunched: boolean;
};

export function Welcome({ sendEvent, onboardingRelaunched }: Props) {
  const {t} = useTranslation();

  const handleNext = useCallback(() => {
    sendEvent("NEXT");
  }, [sendEvent]);

  const buyNanoX = useCallback(() => {
    openURL(urls.noDevice.buyNew);
  }, []);

  const steps = stepLogos.map( (logo, index) => ({
    image: logo,
    title: t(`v3.onboarding.screens.welcome.steps.${index}.title`),
    description: t(`v3.onboarding.screens.welcome.steps.${index}.desc`),
    isLast: index === stepLogos.length - 1
  }))

  return (
    <WelcomeContainer>
      <LeftContainer>
        <Presentation>
          <Logos.LedgerLiveRegular />
          <Text type="h1" ff="Alpha|Medium" pt={"32px"} pb={"20px"}>
            {t("v3.onboarding.screens.welcome.title")}
          </Text>
          <Description type="body" ff="Inter|Medium" fontSize={14}>
            {t("v3.onboarding.screens.welcome.description")}
          </Description>
        </Presentation>
        <ProductHighlight>
          <Button 
            iconPosition="right"
            Icon={Icons.ArrowRightMedium}
            type="main" 
            onClick={handleNext}
          >
            {t("v3.onboarding.screens.welcome.nextButton")}
          </Button>
          <NoDevice>
            <Text marginRight={2}>{t("v3.onboarding.screens.welcome.noDevice")}</Text>
            <Link onClick={buyNanoX}>{t("v3.onboarding.screens.welcome.buyLink")}</Link>
          </NoDevice>
        </ProductHighlight>
      </LeftContainer>
      <RightContainer>
        <CarouselTopBar>
          <LangSwitcher />
        </CarouselTopBar>
        <Carousel
          queue={steps}
        />
      </RightContainer>
    </WelcomeContainer>
  );
}