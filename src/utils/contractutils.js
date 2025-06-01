export function generateContract(influencer, brandName = "YourBrand") {
  return `
    <h2>Collaboration Contract</h2>
    <p>This contract is between <strong>${brandName}</strong> and influencer <strong>${influencer.name}</strong>.</p>
    <ul>
      <li>Platform: ${influencer.platforms[0]?.platform}</li>
      <li>Category: ${influencer.category}</li>
      <li>Deliverables: 1 sponsored post</li>
      <li>Payment: Based on ${influencer.pricing_tier} tier</li>
      <li>Language: ${influencer.languages.join(', ')}</li>
    </ul>
    <p>Date: ${new Date().toLocaleDateString()}</p>
    <p>Signature: ______________________</p>
  `;
}
