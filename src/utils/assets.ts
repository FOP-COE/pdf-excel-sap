/**
 * Asset paths for logos and images
 * These paths are relative to the public directory and include the BASE_URL for proper routing
 */
const BASE_URL = import.meta.env.BASE_URL;

export const logos = {
  amadeusBlue: `${BASE_URL}images/amadeus_blue_logo.png`,
  amadeusWhite: `${BASE_URL}images/amadeus_white_logo.png`,
  coeColor: `${BASE_URL}images/coe_color_logo.png`,
  coeWhite: `${BASE_URL}images/coe_white_logo.png`,
} as const;

export const images = {
  qrFeedback: `${BASE_URL}images/qr-feedback.png`,
} as const;
