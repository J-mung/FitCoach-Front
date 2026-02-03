import type { CardVariant } from "./type";
import {
  cardContainerClass,
  cardDefaultClass,
  cardRecommendationClass,
} from "./styles";

export const cardVariantClassMap: Record<CardVariant, string> = {
  default: cardDefaultClass,
  recommendation: cardRecommendationClass,
};

export const cardBaseClass = cardContainerClass;
