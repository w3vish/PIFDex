import React from 'react';

export const metadata = {
    title: "Privacy Policy",
    description: "Read the privacy policy for InfiniteFusion.org. We do not collect any personal data except through Google Analytics and Google AdSense.",
    keywords: ["privacy policy", "data collection", "google analytics", "adsense", "privacy", "infinite fusion"],
    robots: "index, follow",
    openGraph: {
      title: "Privacy Policy",
      description: "Understand how your data is handled at InfiniteFusion.org. We only use Google Analytics and Google AdSense.",
      url: "https://infinitefusion.org/privacy",
      type: "website",
    }
  }

function PrivacyPolicyPage() {
  return (
    <>
      <h1>Privacy Policy</h1>

      <div>
        At InfiniteFusion.org, we respect your privacy and are committed to protecting any information you provide while using our site. This Privacy Policy outlines how we handle data and what information is collected.
      </div>

      <div>
        <h2>Data Collection</h2>
        InfiniteFusion.org does not collect or store any personal data from its users. We do not require you to create an account or submit any personal information to use the features and tools provided on our website.
      </div>

      <div>
        <h2>Use of Google Analytics</h2>
        We use Google Analytics to track and analyze website traffic. Google Analytics collects information such as the pages you visit, the time spent on each page, and your general geographic location. This data is anonymized and does not include any personal identification information. The information gathered helps us understand how users interact with our site and improve the overall user experience.
      </div>

      <div>
        <h2>Use of Google AdSense</h2>
        We also use Google AdSense to display ads on InfiniteFusion.org. Google may use cookies to serve ads based on your prior visits to our website or other websites on the internet. These cookies do not contain personally identifiable information and can be managed through your browser settings or by visiting Google&apos;s Ads Settings page.
      </div>

      <div>
        <h2>Cookies</h2>
        Cookies are small files stored on your device to improve your experience on the website. While InfiniteFusion.org does not use its own cookies, third-party services like Google Analytics and Google AdSense may place cookies to track usage and personalize ads. You can disable cookies through your browser settings if you prefer.
      </div>

      <div>
        <h2>Your Privacy Choices</h2>
        You can opt-out of Google Analytics tracking by using the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>. For information on managing ad personalization, visit <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google&apos;s Ad Settings</a>.
      </div>

      <div>
        <h2>Third-Party Links</h2>
        Our site may contain links to other websites. Please note that we are not responsible for the privacy practices or content of third-party websites. We encourage you to read the privacy policies of any site you visit through links on our website.
      </div>

      <div>
        <h2>Changes to this Privacy Policy</h2>
        We may update this Privacy Policy from time to time. Any changes will be reflected on this page with the updated date. We encourage you to review this policy periodically to stay informed of any updates.
      </div>

      <div>
        If you have any questions or concerns about our Privacy Policy, please feel free to <a href="/contact">contact us</a>.
      </div>

      <div>
        © 2024 InfiniteFusion.org. All rights reserved.
      </div>
    </>
  );
}

export default PrivacyPolicyPage;
