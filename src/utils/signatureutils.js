const contractStatusStore = {};

export function sendForSignature(influencerId) {
  contractStatusStore[influencerId] = "sent";
  return `https://example.com/sign/${influencerId}`;
}

export function getSignatureStatus(influencerId) {
  return contractStatusStore[influencerId] || "draft";
}
