import React from 'react';

export const metadata = {
    title: "Terms of Service",
    description: "Review the terms of service for InfiniteFusion.org. By using our website, you agree to the following terms and conditions.",
    keywords: ["terms of service", "infinite fusion", "terms", "legal", "pokemon fusion", "disclaimer"],
    robots: "index, follow",
    openGraph: {
      title: "Terms of Service",
      description: "Understand the terms and conditions for using InfiniteFusion.org. By accessing our website, you agree to comply with these terms.",
      url: "https://infinitefusion.org/terms",
      type: "website",
    }
  }

function TermsOfServicePage() {
  return (
    <>
      <h1>Terms of Service</h1>

      <div>
        Welcome to InfiniteFusion.org. By accessing and using this website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully. If you do not agree to these terms, please do not use our site or its services.
      </div>

      <div>
        <h2>1. Use of the Website</h2>
        InfiniteFusion.org is a fan-made website dedicated to providing tools and resources for the Pokémon Infinite Fusion game. The content on this site, including the Fusion Calculator, Fusion Dex, and Artist Gallery, is for personal and non-commercial use only. You agree not to misuse the website in any way, including but not limited to hacking, data mining, or distributing malicious software.
      </div>

      <div>
        <h2>2. Intellectual Property</h2>
        All content provided on InfiniteFusion.org, including images, text, graphics, and tools, is the intellectual property of InfiniteFusion.org, unless otherwise specified. Pokémon images, names, and other related media are the intellectual property of their respective owners, including Nintendo, Game Freak, and The Pokémon Company. We do not claim ownership over any Pokémon-related content. This site operates under fair use and is not affiliated with, endorsed, or sponsored by these companies.
      </div>

      <div>
        <h2>3. User Contributions</h2>
        If you contribute custom sprites or other content to InfiniteFusion.org, you grant us the right to display, share, and promote your work on the site. You retain ownership of your creations but agree that InfiniteFusion.org may use them in any capacity related to the site, including promotional and community content. We reserve the right to remove any user content that violates these terms.
      </div>

      <div>
        <h2>4. External Links</h2>
        InfiniteFusion.org may contain links to third-party websites for your convenience. We do not have control over these sites and are not responsible for their content, privacy policies, or practices. Accessing external sites is done at your own risk.
      </div>

      <div>
        <h2>5. Disclaimer</h2>
        InfiniteFusion.org is provided &ldquo;as is&ldquo; without any warranties of any kind. We do not guarantee that the website will always be available, error-free, or free from harmful components. By using this site, you acknowledge that you do so at your own risk.
      </div>

      <div>
        <h2>6. Limitation of Liability</h2>
        InfiniteFusion.org, its creators, and affiliates will not be liable for any damages arising from the use of this website, including but not limited to direct, indirect, incidental, or consequential damages. This includes any loss of data, revenue, or profits.
      </div>

      <div>
        <h2>7. Modifications to the Terms</h2>
        We reserve the right to modify these Terms of Service at any time. Any changes will be effective immediately upon posting on this page. It is your responsibility to review these terms periodically. Continued use of the website after any changes have been made constitutes your acceptance of the updated terms.
      </div>

      <div>
        <h2>8. Governing Law</h2>
        These terms are governed by and construed in accordance with the laws of the country where InfiniteFusion.org is based. Any disputes arising from these terms will be resolved in the appropriate courts of that jurisdiction.
      </div>

      <div>
        <h2>9. Contact Information</h2>
        If you have any questions about these Terms of Service, please contact us through our <a href="/contact">Contact Page</a>.
      </div>
    </>
  );
}

export default TermsOfServicePage;
