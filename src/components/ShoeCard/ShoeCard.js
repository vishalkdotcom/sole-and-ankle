import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import {
  formatPrice,
  pluralize,
  isNewShoe,
  formatVariantText,
} from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt='' src={imageSrc} />
        </ImageWrapper>
        {variant !== 'default' && (
          <Badge
            style={{
              '--background-color':
                variant === 'on-sale' ? COLORS.primary : COLORS.secondary,
            }}
          >
            {formatVariantText(variant)}
          </Badge>
        )}
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={
              variant === 'on-sale'
                ? {
                    '--color': COLORS.gray[500],
                    '--text-decoration': 'line-through',
                  }
                : {}
            }
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' && (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          )}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 0 344px;
`;

const Wrapper = styled.article`
  position: relative;
`;

const Badge = styled.span`
  display: inline-block;
  position: absolute;
  right: -4px;
  top: 12px;
  padding: 10px 8px;
  color: ${COLORS.white};
  border-radius: 2px;
  font-size: ${14 / 16}rem;
  font-weight: 700;
  background: var(--background-color);
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  max-width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
