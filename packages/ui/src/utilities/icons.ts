import { IconType } from 'react-icons';
import {
  RiBankCardLine,
  RiBitCoinLine,
  RiClipboardLine,
  RiFingerprintLine,
  RiMagicLine,
  RiTruckLine,
  RiWalletLine,
} from 'react-icons/ri';
import { PaymentMethod, ShippingMethod } from '../types';

const PAYMENT_METHOD_ICONS: Record<PaymentMethod, IconType> = {
  [PaymentMethod.BIOMETRIC]: RiFingerprintLine,
  [PaymentMethod.CRYPTO]: RiBitCoinLine,
  [PaymentMethod.VIRTUAL_WALLET]: RiWalletLine,
  [PaymentMethod.SMART_CONTRACT]: RiClipboardLine,
  [PaymentMethod.CREDIT_CARD]: RiBankCardLine,
};

export const getPaymentMethodIcon = (paymentMethod: PaymentMethod) => {
  return PAYMENT_METHOD_ICONS[paymentMethod];
};

const SHIPPING_METHOD_ICONS: Record<ShippingMethod, IconType> = {
  [ShippingMethod.INSTANT_TELEPORTATION]: RiMagicLine,
  [ShippingMethod.DRONE]: RiTruckLine,
  [ShippingMethod.SELF_DRIVING_TRUCK]: RiTruckLine,
  [ShippingMethod.HYPERLOOP]: RiTruckLine,
};

export const getShippingMethodIcon = (shippingMethod: ShippingMethod) => {
  return SHIPPING_METHOD_ICONS[shippingMethod];
};
