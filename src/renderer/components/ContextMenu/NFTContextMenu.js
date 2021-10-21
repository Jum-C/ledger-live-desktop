// @flow
import React from "react";
import { useTranslation } from "react-i18next";
import IconOpensea from "~/renderer/icons/Opensea";
import IconRarible from "~/renderer/icons/Rarible";
import IconGlobe from "~/renderer/icons/Globe";
import { openURL } from "~/renderer/linking";
import ContextMenuItem from "./ContextMenuItem";

type Props = {
  contract: string,
  tokenId: string,
  leftClick?: boolean,
  children: any,
};

export default function NFTContextMenu({ leftClick, children, contract, tokenId }: Props) {
  const { t } = useTranslation();

  const menuItems = [
    {
      key: "opensea",
      label: t("NFT.viewer.actions.open", { viewer: "Opensea.io" }),
      Icon: IconOpensea,
      type: "external",
      callback: () => openURL(`https://opensea.io/assets/${contract}/${tokenId}`),
    },
    {
      key: "rarible",
      label: t("NFT.viewer.actions.open", { viewer: "Rarible" }),
      Icon: IconRarible,
      type: "external",
      callback: () => openURL(`https://rarible.com/token/${contract}:${tokenId}`),
    },
    {
      key: "sep2",
      type: "separator",
      label: "",
    },
    {
      key: "etherscan",
      label: t("NFT.viewer.actions.open", { viewer: "Explorer" }),
      Icon: IconGlobe,
      type: "external",
      callback: () => openURL(`https://etherscan.io/token/${contract}?a=${tokenId}`),
    },
  ];

  return (
    <ContextMenuItem leftClick={leftClick} items={menuItems}>
      {children}
    </ContextMenuItem>
  );
}
