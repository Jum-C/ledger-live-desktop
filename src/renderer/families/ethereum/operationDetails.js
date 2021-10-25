// @flow
import React, { useMemo } from "react";
import styled from "styled-components";
import toPairs from "lodash/toPairs";
import { Trans } from "react-i18next";
import type { AccountLike, Operation } from "@ledgerhq/live-common/lib/types";
import { nftsFromOperations } from "@ledgerhq/live-common/lib/nft/helpers";
import { useNftMetadata } from "@ledgerhq/live-common/lib/nft/NftMetadataProvider";
import { centerEllipsis } from "~/renderer/styles/helpers";
import Box from "~/renderer/components/Box";
import Skeleton from "~/renderer/screens/nft/Skeleton";
import Text from "~/renderer/components/Text";
import type { ThemedComponent } from "~/renderer/styles/StyleProvider";

import {
  OpDetailsTitle,
  OpDetailsData,
  OpDetailsSection,
} from "~/renderer/drawers/OperationDetails/styledComponents";
import Ellipsis from "~/renderer/components/Ellipsis";

type OperationDetailsExtraProps = {
  extra: { [key: string]: string },
  type: string,
  account: ?AccountLike,
};

const OperationDetailsExtra = ({ extra, type }: OperationDetailsExtraProps) => {
  const entries = toPairs(extra);
  // $FlowFixMe
  return (type === "REDEEM" || type === "SUPPLY"
    ? entries.filter(([key]) => !["compoundValue", "rate"].includes(key))
    : entries
  ).map(([key, value]) => (
    <OpDetailsSection key={key}>
      <OpDetailsTitle>
        <Trans i18nKey={`operationDetails.extra.${key}`} defaults={key} />
      </OpDetailsTitle>
      <OpDetailsData>
        <Ellipsis>{value}</Ellipsis>
      </OpDetailsData>
    </OpDetailsSection>
  ));
};

type Props = {
  operation: Operation,
};

const Cell: ThemedComponent<{}> = styled(Box).attrs(() => ({
  horizontal: false,
  alignItems: "flex-end",
}))`
  flex: 0 0 auto;
  text-align: right;
  justify-content: center;
  min-width: 150px;
`;

const NFTAmountField = ({ operation }: Props) => {
  const operations = useMemo(() => [operation], [operation]);
  const nfts = nftsFromOperations(operations);
  const { status, metadata } = useNftMetadata(nfts[0]?.collection.contract, nfts[0]?.tokenId);
  const show = useMemo(() => status !== "loaded", [status]);

  return (
    <Cell>
      <Skeleton show={show} width={170} minHeight={24} barHeight={10}>
        <Text ff="Inter|SemiBold" fontSize={4} color="palette.text.shade100">
          {metadata?.nftName}
        </Text>
      </Skeleton>
      <Skeleton show={show} width={200} minHeight={24} barHeight={6}>
        <Text ff="Inter|Regular" fontSize={3} color="palette.text.shade100">
          {centerEllipsis(metadata?.tokenId)}
        </Text>
      </Skeleton>
    </Cell>
  );
};

const amountCell = {
  NFT_OUT: NFTAmountField,
  NFT_IN: NFTAmountField,
};

export default {
  OperationDetailsExtra,
  amountCell,
};
